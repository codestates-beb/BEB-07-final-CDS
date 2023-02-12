export interface CreateReturnValue {
  hostAddr: string;
  isBuyer: boolean;
  swapId: string;
  assetType: string;
  swap: string;
}

export interface AcceptReturnValue {
  guestAddr: string;
  swapId: string;
}

export interface ClaimReturnValue {
  claimReward: string;
  swapId: string;
}

export interface OtherReturnValue {
  swapId: string;
}

export interface SwapInfo {
  initAssetPrice: string;
  claimPrice: string;
  liquidationPrice: string;
  premium: string;
  sellerDeposit: string;
  buyer: string | null;
  seller: string | null;
}

export interface EmailData {
  recipient?: string | null;
  nickname?: string | null;
  event?: string | null;
  timestamp?: string | null;
  subject?: string | null;
  message?: string | null;
  txHash?: string | null;
  swapId?: string | null;
  isBuyer?: boolean;
}
