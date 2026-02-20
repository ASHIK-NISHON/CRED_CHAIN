-- CreateTable
CREATE TABLE "Issuer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "issuerId" TEXT NOT NULL,
    "issuerAddress" TEXT NOT NULL,
    "studentAddress" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "issueDate" DATETIME NOT NULL,
    "expiryDate" DATETIME,
    "certificateIpfsHash" TEXT NOT NULL,
    "metadataIpfsHash" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Credential_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "Issuer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Revocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "credentialId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "revokedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "revokedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Revocation_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Issuer_address_key" ON "Issuer"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_assetId_key" ON "Credential"("assetId");

-- CreateIndex
CREATE INDEX "Revocation_assetId_idx" ON "Revocation"("assetId");

-- CreateIndex
CREATE INDEX "Revocation_credentialId_idx" ON "Revocation"("credentialId");
