/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Concert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConcertSeat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "ConcertSeat" DROP CONSTRAINT "ConcertSeat_concertId_fkey";

-- DropForeignKey
ALTER TABLE "ConcertSeat" DROP CONSTRAINT "ConcertSeat_seatId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_concertId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_concertSeatId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_orderId_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Concert";

-- DropTable
DROP TABLE "ConcertSeat";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Seat";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "img" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concert" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bandName" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concert_seat" (
    "id" SERIAL NOT NULL,
    "status" "SeatStatus" NOT NULL,
    "seatId" INTEGER NOT NULL,
    "concertId" INTEGER NOT NULL,

    CONSTRAINT "concert_seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "concertSeatId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "concertId" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "concertId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "concert_seat" ADD CONSTRAINT "concert_seat_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concert_seat" ADD CONSTRAINT "concert_seat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "concert"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_concertSeatId_fkey" FOREIGN KEY ("concertSeatId") REFERENCES "concert_seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
