/*
  Warnings:

  - Added the required column `type` to the `Promt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromtType" AS ENUM ('User', 'System');

-- AlterTable
ALTER TABLE "Promt" ADD COLUMN     "type" "PromtType" NOT NULL;
