/*
  Warnings:

  - You are about to drop the column `concertId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `bandName` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `seat` table. All the data in the column will be lost.
  - You are about to drop the column `seatNumber` on the `seat` table. All the data in the column will be lost.
  - You are about to drop the column `concertSeatId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `user` table. All the data in the column will be lost.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `concert_seat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatId` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Made the column `concertId` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "concert_seat" DROP CONSTRAINT "concert_seat_concertId_fkey";

-- DropForeignKey
ALTER TABLE "concert_seat" DROP CONSTRAINT "concert_seat_seatId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_concertId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_concertSeatId_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "concertId",
DROP COLUMN "seatId",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "concert" DROP COLUMN "bandName",
DROP COLUMN "image",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "createdAt",
DROP COLUMN "total";

-- AlterTable
ALTER TABLE "seat" DROP COLUMN "row",
DROP COLUMN "seatNumber",
ADD COLUMN     "number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "concertSeatId",
ADD COLUMN     "cartId" INTEGER,
ADD COLUMN     "seatId" INTEGER NOT NULL,
ALTER COLUMN "concertId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "img",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "concert_seat";

-- DropEnum
DROP TYPE "SeatStatus";

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
