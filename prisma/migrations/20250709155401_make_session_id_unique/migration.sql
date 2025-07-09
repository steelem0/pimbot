/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `ProjectMemory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectMemory_sessionId_key" ON "ProjectMemory"("sessionId");
