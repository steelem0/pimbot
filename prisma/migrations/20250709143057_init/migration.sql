-- CreateTable
CREATE TABLE "ProjectMemory" (
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
    "updatedAt" DATETIME NOT NULL
);
