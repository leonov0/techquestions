import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema",
  dialect: "postgresql",
  dbCredentials: { url },
});
