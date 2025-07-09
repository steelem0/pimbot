/*
  Warnings:

  - Added the required column `metadata` to the `ProjectMemory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectMemory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "scope" TEXT,
    "constraints" JSONB,
    "features" JSONB,
    "timeline" TEXT,
    "techStack" JSONB,
    "risks" JSONB,
    "architecture" TEXT,
    "testing" TEXT,
    "deployment" TEXT,
    "serviceDelivery" TEXT,
    "metadata" JSONB NOT NULL,
    "summary" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProjectMemory" ("architecture", "constraints", "deployment", "features", "goal", "id", "risks", "scope", "serviceDelivery", "sessionId", "techStack", "testing", "timeline", "updatedAt") SELECT "architecture", "constraints", "deployment", "features", "goal", "id", "risks", "scope", "serviceDelivery", "sessionId", "techStack", "testing", "timeline", "updatedAt" FROM "ProjectMemory";
DROP TABLE "ProjectMemory";
ALTER TABLE "new_ProjectMemory" RENAME TO "ProjectMemory";
CREATE UNIQUE INDEX "ProjectMemory_sessionId_key" ON "ProjectMemory"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
