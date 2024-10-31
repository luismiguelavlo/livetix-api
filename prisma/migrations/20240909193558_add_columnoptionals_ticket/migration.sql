-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_userId_fkey";

-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
