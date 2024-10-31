/*
  Warnings:

  - You are about to drop the column `orderId` on the `ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_orderId_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "order_cartId_key" ON "order"("cartId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
