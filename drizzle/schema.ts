import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * PostgreSQL schema for Lume travel super app.
 * Uses Neon.tech as the database provider.
 * All tables include createdAt and updatedAt timestamps for audit trails.
 */

// Enums for PostgreSQL
export const travelerTypeEnum = pgEnum("traveler_type", [
  "adventure_seeker",
  "cultural_explorer",
  "beach_relaxer",
  "budget_backpacker",
  "luxury_traveler",
  "family_planner",
]);

export const tripStatusEnum = pgEnum("trip_status", [
  "planning",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
]);

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

/**
 * Users table - Core user data with Manus OAuth integration
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).unique(),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  travelerType: travelerTypeEnum("traveler_type"),
  interests: text("interests"), // JSON array stored as text: ["food", "culture", "nature"]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Trips table - User's travel plans
 */
export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  destination: varchar("destination", { length: 255 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  status: tripStatusEnum("status").default("planning").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/**
 * ItineraryItems table - Day-by-day activities within a trip
 */
export const itineraryItems = pgTable("itinerary_items", {
  id: serial("id").primaryKey(),
  tripId: integer("tripId")
    .notNull()
    .references(() => trips.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  itemDate: date("itemDate").notNull(),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/**
 * Relations for Drizzle ORM
 */
export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),
  itineraryItems: many(itineraryItems),
}));

export const itineraryItemsRelations = relations(
  itineraryItems,
  ({ one }) => ({
    trip: one(trips, {
      fields: [itineraryItems.tripId],
      references: [trips.id],
    }),
  })
);

/**
 * Type exports for TypeScript
 */
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = typeof trips.$inferInsert;

export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type InsertItineraryItem = typeof itineraryItems.$inferInsert;
