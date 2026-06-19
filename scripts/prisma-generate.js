// Ensures DATABASE_URL is set before running prisma generate.
// Falls back to a dummy URL so the Prisma client can generate
// even when no database is configured yet.
const { execSync } = require("child_process");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://localhost:5432/build-only";
}

execSync("prisma generate", { stdio: "inherit" });
