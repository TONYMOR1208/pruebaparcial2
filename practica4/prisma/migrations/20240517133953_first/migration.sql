-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'PENDIENTE', 'ELIMINADO');

-- CreateTable
CREATE TABLE "Idioma" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Idioma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palabra" (
    "id" SERIAL NOT NULL,
    "palabra" TEXT NOT NULL,
    "deletreo" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Palabra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "idIdioma" INTEGER NOT NULL,
    "idPalabra" INTEGER NOT NULL,
    "deletreo" TEXT,
    "silabas" TEXT,
    "fonetica" TEXT,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_idIdioma_fkey" FOREIGN KEY ("idIdioma") REFERENCES "Idioma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_idPalabra_fkey" FOREIGN KEY ("idPalabra") REFERENCES "Palabra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
