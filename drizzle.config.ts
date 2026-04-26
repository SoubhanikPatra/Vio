import { defineConfig } from "drizzle-kit";
import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const envFiles = [".env.local", ".env"];

for (const fileName of envFiles) {
  const envPath = path.join(rootDir, fileName);
  if (fs.existsSync(envPath)) {
    loadEnv({ path: envPath, override: false });
  }
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  const checkedPaths = envFiles
    .map((fileName) => path.join(rootDir, fileName))
    .join(", ");

  throw new Error(
    `DATABASE_URL is required to run drizzle commands. Set it to your Neon PostgreSQL connection string. Checked: ${checkedPaths}`
  );
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
