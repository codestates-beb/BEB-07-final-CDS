"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrasactionsTable = exports.createSwapsTable = exports.createUsersTable = void 0;
exports.createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100) NULL DEFAULT NULL,
  nickname VARCHAR(50) NULL DEFAULT NULL,
  soldCount INT UNSIGNED NOT NULL DEFAULT 0,
  boughtCount INT UNSIGNED NOT NULL DEFAULT 0,
  lastSold INT UNSIGNED NULL DEFAULT NULL,
  lastBought INT UNSIGNED NULL DEFAULT NULL,
  nonce INT UNSIGNED NULL DEFAULT NULL,
  createdAt INT UNSIGNED NOT NULL,
  updatedAt INT UNSIGNED NOT NULL,
  deletedAt INT UNSIGNED NULL DEFAULT NULL,
  lastTokenFaucet INT UNSIGNED NULL DEFAULT NULL,
  lastEtherFaucet INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (address),
  UNIQUE INDEX address (address ASC) VISIBLE)
  `;
exports.createSwapsTable = `
   CREATE TABLE IF NOT EXISTS swaps (
      swapId INT UNSIGNED NOT NULL,
      contractAddress VARCHAR(100) NOT NULL,
      assetType VARCHAR(20) NOT NULL,
      initialAssetPrice INT UNSIGNED NOT NULL,
      amountOfAssets INT UNSIGNED NOT NULL,
      totalAssets INT UNSIGNED NOT NULL,
      premium INT UNSIGNED NOT NULL,
      premiumRate INT UNSIGNED NOT NULL,
      dropRate DECIMAL(10,4) NOT NULL,
      premiumInterval INT UNSIGNED NOT NULL,
      remainPremiumRounds INT UNSIGNED NOT NULL,
      totalPremiumRounds INT UNSIGNED NOT NULL,
      sellerDeposit BIGINT UNSIGNED NULL DEFAULT NULL,
      buyerDeposit BIGINT UNSIGNED NULL DEFAULT NULL,
      claimPrice BIGINT UNSIGNED NOT NULL,
      liquidationPrice BIGINT UNSIGNED NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT "pending",
      updatableStatus VARCHAR(20) NULL DEFAULT NULL,
      createdAt INT UNSIGNED NOT NULL,
      updatedAt INT UNSIGNED NOT NULL,
      lastPaidAt INT UNSIGNED NULL DEFAULT NULL,
      terminatedAt INT UNSIGNED NULL DEFAULT NULL,
      deletedAt INT UNSIGNED NULL DEFAULT NULL,
      seller VARCHAR(100) NULL DEFAULT NULL,
      buyer VARCHAR(100) NULL DEFAULT NULL,
      PRIMARY KEY (swapId),
      UNIQUE INDEX swapId (swapId ASC) VISIBLE,
      INDEX swaps_seller_foreign_idx (seller ASC) VISIBLE,
      INDEX swaps_buyer_foreign_idx (buyer ASC) VISIBLE,
      CONSTRAINT FK_9b525e893635bdc87b49a93c1b9
        FOREIGN KEY (buyer)
        REFERENCES cds_dev3.users (address)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
      CONSTRAINT FK_afd669e4a99098c75a2aeb22313
        FOREIGN KEY (seller)
        REFERENCES cds_dev3.users (address)
        ON DELETE SET NULL
        ON UPDATE CASCADE)
  `;
exports.createTrasactionsTable = `CREATE TABLE IF NOT EXISTS cds_dev3.transactions (
    txHash VARCHAR(100) NOT NULL,
    blockNum INT UNSIGNED NOT NULL,
    event VARCHAR(20) NULL DEFAULT NULL,
    createdAt INT UNSIGNED NOT NULL,
    updatedAt INT UNSIGNED NOT NULL,
    deletedAt INT UNSIGNED NULL DEFAULT NULL,
    swapId INT UNSIGNED NULL DEFAULT NULL,
    PRIMARY KEY (txHash),
    UNIQUE INDEX txHash (txHash ASC) VISIBLE,
    INDEX transactions_swapId_foreign_idx (swapId ASC) VISIBLE,
    CONSTRAINT FK_5958c68b528da9fe63fbd40669c
      FOREIGN KEY (swapId)
      REFERENCES cds_dev3.swaps (swapId)
      ON DELETE SET NULL
      ON UPDATE CASCADE)`;
//# sourceMappingURL=queries.js.map