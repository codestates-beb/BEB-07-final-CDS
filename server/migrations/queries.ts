export const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  address VARCHAR(100) NOT NULL,
  nickname VARCHAR(50) NULL DEFAULT NULL,
  soldCount INT NOT NULL DEFAULT 0,
  boughtCount INT NOT NULL DEFAULT 0,
  lastSold DATETIME NULL DEFAULT NULL,
  lastBought DATETIME NULL DEFAULT NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  deletedAt DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (address),
  UNIQUE INDEX address (address ASC) VISIBLE)
  `;

export const createSwapsTable = `
   CREATE TABLE IF NOT EXISTS swaps (
      swapId INT NOT NULL,
      initialAssetPrice INT NOT NULL,
      amountOfAssets INT NOT NULL,
      totalAssets INT NOT NULL,
      premium INT NOT NULL,
      premiumRate INT NOT NULL,
      dropRate DECIMAL(10,4) NOT NULL,
      premiumInterval INT NOT NULL,
      totalPremiumRounds INT NOT NULL,
      sellerDeposit INT NULL DEFAULT NULL,
      buyerDeposit INT NULL DEFAULT NULL,
      claimPrice INT NOT NULL,
      liquidationPrice INT NOT NULL,
      status VARCHAR(20) NULL DEFAULT NULL,
      updatableStatus VARCHAR(20) NULL DEFAULT NULL,
      createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      deletedAt DATETIME NULL DEFAULT NULL,
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
export const createTrasactionsTable = `CREATE TABLE IF NOT EXISTS cds_dev3.transactions (
    txHash VARCHAR(100) NOT NULL,
    blockNum INT NOT NULL,
    createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    deletedAt DATETIME NULL DEFAULT NULL,
    swapId INT NULL DEFAULT NULL,
    PRIMARY KEY (txHash),
    UNIQUE INDEX txHash (txHash ASC) VISIBLE,
    INDEX transactions_swapId_foreign_idx (swapId ASC) VISIBLE,
    CONSTRAINT FK_5958c68b528da9fe63fbd40669c
      FOREIGN KEY (swapId)
      REFERENCES cds_dev3.swaps (swapId)
      ON DELETE SET NULL
      ON UPDATE CASCADE)`;
