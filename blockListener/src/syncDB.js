/* eslint-disable no-await-in-loop */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-restricted-syntax */
const {
  web3Http,
  nftContractHttp,
  tokenContractHttp,
} = require('./chainUtils');
const { nfts, users } = require('./models');

const { NFT_CA, ADMIN_ADDRESS, METADATA_PREFIX } = process.env;

const getCurrentTokenId = async () => {
  const currentTokenId = await nftContractHttp.methods.getTokenId().call();
  return currentTokenId;
};

const syncUserData = async (user) => {
  try {
    const ethBalance = await web3Http.eth.getBalance(user.wallet_account);
    const tokenBalance = await tokenContractHttp.methods
      .balanceOf(user.wallet_account)
      .call();

    await user.update({
      eth: ethBalance,
      erc20: tokenBalance,
    });
  } catch (err) {
    console.error(err);
  }
};

const syncOrCreateNFTData = async (tokenId) => {
  try {
    const ownerAddress = await nftContractHttp.methods.ownerOf(tokenId).call();
    const nftOwner = await users.findOne({
      where: { wallet_account: ownerAddress },
    });
    if (!nftOwner) {
      throw new Error(
        `user with wallet_account : ${ownerAddress} is not exist`,
      );
    }
    const nft = await nfts.findOne({
      where: { id: tokenId },
    });
    if (nft) {
      nft.update({
        user_id: nftOwner.id,
      });
    } else {
      const newNFT = await nfts.create({
        id: tokenId,
        contract_address: NFT_CA,
        token_id: tokenId,
        price: 6670,
        listed: false,
        creator: ADMIN_ADDRESS,
        txhash: null,
        metadata: `${METADATA_PREFIX}/${tokenId}.json`,
        user_id: nftOwner.id,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = async () => {
  const userData = await users.findAll({});
  for await (const user of userData) {
    console.log(`synchronizing userId : ${user.id}`);
    await syncUserData(user);
  }
  // currentToken id를 체인에서 조회한다.
  // 1번 토큰아이디부터, 마지막 토큰아이디까지 db에서 조회한다
  // 만약 db에 없는 토큰아이디가 있다면 db에 새로운 nft를 만든다.
  const currentNFTId = await getCurrentTokenId();
  let idx = 1;
  while (idx <= currentNFTId) {
    console.log(`synchronizing tokenId : ${idx}`);
    await syncOrCreateNFTData(idx++);
  }
};
