import type { Express, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { users } from "@/drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@/shared/const";
import { getSessionCookieOptions } from "./cookies";

/**
 * Simple password hashing (not production-grade, use bcrypt in production)
 * For demo purposes only.
 */
function hashPassword(password: string): string {
  // In production, use bcrypt or argon2
  return Buffer.from(password).toString("base64");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Generate a synthetic openId for email-based users
 */
function generateEmailOpenId(email: string): string {
  return `email:${email.toLowerCase()}`;
}

async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[EmailAuth] Cannot get user: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[EmailAuth] Failed to get user by email:", error);
    return undefined;
  }
}

function buildUserResponse(user: any) {
  return {
    id: user?.id ?? null,
    openId: user?.openId ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    loginMethod: user?.loginMethod ?? "email",
    role: user?.role ?? "user",
    travelerType: user?.travelerType ?? null,
    interests: user?.interests ?? null,
    createdAt: (user?.createdAt ?? new Date()).toISOString(),
    updatedAt: (user?.updatedAt ?? new Date()).toISOString(),
    lastSignedIn: (user?.lastSignedIn ?? new Date()).toISOString(),
  };
}

export function registerEmailAuthRoutes(app: Express) {
  /**
   * Email/Password Signup
   */
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "email and password are required" });
        return;
      }

      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: "User already exists" });
        return;
      }

      const openId = generateEmailOpenId(email);
      const passwordHash = hashPassword(password);
      const now = new Date();

      // Store password hash in interests field temporarily (NOT production-safe)
      // In production, add a dedicated password_hash column
      const result = await db
        .insert(users)
        .values({
          openId,
          email: email.toLowerCase(),
          name: name || null,
          loginMethod: "email",
          role: "user",
          interests: passwordHash,
          lastSignedIn: now,
        })
        .returning();

      const newUser = result[0];

      // Create session token
      const sessionToken = await sdk.createSessionToken(openId, {
        name: name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.status(201).json({
        token: sessionToken,
        user: buildUserResponse(newUser),
      });
    } catch (error) {
      console.error("[EmailAuth] Signup failed:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  });

  /**
   * Email/Password Login
   */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "email and password are required" });
        return;
      }

      const user = await getUserByEmail(email);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Password stored in interests field (temp hack, NOT for production)
      const storedHash = user.interests || "";
      if (!storedHash || !verifyPassword(password, storedHash)) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Create session token
      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.json({
        token: sessionToken,
        user: buildUserResponse(user),
      });
    } catch (error) {
      console.error("[EmailAuth] Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  /**
   * Onboarding data update
   */
  app.post("/api/users/onboarding", async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      let token: string | undefined;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice("Bearer ".length).trim();
      }

      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const session = await sdk.verifySession(token);
      if (!session) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const { travelerType, interests } = req.body;
      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      // Find user by openId
      const userResult = await db
        .select()
        .from(users)
        .where(eq(users.openId, session.openId))
        .limit(1);

      if (userResult.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const user = userResult[0];

      // For email users, we need to preserve password hash
      // This is a hack - we're storing password in interests field
      const isEmailUser = user.openId.startsWith("email:");
      const preservedInterests = isEmailUser ? user.interests : (interests || null);

      // Update onboarding data
      // Note: This is a simplified update - in production, use a proper PATCH
      const updates: Record<string, any> = {
        travelerType: travelerType || user.travelerType,
        interests: preservedInterests,
        updatedAt: new Date(),
      };

      const updatedResult = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, user.id))
        .returning();

      const updatedUser = updatedResult[0];
      res.json(buildUserResponse(updatedUser));
    } catch (error) {
      console.error("[EmailAuth] Onboarding update failed:", error);
      res.status(500).json({ error: "Onboarding update failed" });
    }
  });
}
