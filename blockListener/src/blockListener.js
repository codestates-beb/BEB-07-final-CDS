/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
const { web3Socket, nftContract, tokenContract } = require('./chainUtils');
const { nfts, users } = require('./models');

const { NFT_CA, ADMIN_ADDRESS, METADATA_PREFIX } = process.env;

const updateTokenBalance = async (address, amount) => {
  try {
    const targetUser = await users.findOne({
      where: { wallet_account: address },
    });
    console.log(
      'before transfer: ',
      targetUser.wallet_account,
      targetUser.erc20,
    );
    const newBalance = BigInt(targetUser.erc20) + BigInt(amount);
    await targetUser.update({ erc20: newBalance.toString() });
    console.log(
      'after transfer: ',
      targetUser.wallet_account,
      targetUser.erc20,
    );
  } catch (err) {
    console.error(err);
  }
};

const createOrUpdateNFT = async (tokenId, ownerAddress) => {
  try {
    const nftOwner = await users.findOne({
      where: { wallet_account: ownerAddress },
    });
    const nft = await nfts.findOne({
      where: { token_id: tokenId },
    });
    if (nft) {
      // 해당 이벤트의 대상 nft가 db에 존재하면 오너만 업데이트
      nft.update({
        user_id: nftOwner.id,
      });
    } else {
      const newNFT = await nfts.create({
        id: tokenId,
        contract_address: NFT_CA,
        token_id: tokenId,
        price: 1,
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

const updateNFTOwner = async (address, tokenId) => {
  try {
    const targetNFT = await nfts.findOne({
      where: { token_id: tokenId },
    });
    const newOwner = await users.findOne({
      where: { wallet_account: address },
    });
    await targetNFT.update({
      where: { user_id: newOwner.id },
    });
  } catch (err) {
    console.error(err);
  }
};

const handleTransaction = async (txHash) => {
  console.log('eth.subscribe getTransactions');
  const txData = await web3Socket.eth.getTransaction(txHash);
  const { from, to, value } = txData;
  if (!value) {
    console.log('Tx without any ether transfer. this will be ignored');
    return;
  }
  const sender = await users.findOne({
    where: { wallet_account: from },
  });
  if (sender) {
    const newSenderBalance = BigInt(sender.eth) - BigInt(value);
    await sender.update({
      eth: newSenderBalance.toString(),
    });
  }
  const recipient = await users.findOne({
    where: { wallet_account: to },
  });
  if (recipient) {
    const newRecipientBalance = BigInt(recipient.eth) + BigInt(value);
    await recipient.update({
      eth: newRecipientBalance.toString(),
    });
  }
};

module.exports = async () => {
  web3Socket.eth.subscribe('newBlockHeaders').on('data', async (event) => {
    const blockInfo = await web3Socket.eth.getBlock(event.hash);
    const txHashs = blockInfo.transactions;
    for await (const txHash of txHashs) {
      handleTransaction(txHash);
    }
  });

  tokenContract.events.allEvents().on('data', async (event) => {
    // 여기서 Transfer and Approve filter.
    const eventType = event.event;
    if (eventType === 'Transfer') {
      console.log('**TOKEN** Transfer event emitted, changing balances');
      const { from, to, amount } = event.returnValues;
      await updateTokenBalance(from, -amount);
      await updateTokenBalance(to, amount);
    } else {
      console.log(event);
    }
  });

  nftContract.events.allEvents().on('data', async (event) => {
    const eventType = event.event;
    if (eventType === 'Transfer') {
      console.log('**NFT** Transfer event emitted, changing ownership');
      const ownerAddress = event.returnValues[1];
      const tokenId = event.returnValues[2];
      await createOrUpdateNFT(tokenId, ownerAddress);
      await updateNFTOwner(ownerAddress, tokenId);
    } else {
      console.log(event);
    }
  });
};
