-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "direcao" INTEGER NOT NULL,
    "descricao" TEXT,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL
);
