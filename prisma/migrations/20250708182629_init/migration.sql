-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consented" BOOLEAN NOT NULL,
    "userEmail" TEXT,
    "goal" TEXT,
    "responses" JSONB NOT NULL,
    "pdfPath" TEXT
);
