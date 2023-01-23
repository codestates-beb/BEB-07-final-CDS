export default {
  contractName: 'CDS',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'swapId',
          type: 'uint256',
        },
      ],
      name: 'AcceptSwap',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'claimPrice',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'liquidationPrice',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_premium',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'premiumInterval',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalPremiumRounds',
          type: 'uint256',
        },
      ],
      name: 'MakeSwap',
      type: 'event',
    },
    {
      inputs: [],
      name: 'getPriceFromOracle',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_priceOracleAddress',
          type: 'address',
        },
      ],
      name: 'setOracle',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'claimPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'liquidationPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'sellerDeposit',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'premium',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'premiumInterval',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'totalPremiumRounds',
          type: 'uint256',
        },
      ],
      name: 'makeSwap',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'swapId',
          type: 'uint256',
        },
      ],
      name: 'acceptSwap',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'swapId',
          type: 'uint256',
        },
      ],
      name: 'getSwap',
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: 'address',
                  name: 'addr',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'deposit',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastPayDate',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'nextPayDate',
                  type: 'uint256',
                },
              ],
              internalType: 'struct Swaps.Buyer',
              name: 'buyer',
              type: 'tuple',
            },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'addr',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'deposit',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'isDeposited',
                  type: 'bool',
                },
              ],
              internalType: 'struct Swaps.Seller',
              name: 'seller',
              type: 'tuple',
            },
            {
              internalType: 'uint256',
              name: 'claimPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'liquidationPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'premium',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'premiumInterval',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'totalPremiumRounds',
              type: 'uint256',
            },
            {
              internalType: 'enum Swaps.Status',
              name: 'status',
              type: 'uint8',
            },
          ],
          internalType: 'struct Swaps.Swap',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'swapId',
          type: 'uint256',
        },
      ],
      name: 'getBuyer',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'addr',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'deposit',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'lastPayDate',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'nextPayDate',
              type: 'uint256',
            },
          ],
          internalType: 'struct Swaps.Buyer',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'swapId',
          type: 'uint256',
        },
      ],
      name: 'getSeller',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'addr',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'deposit',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isDeposited',
              type: 'bool',
            },
          ],
          internalType: 'struct Swaps.Seller',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [],
      name: 'getSwapId',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: '_value',
              type: 'uint256',
            },
          ],
          internalType: 'struct Counters.Counter',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
  ],
  metadata:
    '{"compiler":{"version":"0.8.16+commit.07a7930e"},"language":"Solidity","output":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"swapId","type":"uint256"}],"name":"AcceptSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidationPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_premium","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"premiumInterval","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalPremiumRounds","type":"uint256"}],"name":"MakeSwap","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"swapId","type":"uint256"}],"name":"acceptSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"swapId","type":"uint256"}],"name":"getBuyer","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"uint256","name":"lastPayDate","type":"uint256"},{"internalType":"uint256","name":"nextPayDate","type":"uint256"}],"internalType":"struct Swaps.Buyer","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceFromOracle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"swapId","type":"uint256"}],"name":"getSeller","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"bool","name":"isDeposited","type":"bool"}],"internalType":"struct Swaps.Seller","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"swapId","type":"uint256"}],"name":"getSwap","outputs":[{"components":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"uint256","name":"lastPayDate","type":"uint256"},{"internalType":"uint256","name":"nextPayDate","type":"uint256"}],"internalType":"struct Swaps.Buyer","name":"buyer","type":"tuple"},{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"bool","name":"isDeposited","type":"bool"}],"internalType":"struct Swaps.Seller","name":"seller","type":"tuple"},{"internalType":"uint256","name":"claimPrice","type":"uint256"},{"internalType":"uint256","name":"liquidationPrice","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"premiumInterval","type":"uint256"},{"internalType":"uint256","name":"totalPremiumRounds","type":"uint256"},{"internalType":"enum Swaps.Status","name":"status","type":"uint8"}],"internalType":"struct Swaps.Swap","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSwapId","outputs":[{"components":[{"internalType":"uint256","name":"_value","type":"uint256"}],"internalType":"struct Counters.Counter","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"claimPrice","type":"uint256"},{"internalType":"uint256","name":"liquidationPrice","type":"uint256"},{"internalType":"uint256","name":"sellerDeposit","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"premiumInterval","type":"uint256"},{"internalType":"uint256","name":"totalPremiumRounds","type":"uint256"}],"name":"makeSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_priceOracleAddress","type":"address"}],"name":"setOracle","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"project:/contracts/CDS.sol":"CDS"},"evmVersion":"london","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"@openzeppelin/contracts/utils/Counters.sol":{"keccak256":"0xf0018c2440fbe238dd3a8732fa8e17a0f9dce84d31451dc8a32f6d62b349c9f1","license":"MIT","urls":["bzz-raw://59e1c62884d55b70f3ae5432b44bb3166ad71ae3acd19c57ab6ddc3c87c325ee","dweb:/ipfs/QmezuXg5GK5oeA4F91EZhozBFekhq5TD966bHPH18cCqhu"]},"@openzeppelin/contracts/utils/math/SafeMath.sol":{"keccak256":"0x0f633a0223d9a1dcccfcf38a64c9de0874dfcbfac0c6941ccf074d63a2ce0e1e","license":"MIT","urls":["bzz-raw://864a40efcffdf408044c332a5aa38ec5618ed7b4eecb8f65faf45671bd6cdc65","dweb:/ipfs/QmQJquTMtc6fgm5JQzGdsGpA2fqBe3MHWEdt2qzaLySMdN"]},"project:/contracts/CDS.sol":{"keccak256":"0xa954d10a9f8928e1950240ad4827854707a8a9874731a7b7a014783bb43eba59","license":"MIT","urls":["bzz-raw://4844142efbf59bd216add300404d27b1a53ba9c4796ade3806766ee3399e216c","dweb:/ipfs/QmYN3vsn7TjroFkg5oJFbHeDHuB9c9s6cyW9hkdXKiDF8o"]},"project:/contracts/Oracle/PriceConsumer.sol":{"keccak256":"0xe91bd79174b252c953e491125462f1ae2767bf8b13bedba3afc70d48f9e00121","license":"MIT","urls":["bzz-raw://1f05fbdbb3b6343dc1331ba5e99e50f9c095b7f20f1daa36d7b7e2a81bff4334","dweb:/ipfs/QmZk8y35BJ78LmXaPfXWtvNNYLKJeXovf1QpNFn3baShsP"]},"project:/contracts/Oracle/PriceOracleMock.sol":{"keccak256":"0x85e656a1d0a17c7aa3653e953fbc7f1b3966fd8db584f46cdd2e73ca71935f8f","license":"MIT","urls":["bzz-raw://82bca1e94280ede850a87e7731659c1bf57d303bb2da8ee077b0e5e9a6ed82c3","dweb:/ipfs/QmcL8Sw6nTa9Si4jsZFWPDLRL5y9LhcFXjRvR1KQyWLoNW"]},"project:/contracts/Swaps/Swaps.sol":{"keccak256":"0xb3d561b6672993a7fd3f6f4142ff64c587f493f1d70753c0231a6afe68668621","license":"MIT","urls":["bzz-raw://ad3b05f1bdd49c4d36c2493ffefeb10bb23ed6aaba6fdd0eaa156b229509545f","dweb:/ipfs/QmRz2uzzgKrz4pVq4VJ8MzWUHRS7PEwfPza7tLyRgUYpoQ"]},"project:/contracts/libs/LibSwapCalc.sol":{"keccak256":"0xbdb9b15a65f4ef9f21ea99da9b6c2887565d20da4595beeffab7f7670a15e80b","license":"MIT","urls":["bzz-raw://17e90035a6cd08d65cbec1198e06c63647e0b35767bc5c56edde78146cdd0972","dweb:/ipfs/QmP4AsCFVjBX6AXLuLFXYu7qYiWLH367ZF8Rq6wiZbsknm"]}},"version":1}',
  bytecode:
    '0x608060405234801561001057600080fd5b5061117c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80635953cd051161005b5780635953cd05146101295780635bf608b8146101595780637adbf97314610189578063d6a9de51146101b957610088565b8063021c0fd11461008d57806338f5a491146100bd578063496ab39a146100db5780634a0d89ba146100f9575b600080fd5b6100a760048036038101906100a29190610ad9565b6101e9565b6040516100b49190610b28565b60405180910390f35b6100c5610250565b6040516100d29190610b28565b60405180910390f35b6100e36102eb565b6040516100f09190610b6e565b60405180910390f35b610113600480360381019061010e9190610b89565b61030f565b6040516101209190610d95565b60405180910390f35b610143600480360381019061013e9190610db1565b6104c1565b6040516101509190610b28565b60405180910390f35b610173600480360381019061016e9190610b89565b61053a565b6040516101809190610ea8565b60405180910390f35b6101a3600480360381019061019e9190610ec3565b6105de565b6040516101b09190610eff565b60405180910390f35b6101d360048036038101906101ce9190610b89565b610697565b6040516101e09190610f5c565b60405180910390f35b6000806101f68484610742565b90508373ffffffffffffffffffffffffffffffffffffffff167f96a33d274168dd9f48db62d10e3a70d2a3d6b885f26deb52297a7db0d779aecd8460405161023e9190610b28565b60405180910390a28091505092915050565b60008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166398d5fdca6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e29190610f8c565b90508091505090565b6102f3610953565b6001604051806020016040529081600082015481525050905090565b610317610966565b6002600083815260200190815260200160002060405180610100016040529081600082016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250508152602001600482016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900460ff1615151515815250508152602001600782015481526020016008820154815260200160098201548152602001600a8201548152602001600b8201548152602001600c820160009054906101000a900460ff1660058111156104a4576104a3610c77565b5b60058111156104b6576104b5610c77565b5b815250509050919050565b6000806104d38989898989898961083c565b90508873ffffffffffffffffffffffffffffffffffffffff167fb685fc177a65d56e75964fcfa7a66e03deee8c4eb23b284a70448a3fb2848aa98989888888604051610523959493929190610fb9565b60405180910390a280915050979650505050505050565b6105426109c9565b600260008381526020019081526020016000206000016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250509050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361064e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064590611069565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b61069f610a07565b600260008381526020019081526020016000206004016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050919050565b600080600260008481526020019081526020016000209050838160040160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018160040160020160006101000a81548160ff02191690831515021790555060006107cf82600901546108fc565b905080826000016001018190555042826000016002018190555081600a0154426107f991906110b8565b8260000160030181905550600182600c0160006101000a81548160ff0219169083600581111561082c5761082b610c77565b5b0217905550839250505092915050565b60006108486001610919565b6000610854600161092f565b90506000600260008381526020019081526020016000209050898160000160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508881600701819055508781600801819055508581600901819055508481600a01819055508381600b01819055508681600401600101819055508192505050979650505050505050565b600061091260038361093d90919063ffffffff16565b9050919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000818361094b91906110ec565b905092915050565b6040518060200160405280600081525090565b60405180610100016040528061097a6109c9565b8152602001610987610a07565b81526020016000815260200160008152602001600081526020016000815260200160008152602001600060058111156109c3576109c2610c77565b5b81525090565b6040518060800160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081525090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000151581525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a7082610a45565b9050919050565b610a8081610a65565b8114610a8b57600080fd5b50565b600081359050610a9d81610a77565b92915050565b6000819050919050565b610ab681610aa3565b8114610ac157600080fd5b50565b600081359050610ad381610aad565b92915050565b60008060408385031215610af057610aef610a40565b5b6000610afe85828601610a8e565b9250506020610b0f85828601610ac4565b9150509250929050565b610b2281610aa3565b82525050565b6000602082019050610b3d6000830184610b19565b92915050565b610b4c81610aa3565b82525050565b602082016000820151610b686000850182610b43565b50505050565b6000602082019050610b836000830184610b52565b92915050565b600060208284031215610b9f57610b9e610a40565b5b6000610bad84828501610ac4565b91505092915050565b610bbf81610a65565b82525050565b608082016000820151610bdb6000850182610bb6565b506020820151610bee6020850182610b43565b506040820151610c016040850182610b43565b506060820151610c146060850182610b43565b50505050565b60008115159050919050565b610c2f81610c1a565b82525050565b606082016000820151610c4b6000850182610bb6565b506020820151610c5e6020850182610b43565b506040820151610c716040850182610c26565b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110610cb757610cb6610c77565b5b50565b6000819050610cc882610ca6565b919050565b6000610cd882610cba565b9050919050565b610ce881610ccd565b82525050565b6101a082016000820151610d056000850182610bc5565b506020820151610d186080850182610c35565b506040820151610d2b60e0850182610b43565b506060820151610d3f610100850182610b43565b506080820151610d53610120850182610b43565b5060a0820151610d67610140850182610b43565b5060c0820151610d7b610160850182610b43565b5060e0820151610d8f610180850182610cdf565b50505050565b60006101a082019050610dab6000830184610cee565b92915050565b600080600080600080600060e0888a031215610dd057610dcf610a40565b5b6000610dde8a828b01610a8e565b9750506020610def8a828b01610ac4565b9650506040610e008a828b01610ac4565b9550506060610e118a828b01610ac4565b9450506080610e228a828b01610ac4565b93505060a0610e338a828b01610ac4565b92505060c0610e448a828b01610ac4565b91505092959891949750929550565b608082016000820151610e696000850182610bb6565b506020820151610e7c6020850182610b43565b506040820151610e8f6040850182610b43565b506060820151610ea26060850182610b43565b50505050565b6000608082019050610ebd6000830184610e53565b92915050565b600060208284031215610ed957610ed8610a40565b5b6000610ee784828501610a8e565b91505092915050565b610ef981610c1a565b82525050565b6000602082019050610f146000830184610ef0565b92915050565b606082016000820151610f306000850182610bb6565b506020820151610f436020850182610b43565b506040820151610f566040850182610c26565b50505050565b6000606082019050610f716000830184610f1a565b92915050565b600081519050610f8681610aad565b92915050565b600060208284031215610fa257610fa1610a40565b5b6000610fb084828501610f77565b91505092915050565b600060a082019050610fce6000830188610b19565b610fdb6020830187610b19565b610fe86040830186610b19565b610ff56060830185610b19565b6110026080830184610b19565b9695505050505050565b600082825260208201905092915050565b7f496e76616c696420616464726573730000000000000000000000000000000000600082015250565b6000611053600f8361100c565b915061105e8261101d565b602082019050919050565b6000602082019050818103600083015261108281611046565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006110c382610aa3565b91506110ce83610aa3565b92508282019050808211156110e6576110e5611089565b5b92915050565b60006110f782610aa3565b915061110283610aa3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561113b5761113a611089565b5b82820290509291505056fea2646970667358221220361116ef526377e021db60b8c02abb222116ebc0d31449288d020266f717bf3664736f6c63430008100033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100885760003560e01c80635953cd051161005b5780635953cd05146101295780635bf608b8146101595780637adbf97314610189578063d6a9de51146101b957610088565b8063021c0fd11461008d57806338f5a491146100bd578063496ab39a146100db5780634a0d89ba146100f9575b600080fd5b6100a760048036038101906100a29190610ad9565b6101e9565b6040516100b49190610b28565b60405180910390f35b6100c5610250565b6040516100d29190610b28565b60405180910390f35b6100e36102eb565b6040516100f09190610b6e565b60405180910390f35b610113600480360381019061010e9190610b89565b61030f565b6040516101209190610d95565b60405180910390f35b610143600480360381019061013e9190610db1565b6104c1565b6040516101509190610b28565b60405180910390f35b610173600480360381019061016e9190610b89565b61053a565b6040516101809190610ea8565b60405180910390f35b6101a3600480360381019061019e9190610ec3565b6105de565b6040516101b09190610eff565b60405180910390f35b6101d360048036038101906101ce9190610b89565b610697565b6040516101e09190610f5c565b60405180910390f35b6000806101f68484610742565b90508373ffffffffffffffffffffffffffffffffffffffff167f96a33d274168dd9f48db62d10e3a70d2a3d6b885f26deb52297a7db0d779aecd8460405161023e9190610b28565b60405180910390a28091505092915050565b60008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166398d5fdca6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e29190610f8c565b90508091505090565b6102f3610953565b6001604051806020016040529081600082015481525050905090565b610317610966565b6002600083815260200190815260200160002060405180610100016040529081600082016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250508152602001600482016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900460ff1615151515815250508152602001600782015481526020016008820154815260200160098201548152602001600a8201548152602001600b8201548152602001600c820160009054906101000a900460ff1660058111156104a4576104a3610c77565b5b60058111156104b6576104b5610c77565b5b815250509050919050565b6000806104d38989898989898961083c565b90508873ffffffffffffffffffffffffffffffffffffffff167fb685fc177a65d56e75964fcfa7a66e03deee8c4eb23b284a70448a3fb2848aa98989888888604051610523959493929190610fb9565b60405180910390a280915050979650505050505050565b6105426109c9565b600260008381526020019081526020016000206000016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250509050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361064e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064590611069565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b61069f610a07565b600260008381526020019081526020016000206004016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050919050565b600080600260008481526020019081526020016000209050838160040160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018160040160020160006101000a81548160ff02191690831515021790555060006107cf82600901546108fc565b905080826000016001018190555042826000016002018190555081600a0154426107f991906110b8565b8260000160030181905550600182600c0160006101000a81548160ff0219169083600581111561082c5761082b610c77565b5b0217905550839250505092915050565b60006108486001610919565b6000610854600161092f565b90506000600260008381526020019081526020016000209050898160000160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508881600701819055508781600801819055508581600901819055508481600a01819055508381600b01819055508681600401600101819055508192505050979650505050505050565b600061091260038361093d90919063ffffffff16565b9050919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000818361094b91906110ec565b905092915050565b6040518060200160405280600081525090565b60405180610100016040528061097a6109c9565b8152602001610987610a07565b81526020016000815260200160008152602001600081526020016000815260200160008152602001600060058111156109c3576109c2610c77565b5b81525090565b6040518060800160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081525090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000151581525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a7082610a45565b9050919050565b610a8081610a65565b8114610a8b57600080fd5b50565b600081359050610a9d81610a77565b92915050565b6000819050919050565b610ab681610aa3565b8114610ac157600080fd5b50565b600081359050610ad381610aad565b92915050565b60008060408385031215610af057610aef610a40565b5b6000610afe85828601610a8e565b9250506020610b0f85828601610ac4565b9150509250929050565b610b2281610aa3565b82525050565b6000602082019050610b3d6000830184610b19565b92915050565b610b4c81610aa3565b82525050565b602082016000820151610b686000850182610b43565b50505050565b6000602082019050610b836000830184610b52565b92915050565b600060208284031215610b9f57610b9e610a40565b5b6000610bad84828501610ac4565b91505092915050565b610bbf81610a65565b82525050565b608082016000820151610bdb6000850182610bb6565b506020820151610bee6020850182610b43565b506040820151610c016040850182610b43565b506060820151610c146060850182610b43565b50505050565b60008115159050919050565b610c2f81610c1a565b82525050565b606082016000820151610c4b6000850182610bb6565b506020820151610c5e6020850182610b43565b506040820151610c716040850182610c26565b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110610cb757610cb6610c77565b5b50565b6000819050610cc882610ca6565b919050565b6000610cd882610cba565b9050919050565b610ce881610ccd565b82525050565b6101a082016000820151610d056000850182610bc5565b506020820151610d186080850182610c35565b506040820151610d2b60e0850182610b43565b506060820151610d3f610100850182610b43565b506080820151610d53610120850182610b43565b5060a0820151610d67610140850182610b43565b5060c0820151610d7b610160850182610b43565b5060e0820151610d8f610180850182610cdf565b50505050565b60006101a082019050610dab6000830184610cee565b92915050565b600080600080600080600060e0888a031215610dd057610dcf610a40565b5b6000610dde8a828b01610a8e565b9750506020610def8a828b01610ac4565b9650506040610e008a828b01610ac4565b9550506060610e118a828b01610ac4565b9450506080610e228a828b01610ac4565b93505060a0610e338a828b01610ac4565b92505060c0610e448a828b01610ac4565b91505092959891949750929550565b608082016000820151610e696000850182610bb6565b506020820151610e7c6020850182610b43565b506040820151610e8f6040850182610b43565b506060820151610ea26060850182610b43565b50505050565b6000608082019050610ebd6000830184610e53565b92915050565b600060208284031215610ed957610ed8610a40565b5b6000610ee784828501610a8e565b91505092915050565b610ef981610c1a565b82525050565b6000602082019050610f146000830184610ef0565b92915050565b606082016000820151610f306000850182610bb6565b506020820151610f436020850182610b43565b506040820151610f566040850182610c26565b50505050565b6000606082019050610f716000830184610f1a565b92915050565b600081519050610f8681610aad565b92915050565b600060208284031215610fa257610fa1610a40565b5b6000610fb084828501610f77565b91505092915050565b600060a082019050610fce6000830188610b19565b610fdb6020830187610b19565b610fe86040830186610b19565b610ff56060830185610b19565b6110026080830184610b19565b9695505050505050565b600082825260208201905092915050565b7f496e76616c696420616464726573730000000000000000000000000000000000600082015250565b6000611053600f8361100c565b915061105e8261101d565b602082019050919050565b6000602082019050818103600083015261108281611046565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006110c382610aa3565b91506110ce83610aa3565b92508282019050808211156110e6576110e5611089565b5b92915050565b60006110f782610aa3565b915061110283610aa3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561113b5761113a611089565b5b82820290509291505056fea2646970667358221220361116ef526377e021db60b8c02abb222116ebc0d31449288d020266f717bf3664736f6c63430008100033',
  immutableReferences: {},
  generatedSources: [],
  deployedGeneratedSources: [
    {
      ast: {
        nodeType: 'YulBlock',
        src: '0:15154:7',
        statements: [
          {
            body: {
              nodeType: 'YulBlock',
              src: '47:35:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '57:19:7',
                  value: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '73:2:7',
                        type: '',
                        value: '64',
                      },
                    ],
                    functionName: {
                      name: 'mload',
                      nodeType: 'YulIdentifier',
                      src: '67:5:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '67:9:7',
                  },
                  variableNames: [
                    {
                      name: 'memPtr',
                      nodeType: 'YulIdentifier',
                      src: '57:6:7',
                    },
                  ],
                },
              ],
            },
            name: 'allocate_unbounded',
            nodeType: 'YulFunctionDefinition',
            returnVariables: [
              {
                name: 'memPtr',
                nodeType: 'YulTypedName',
                src: '40:6:7',
                type: '',
              },
            ],
            src: '7:75:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '177:28:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '194:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '197:1:7',
                        type: '',
                        value: '0',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '187:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '187:12:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '187:12:7',
                },
              ],
            },
            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
            nodeType: 'YulFunctionDefinition',
            src: '88:117:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '300:28:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '317:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '320:1:7',
                        type: '',
                        value: '0',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '310:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '310:12:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '310:12:7',
                },
              ],
            },
            name: 'revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db',
            nodeType: 'YulFunctionDefinition',
            src: '211:117:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '379:81:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '389:65:7',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '404:5:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '411:42:7',
                        type: '',
                        value: '0xffffffffffffffffffffffffffffffffffffffff',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '400:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '400:54:7',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '389:7:7',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint160',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '361:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '371:7:7',
                type: '',
              },
            ],
            src: '334:126:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '511:51:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '521:35:7',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '550:5:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint160',
                      nodeType: 'YulIdentifier',
                      src: '532:17:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '532:24:7',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '521:7:7',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '493:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '503:7:7',
                type: '',
              },
            ],
            src: '466:96:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '611:79:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '668:16:7',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '677:1:7',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '680:1:7',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '670:6:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '670:12:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '670:12:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '634:5:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '659:5:7',
                              },
                            ],
                            functionName: {
                              name: 'cleanup_t_address',
                              nodeType: 'YulIdentifier',
                              src: '641:17:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '641:24:7',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '631:2:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '631:35:7',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '624:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '624:43:7',
                  },
                  nodeType: 'YulIf',
                  src: '621:63:7',
                },
              ],
            },
            name: 'validator_revert_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '604:5:7',
                type: '',
              },
            ],
            src: '568:122:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '748:87:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '758:29:7',
                  value: {
                    arguments: [
                      {
                        name: 'offset',
                        nodeType: 'YulIdentifier',
                        src: '780:6:7',
                      },
                    ],
                    functionName: {
                      name: 'calldataload',
                      nodeType: 'YulIdentifier',
                      src: '767:12:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '767:20:7',
                  },
                  variableNames: [
                    {
                      name: 'value',
                      nodeType: 'YulIdentifier',
                      src: '758:5:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '823:5:7',
                      },
                    ],
                    functionName: {
                      name: 'validator_revert_t_address',
                      nodeType: 'YulIdentifier',
                      src: '796:26:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '796:33:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '796:33:7',
                },
              ],
            },
            name: 'abi_decode_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'offset',
                nodeType: 'YulTypedName',
                src: '726:6:7',
                type: '',
              },
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '734:3:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '742:5:7',
                type: '',
              },
            ],
            src: '696:139:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '886:32:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '896:16:7',
                  value: {
                    name: 'value',
                    nodeType: 'YulIdentifier',
                    src: '907:5:7',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '896:7:7',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '868:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '878:7:7',
                type: '',
              },
            ],
            src: '841:77:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '967:79:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1024:16:7',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1033:1:7',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1036:1:7',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '1026:6:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1026:12:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1026:12:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '990:5:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '1015:5:7',
                              },
                            ],
                            functionName: {
                              name: 'cleanup_t_uint256',
                              nodeType: 'YulIdentifier',
                              src: '997:17:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '997:24:7',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '987:2:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '987:35:7',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '980:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '980:43:7',
                  },
                  nodeType: 'YulIf',
                  src: '977:63:7',
                },
              ],
            },
            name: 'validator_revert_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '960:5:7',
                type: '',
              },
            ],
            src: '924:122:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1104:87:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '1114:29:7',
                  value: {
                    arguments: [
                      {
                        name: 'offset',
                        nodeType: 'YulIdentifier',
                        src: '1136:6:7',
                      },
                    ],
                    functionName: {
                      name: 'calldataload',
                      nodeType: 'YulIdentifier',
                      src: '1123:12:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1123:20:7',
                  },
                  variableNames: [
                    {
                      name: 'value',
                      nodeType: 'YulIdentifier',
                      src: '1114:5:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '1179:5:7',
                      },
                    ],
                    functionName: {
                      name: 'validator_revert_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '1152:26:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1152:33:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '1152:33:7',
                },
              ],
            },
            name: 'abi_decode_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'offset',
                nodeType: 'YulTypedName',
                src: '1082:6:7',
                type: '',
              },
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '1090:3:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '1098:5:7',
                type: '',
              },
            ],
            src: '1052:139:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1280:391:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1326:83:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
                            nodeType: 'YulIdentifier',
                            src: '1328:77:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1328:79:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1328:79:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1301:7:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1310:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1297:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1297:23:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1322:2:7',
                        type: '',
                        value: '64',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '1293:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1293:32:7',
                  },
                  nodeType: 'YulIf',
                  src: '1290:119:7',
                },
                {
                  nodeType: 'YulBlock',
                  src: '1419:117:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1434:15:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1448:1:7',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1438:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1463:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1498:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1509:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1494:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1494:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1518:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '1473:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1473:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '1463:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '1546:118:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1561:16:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1575:2:7',
                        type: '',
                        value: '32',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1565:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1591:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1626:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1637:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1622:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1622:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1646:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '1601:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1601:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '1591:6:7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_addresst_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '1242:9:7',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '1253:7:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '1265:6:7',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '1273:6:7',
                type: '',
              },
            ],
            src: '1197:474:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1742:53:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '1759:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '1782:5:7',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '1764:17:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1764:24:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '1752:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1752:37:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '1752:37:7',
                },
              ],
            },
            name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '1730:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '1737:3:7',
                type: '',
              },
            ],
            src: '1677:118:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1899:124:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '1909:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '1921:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1932:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '1917:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1917:18:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '1909:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '1989:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2002:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2013:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '1998:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1998:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '1945:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1945:71:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '1945:71:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '1871:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '1883:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '1894:4:7',
                type: '',
              },
            ],
            src: '1801:222:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2084:53:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2101:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '2124:5:7',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '2106:17:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2106:24:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2094:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2094:37:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2094:37:7',
                },
              ],
            },
            name: 'abi_encode_t_uint256_to_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '2072:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2079:3:7',
                type: '',
              },
            ],
            src: '2029:108:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2311:219:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '2321:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2337:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2342:4:7',
                        type: '',
                        value: '0x20',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '2333:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2333:14:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '2325:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '2357:166:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '2394:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '2424:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2431:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '2420:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2420:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '2414:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2414:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '2398:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '2484:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '2502:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '2507:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '2498:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '2498:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '2450:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2450:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '2450:63:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Counter_$5_memory_ptr_to_t_struct$_Counter_$5_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '2298:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2305:3:7',
                type: '',
              },
            ],
            src: '2201:329:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2678:168:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '2688:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '2700:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2711:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '2696:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2696:18:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '2688:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '2812:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2825:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2836:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2821:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2821:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_struct$_Counter_$5_memory_ptr_to_t_struct$_Counter_$5_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '2724:87:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2724:115:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2724:115:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_struct$_Counter_$5_memory_ptr__to_t_struct$_Counter_$5_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '2650:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '2662:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '2673:4:7',
                type: '',
              },
            ],
            src: '2536:310:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2918:263:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '2964:83:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
                            nodeType: 'YulIdentifier',
                            src: '2966:77:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '2966:79:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '2966:79:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '2939:7:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '2948:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '2935:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2935:23:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2960:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '2931:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2931:32:7',
                  },
                  nodeType: 'YulIf',
                  src: '2928:119:7',
                },
                {
                  nodeType: 'YulBlock',
                  src: '3057:117:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '3072:15:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3086:1:7',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '3076:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '3101:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '3136:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '3147:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3132:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3132:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '3156:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3111:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3111:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '3101:6:7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '2888:9:7',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '2899:7:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '2911:6:7',
                type: '',
              },
            ],
            src: '2852:329:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3242:53:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3259:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '3282:5:7',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_address',
                          nodeType: 'YulIdentifier',
                          src: '3264:17:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3264:24:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '3252:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3252:37:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3252:37:7',
                },
              ],
            },
            name: 'abi_encode_t_address_to_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '3230:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '3237:3:7',
                type: '',
              },
            ],
            src: '3187:108:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3449:756:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '3459:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3475:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3480:4:7',
                        type: '',
                        value: '0x80',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '3471:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3471:14:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '3463:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '3495:164:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '3530:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '3560:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3567:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3556:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3556:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '3550:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3550:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '3534:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '3620:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '3638:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3643:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3634:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3634:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_address_to_t_address',
                          nodeType: 'YulIdentifier',
                          src: '3586:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3586:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '3586:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '3669:167:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '3707:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '3737:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3744:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3733:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3733:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '3727:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3727:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '3711:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '3797:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '3815:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3820:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3811:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3811:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3763:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3763:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '3763:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '3846:171:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '3888:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '3918:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '3925:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3914:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3914:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '3908:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3908:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '3892:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '3978:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '3996:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4001:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '3992:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '3992:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3944:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3944:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '3944:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '4027:171:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '4069:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '4099:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4106:4:7',
                                type: '',
                                value: '0x60',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4095:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4095:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '4089:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4089:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '4073:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '4159:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '4177:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4182:4:7',
                                type: '',
                                value: '0x60',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4173:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4173:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '4125:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4125:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4125:63:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '3436:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '3443:3:7',
                type: '',
              },
            ],
            src: '3349:856:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '4253:48:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '4263:32:7',
                  value: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '4288:5:7',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '4281:6:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4281:13:7',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '4274:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4274:21:7',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '4263:7:7',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_bool',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '4235:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '4245:7:7',
                type: '',
              },
            ],
            src: '4211:90:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '4356:50:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '4373:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '4393:5:7',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_bool',
                          nodeType: 'YulIdentifier',
                          src: '4378:14:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4378:21:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '4366:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4366:34:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '4366:34:7',
                },
              ],
            },
            name: 'abi_encode_t_bool_to_t_bool',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '4344:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '4351:3:7',
                type: '',
              },
            ],
            src: '4307:99:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '4564:569:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '4574:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '4590:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '4595:4:7',
                        type: '',
                        value: '0x60',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '4586:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4586:14:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '4578:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '4610:164:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '4645:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '4675:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4682:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4671:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4671:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '4665:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4665:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '4649:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '4735:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '4753:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4758:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4749:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4749:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_address_to_t_address',
                          nodeType: 'YulIdentifier',
                          src: '4701:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4701:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4701:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '4784:167:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '4822:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '4852:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4859:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4848:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4848:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '4842:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4842:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '4826:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '4912:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '4930:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '4935:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '4926:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '4926:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '4878:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4878:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '4878:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '4961:165:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '5003:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '5033:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '5040:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '5029:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5029:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '5023:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5023:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '5007:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '5087:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '5105:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '5110:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '5101:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '5101:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_bool_to_t_bool',
                          nodeType: 'YulIdentifier',
                          src: '5059:27:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5059:57:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '5059:57:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '4551:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '4558:3:7',
                type: '',
              },
            ],
            src: '4462:671:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5167:152:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5184:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5187:77:7',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '5177:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5177:88:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5177:88:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5281:1:7',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5284:4:7',
                        type: '',
                        value: '0x21',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '5274:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5274:15:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5274:15:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5305:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5308:4:7',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '5298:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5298:15:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5298:15:7',
                },
              ],
            },
            name: 'panic_error_0x21',
            nodeType: 'YulFunctionDefinition',
            src: '5139:180:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5378:62:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '5412:22:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x21',
                            nodeType: 'YulIdentifier',
                            src: '5414:16:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '5414:18:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '5414:18:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '5401:5:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5408:1:7',
                            type: '',
                            value: '6',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '5398:2:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5398:12:7',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '5391:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5391:20:7',
                  },
                  nodeType: 'YulIf',
                  src: '5388:46:7',
                },
              ],
            },
            name: 'validator_assert_t_enum$_Status_$640',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '5371:5:7',
                type: '',
              },
            ],
            src: '5325:115:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5501:76:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5511:16:7',
                  value: {
                    name: 'value',
                    nodeType: 'YulIdentifier',
                    src: '5522:5:7',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '5511:7:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '5565:5:7',
                      },
                    ],
                    functionName: {
                      name: 'validator_assert_t_enum$_Status_$640',
                      nodeType: 'YulIdentifier',
                      src: '5528:36:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5528:43:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5528:43:7',
                },
              ],
            },
            name: 'cleanup_t_enum$_Status_$640',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '5483:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '5493:7:7',
                type: '',
              },
            ],
            src: '5446:131:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5651:63:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5661:47:7',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '5702:5:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_enum$_Status_$640',
                      nodeType: 'YulIdentifier',
                      src: '5674:27:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5674:34:7',
                  },
                  variableNames: [
                    {
                      name: 'converted',
                      nodeType: 'YulIdentifier',
                      src: '5661:9:7',
                    },
                  ],
                },
              ],
            },
            name: 'convert_t_enum$_Status_$640_to_t_uint8',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '5631:5:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'converted',
                nodeType: 'YulTypedName',
                src: '5641:9:7',
                type: '',
              },
            ],
            src: '5583:131:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5783:74:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '5800:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '5844:5:7',
                          },
                        ],
                        functionName: {
                          name: 'convert_t_enum$_Status_$640_to_t_uint8',
                          nodeType: 'YulIdentifier',
                          src: '5805:38:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5805:45:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '5793:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5793:58:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5793:58:7',
                },
              ],
            },
            name: 'abi_encode_t_enum$_Status_$640_to_t_uint8',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '5771:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '5778:3:7',
                type: '',
              },
            ],
            src: '5720:137:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6017:1596:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '6027:28:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '6043:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '6048:6:7',
                        type: '',
                        value: '0x01a0',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '6039:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6039:16:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '6031:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '6065:209:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '6101:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '6131:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6138:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6127:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6127:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '6121:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6121:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '6105:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '6235:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '6253:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6258:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6249:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6249:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr',
                          nodeType: 'YulIdentifier',
                          src: '6157:77:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6157:107:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '6157:107:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '6284:212:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '6321:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '6351:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6358:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6347:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6347:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '6341:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6341:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '6325:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '6457:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '6475:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6480:4:7',
                                type: '',
                                value: '0x80',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6471:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6471:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr',
                          nodeType: 'YulIdentifier',
                          src: '6377:79:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6377:109:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '6377:109:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '6506:170:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '6547:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '6577:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6584:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6573:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6573:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '6567:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6567:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '6551:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '6637:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '6655:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6660:4:7',
                                type: '',
                                value: '0xe0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6651:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6651:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '6603:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6603:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '6603:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '6686:178:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '6733:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '6763:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6770:4:7',
                                type: '',
                                value: '0x60',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6759:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6759:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '6753:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6753:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '6737:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '6823:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '6841:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6846:6:7',
                                type: '',
                                value: '0x0100',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6837:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6837:16:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '6789:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6789:65:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '6789:65:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '6874:169:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '6912:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '6942:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '6949:4:7',
                                type: '',
                                value: '0x80',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '6938:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '6938:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '6932:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6932:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '6916:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '7002:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '7020:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7025:6:7',
                                type: '',
                                value: '0x0120',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7016:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7016:16:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '6968:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6968:65:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '6968:65:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '7053:177:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '7099:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '7129:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7136:4:7',
                                type: '',
                                value: '0xa0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7125:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7125:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '7119:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7119:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '7103:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '7189:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '7207:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7212:6:7',
                                type: '',
                                value: '0x0140',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7203:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7203:16:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '7155:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7155:65:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '7155:65:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '7240:180:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '7289:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '7319:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7326:4:7',
                                type: '',
                                value: '0xc0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7315:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7315:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '7309:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7309:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '7293:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '7379:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '7397:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7402:6:7',
                                type: '',
                                value: '0x0160',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7393:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7393:16:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '7345:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7345:65:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '7345:65:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '7430:176:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '7467:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '7497:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7504:4:7',
                                type: '',
                                value: '0xe0',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7493:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7493:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '7487:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7487:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '7471:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '7565:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '7583:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '7588:6:7',
                                type: '',
                                value: '0x0180',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '7579:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '7579:16:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_enum$_Status_$640_to_t_uint8',
                          nodeType: 'YulIdentifier',
                          src: '7523:41:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7523:73:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '7523:73:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Swap_$681_memory_ptr_to_t_struct$_Swap_$681_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '6004:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '6011:3:7',
                type: '',
              },
            ],
            src: '5909:1704:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7759:167:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '7769:27:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '7781:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7792:3:7',
                        type: '',
                        value: '416',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '7777:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7777:19:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '7769:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '7892:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '7905:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '7916:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '7901:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7901:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_struct$_Swap_$681_memory_ptr_to_t_struct$_Swap_$681_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '7806:85:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7806:113:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '7806:113:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_struct$_Swap_$681_memory_ptr__to_t_struct$_Swap_$681_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '7731:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '7743:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '7754:4:7',
                type: '',
              },
            ],
            src: '7619:307:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '8100:1035:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '8147:83:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
                            nodeType: 'YulIdentifier',
                            src: '8149:77:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '8149:79:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '8149:79:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8121:7:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '8130:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '8117:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8117:23:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8142:3:7',
                        type: '',
                        value: '224',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '8113:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8113:33:7',
                  },
                  nodeType: 'YulIf',
                  src: '8110:120:7',
                },
                {
                  nodeType: 'YulBlock',
                  src: '8240:117:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8255:15:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8269:1:7',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8259:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8284:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8319:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8330:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8315:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8315:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8339:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '8294:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8294:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '8284:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '8367:118:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8382:16:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8396:2:7',
                        type: '',
                        value: '32',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8386:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8412:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8447:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8458:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8443:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8443:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8467:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '8422:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8422:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '8412:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '8495:118:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8510:16:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8524:2:7',
                        type: '',
                        value: '64',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8514:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8540:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8575:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8586:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8571:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8571:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8595:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '8550:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8550:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value2',
                          nodeType: 'YulIdentifier',
                          src: '8540:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '8623:118:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8638:16:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8652:2:7',
                        type: '',
                        value: '96',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8642:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8668:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8703:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8714:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8699:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8699:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8723:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '8678:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8678:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value3',
                          nodeType: 'YulIdentifier',
                          src: '8668:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '8751:119:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8766:17:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8780:3:7',
                        type: '',
                        value: '128',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8770:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8797:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8832:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8843:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8828:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8828:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8852:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '8807:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8807:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value4',
                          nodeType: 'YulIdentifier',
                          src: '8797:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '8880:119:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '8895:17:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8909:3:7',
                        type: '',
                        value: '160',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '8899:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '8926:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '8961:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '8972:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '8957:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8957:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '8981:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '8936:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8936:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value5',
                          nodeType: 'YulIdentifier',
                          src: '8926:6:7',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '9009:119:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '9024:17:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '9038:3:7',
                        type: '',
                        value: '192',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '9028:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '9055:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '9090:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '9101:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9086:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9086:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '9110:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '9065:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9065:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value6',
                          nodeType: 'YulIdentifier',
                          src: '9055:6:7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_addresst_uint256t_uint256t_uint256t_uint256t_uint256t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '8022:9:7',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '8033:7:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '8045:6:7',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '8053:6:7',
                type: '',
              },
              {
                name: 'value2',
                nodeType: 'YulTypedName',
                src: '8061:6:7',
                type: '',
              },
              {
                name: 'value3',
                nodeType: 'YulTypedName',
                src: '8069:6:7',
                type: '',
              },
              {
                name: 'value4',
                nodeType: 'YulTypedName',
                src: '8077:6:7',
                type: '',
              },
              {
                name: 'value5',
                nodeType: 'YulTypedName',
                src: '8085:6:7',
                type: '',
              },
              {
                name: 'value6',
                nodeType: 'YulTypedName',
                src: '8093:6:7',
                type: '',
              },
            ],
            src: '7932:1203:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '9299:756:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '9309:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '9325:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '9330:4:7',
                        type: '',
                        value: '0x80',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '9321:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '9321:14:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '9313:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '9345:164:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '9380:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '9410:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9417:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9406:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9406:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '9400:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9400:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '9384:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '9470:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '9488:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9493:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9484:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9484:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_address_to_t_address',
                          nodeType: 'YulIdentifier',
                          src: '9436:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9436:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '9436:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '9519:167:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '9557:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '9587:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9594:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9583:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9583:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '9577:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9577:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '9561:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '9647:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '9665:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9670:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9661:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9661:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '9613:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9613:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '9613:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '9696:171:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '9738:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '9768:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9775:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9764:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9764:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '9758:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9758:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '9742:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '9828:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '9846:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9851:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9842:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9842:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '9794:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9794:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '9794:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '9877:171:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '9919:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '9949:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '9956:4:7',
                                type: '',
                                value: '0x60',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '9945:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '9945:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '9939:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9939:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '9923:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '10009:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '10027:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '10032:4:7',
                                type: '',
                                value: '0x60',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '10023:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '10023:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '9975:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '9975:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '9975:63:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '9286:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '9293:3:7',
                type: '',
              },
            ],
            src: '9189:866:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '10203:169:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '10213:27:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '10225:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '10236:3:7',
                        type: '',
                        value: '128',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '10221:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10221:19:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '10213:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '10338:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '10351:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '10362:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '10347:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '10347:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '10250:87:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10250:115:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '10250:115:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_struct$_Buyer_$654_memory_ptr__to_t_struct$_Buyer_$654_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '10175:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '10187:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '10198:4:7',
                type: '',
              },
            ],
            src: '10061:311:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '10444:263:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '10490:83:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
                            nodeType: 'YulIdentifier',
                            src: '10492:77:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '10492:79:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '10492:79:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '10465:7:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '10474:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '10461:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '10461:23:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '10486:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '10457:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10457:32:7',
                  },
                  nodeType: 'YulIf',
                  src: '10454:119:7',
                },
                {
                  nodeType: 'YulBlock',
                  src: '10583:117:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '10598:15:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '10612:1:7',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '10602:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '10627:63:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '10662:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '10673:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '10658:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '10658:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '10682:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '10637:20:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '10637:53:7',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '10627:6:7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '10414:9:7',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '10425:7:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '10437:6:7',
                type: '',
              },
            ],
            src: '10378:329:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '10772:50:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '10789:3:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '10809:5:7',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_bool',
                          nodeType: 'YulIdentifier',
                          src: '10794:14:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '10794:21:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '10782:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10782:34:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '10782:34:7',
                },
              ],
            },
            name: 'abi_encode_t_bool_to_t_bool_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '10760:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '10767:3:7',
                type: '',
              },
            ],
            src: '10713:109:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '10920:118:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '10930:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '10942:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '10953:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '10938:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10938:18:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '10930:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '11004:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '11017:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '11028:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '11013:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11013:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_bool_to_t_bool_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '10966:37:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '10966:65:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '10966:65:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '10892:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '10904:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '10915:4:7',
                type: '',
              },
            ],
            src: '10828:210:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '11206:569:7',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '11216:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '11232:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '11237:4:7',
                        type: '',
                        value: '0x60',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '11228:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '11228:14:7',
                  },
                  variables: [
                    {
                      name: 'tail',
                      nodeType: 'YulTypedName',
                      src: '11220:4:7',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '11252:164:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '11287:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '11317:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11324:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11313:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11313:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '11307:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11307:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '11291:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '11377:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '11395:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11400:4:7',
                                type: '',
                                value: '0x00',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11391:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11391:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_address_to_t_address',
                          nodeType: 'YulIdentifier',
                          src: '11343:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11343:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '11343:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '11426:167:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '11464:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '11494:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11501:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11490:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11490:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '11484:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11484:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '11468:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '11554:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '11572:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11577:4:7',
                                type: '',
                                value: '0x20',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11568:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11568:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_uint256_to_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '11520:33:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11520:63:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '11520:63:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '11603:165:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '11645:43:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '11675:5:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11682:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11671:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11671:16:7',
                          },
                        ],
                        functionName: {
                          name: 'mload',
                          nodeType: 'YulIdentifier',
                          src: '11665:5:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11665:23:7',
                      },
                      variables: [
                        {
                          name: 'memberValue0',
                          nodeType: 'YulTypedName',
                          src: '11649:12:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      expression: {
                        arguments: [
                          {
                            name: 'memberValue0',
                            nodeType: 'YulIdentifier',
                            src: '11729:12:7',
                          },
                          {
                            arguments: [
                              {
                                name: 'pos',
                                nodeType: 'YulIdentifier',
                                src: '11747:3:7',
                              },
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '11752:4:7',
                                type: '',
                                value: '0x40',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '11743:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '11743:14:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_encode_t_bool_to_t_bool',
                          nodeType: 'YulIdentifier',
                          src: '11701:27:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '11701:57:7',
                      },
                      nodeType: 'YulExpressionStatement',
                      src: '11701:57:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '11193:5:7',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '11200:3:7',
                type: '',
              },
            ],
            src: '11094:681:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '11925:170:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '11935:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '11947:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '11958:2:7',
                        type: '',
                        value: '96',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '11943:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '11943:18:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '11935:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '12061:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '12074:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '12085:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '12070:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '12070:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '11971:89:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '11971:117:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '11971:117:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_struct$_Seller_$661_memory_ptr__to_t_struct$_Seller_$661_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '11897:9:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '11909:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '11920:4:7',
                type: '',
              },
            ],
            src: '11781:314:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '12164:80:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '12174:22:7',
                  value: {
                    arguments: [
                      {
                        name: 'offset',
                        nodeType: 'YulIdentifier',
                        src: '12189:6:7',
                      },
                    ],
                    functionName: {
                      name: 'mload',
                      nodeType: 'YulIdentifier',
                      src: '12183:5:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12183:13:7',
                  },
                  variableNames: [
                    {
                      name: 'value',
                      nodeType: 'YulIdentifier',
                      src: '12174:5:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '12232:5:7',
                      },
                    ],
                    functionName: {
                      name: 'validator_revert_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '12205:26:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12205:33:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '12205:33:7',
                },
              ],
            },
            name: 'abi_decode_t_uint256_fromMemory',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'offset',
                nodeType: 'YulTypedName',
                src: '12142:6:7',
                type: '',
              },
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '12150:3:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '12158:5:7',
                type: '',
              },
            ],
            src: '12101:143:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '12327:274:7',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '12373:83:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b',
                            nodeType: 'YulIdentifier',
                            src: '12375:77:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '12375:79:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '12375:79:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '12348:7:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '12357:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '12344:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '12344:23:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '12369:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '12340:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12340:32:7',
                  },
                  nodeType: 'YulIf',
                  src: '12337:119:7',
                },
                {
                  nodeType: 'YulBlock',
                  src: '12466:128:7',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '12481:15:7',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '12495:1:7',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '12485:6:7',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '12510:74:7',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '12556:9:7',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '12567:6:7',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '12552:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '12552:22:7',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '12576:7:7',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256_fromMemory',
                          nodeType: 'YulIdentifier',
                          src: '12520:31:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '12520:64:7',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '12510:6:7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_uint256_fromMemory',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '12297:9:7',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '12308:7:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '12320:6:7',
                type: '',
              },
            ],
            src: '12250:351:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '12817:454:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '12827:27:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '12839:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '12850:3:7',
                        type: '',
                        value: '160',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '12835:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12835:19:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '12827:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '12908:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '12921:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '12932:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '12917:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '12917:17:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '12864:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12864:71:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '12864:71:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value1',
                        nodeType: 'YulIdentifier',
                        src: '12989:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '13002:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '13013:2:7',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '12998:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '12998:18:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '12945:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '12945:72:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '12945:72:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value2',
                        nodeType: 'YulIdentifier',
                        src: '13071:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '13084:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '13095:2:7',
                            type: '',
                            value: '64',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '13080:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '13080:18:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '13027:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13027:72:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13027:72:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value3',
                        nodeType: 'YulIdentifier',
                        src: '13153:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '13166:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '13177:2:7',
                            type: '',
                            value: '96',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '13162:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '13162:18:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '13109:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13109:72:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13109:72:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value4',
                        nodeType: 'YulIdentifier',
                        src: '13235:6:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '13248:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '13259:3:7',
                            type: '',
                            value: '128',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '13244:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '13244:19:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '13191:43:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13191:73:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13191:73:7',
                },
              ],
            },
            name: 'abi_encode_tuple_t_uint256_t_uint256_t_uint256_t_uint256_t_uint256__to_t_uint256_t_uint256_t_uint256_t_uint256_t_uint256__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '12757:9:7',
                type: '',
              },
              {
                name: 'value4',
                nodeType: 'YulTypedName',
                src: '12769:6:7',
                type: '',
              },
              {
                name: 'value3',
                nodeType: 'YulTypedName',
                src: '12777:6:7',
                type: '',
              },
              {
                name: 'value2',
                nodeType: 'YulTypedName',
                src: '12785:6:7',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '12793:6:7',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '12801:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '12812:4:7',
                type: '',
              },
            ],
            src: '12607:664:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '13373:73:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '13390:3:7',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '13395:6:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '13383:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13383:19:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13383:19:7',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '13411:29:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '13430:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '13435:4:7',
                        type: '',
                        value: '0x20',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '13426:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13426:14:7',
                  },
                  variableNames: [
                    {
                      name: 'updated_pos',
                      nodeType: 'YulIdentifier',
                      src: '13411:11:7',
                    },
                  ],
                },
              ],
            },
            name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '13345:3:7',
                type: '',
              },
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '13350:6:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'updated_pos',
                nodeType: 'YulTypedName',
                src: '13361:11:7',
                type: '',
              },
            ],
            src: '13277:169:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '13558:59:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'memPtr',
                            nodeType: 'YulIdentifier',
                            src: '13580:6:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '13588:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '13576:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '13576:14:7',
                      },
                      {
                        hexValue: '496e76616c69642061646472657373',
                        kind: 'string',
                        nodeType: 'YulLiteral',
                        src: '13592:17:7',
                        type: '',
                        value: 'Invalid address',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '13569:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13569:41:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13569:41:7',
                },
              ],
            },
            name: 'store_literal_in_memory_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'memPtr',
                nodeType: 'YulTypedName',
                src: '13550:6:7',
                type: '',
              },
            ],
            src: '13452:165:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '13769:220:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '13779:74:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '13845:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '13850:2:7',
                        type: '',
                        value: '15',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '13786:58:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13786:67:7',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '13779:3:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '13951:3:7',
                      },
                    ],
                    functionName: {
                      name: 'store_literal_in_memory_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226',
                      nodeType: 'YulIdentifier',
                      src: '13862:88:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13862:93:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '13862:93:7',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '13964:19:7',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '13975:3:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '13980:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '13971:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '13971:12:7',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '13964:3:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '13757:3:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '13765:3:7',
                type: '',
              },
            ],
            src: '13623:366:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '14166:248:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '14176:26:7',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '14188:9:7',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14199:2:7',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '14184:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14184:18:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '14176:4:7',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '14223:9:7',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '14234:1:7',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '14219:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '14219:17:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '14242:4:7',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '14248:9:7',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '14238:3:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '14238:20:7',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '14212:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14212:47:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '14212:47:7',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '14268:139:7',
                  value: {
                    arguments: [
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '14402:4:7',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '14276:124:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14276:131:7',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '14268:4:7',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '14146:9:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '14161:4:7',
                type: '',
              },
            ],
            src: '13995:419:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '14448:152:7',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14465:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14468:77:7',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '14458:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14458:88:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '14458:88:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14562:1:7',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14565:4:7',
                        type: '',
                        value: '0x11',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '14555:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14555:15:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '14555:15:7',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14586:1:7',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '14589:4:7',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '14579:6:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14579:15:7',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '14579:15:7',
                },
              ],
            },
            name: 'panic_error_0x11',
            nodeType: 'YulFunctionDefinition',
            src: '14420:180:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '14650:147:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '14660:25:7',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '14683:1:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '14665:17:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14665:20:7',
                  },
                  variableNames: [
                    {
                      name: 'x',
                      nodeType: 'YulIdentifier',
                      src: '14660:1:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '14694:25:7',
                  value: {
                    arguments: [
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '14717:1:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '14699:17:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14699:20:7',
                  },
                  variableNames: [
                    {
                      name: 'y',
                      nodeType: 'YulIdentifier',
                      src: '14694:1:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '14728:16:7',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '14739:1:7',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '14742:1:7',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '14735:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14735:9:7',
                  },
                  variableNames: [
                    {
                      name: 'sum',
                      nodeType: 'YulIdentifier',
                      src: '14728:3:7',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '14768:22:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x11',
                            nodeType: 'YulIdentifier',
                            src: '14770:16:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '14770:18:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '14770:18:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '14760:1:7',
                      },
                      {
                        name: 'sum',
                        nodeType: 'YulIdentifier',
                        src: '14763:3:7',
                      },
                    ],
                    functionName: {
                      name: 'gt',
                      nodeType: 'YulIdentifier',
                      src: '14757:2:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14757:10:7',
                  },
                  nodeType: 'YulIf',
                  src: '14754:36:7',
                },
              ],
            },
            name: 'checked_add_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'x',
                nodeType: 'YulTypedName',
                src: '14637:1:7',
                type: '',
              },
              {
                name: 'y',
                nodeType: 'YulTypedName',
                src: '14640:1:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'sum',
                nodeType: 'YulTypedName',
                src: '14646:3:7',
                type: '',
              },
            ],
            src: '14606:191:7',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '14851:300:7',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '14861:25:7',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '14884:1:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '14866:17:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14866:20:7',
                  },
                  variableNames: [
                    {
                      name: 'x',
                      nodeType: 'YulIdentifier',
                      src: '14861:1:7',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '14895:25:7',
                  value: {
                    arguments: [
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '14918:1:7',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '14900:17:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14900:20:7',
                  },
                  variableNames: [
                    {
                      name: 'y',
                      nodeType: 'YulIdentifier',
                      src: '14895:1:7',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '15093:22:7',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x11',
                            nodeType: 'YulIdentifier',
                            src: '15095:16:7',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '15095:18:7',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '15095:18:7',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'x',
                                nodeType: 'YulIdentifier',
                                src: '15005:1:7',
                              },
                            ],
                            functionName: {
                              name: 'iszero',
                              nodeType: 'YulIdentifier',
                              src: '14998:6:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '14998:9:7',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '14991:6:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '14991:17:7',
                      },
                      {
                        arguments: [
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '15013:1:7',
                          },
                          {
                            arguments: [
                              {
                                kind: 'number',
                                nodeType: 'YulLiteral',
                                src: '15020:66:7',
                                type: '',
                                value:
                                  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                              },
                              {
                                name: 'x',
                                nodeType: 'YulIdentifier',
                                src: '15088:1:7',
                              },
                            ],
                            functionName: {
                              name: 'div',
                              nodeType: 'YulIdentifier',
                              src: '15016:3:7',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '15016:74:7',
                          },
                        ],
                        functionName: {
                          name: 'gt',
                          nodeType: 'YulIdentifier',
                          src: '15010:2:7',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '15010:81:7',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '14987:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '14987:105:7',
                  },
                  nodeType: 'YulIf',
                  src: '14984:131:7',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '15125:20:7',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '15140:1:7',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '15143:1:7',
                      },
                    ],
                    functionName: {
                      name: 'mul',
                      nodeType: 'YulIdentifier',
                      src: '15136:3:7',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '15136:9:7',
                  },
                  variableNames: [
                    {
                      name: 'product',
                      nodeType: 'YulIdentifier',
                      src: '15125:7:7',
                    },
                  ],
                },
              ],
            },
            name: 'checked_mul_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'x',
                nodeType: 'YulTypedName',
                src: '14834:1:7',
                type: '',
              },
              {
                name: 'y',
                nodeType: 'YulTypedName',
                src: '14837:1:7',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'product',
                nodeType: 'YulTypedName',
                src: '14843:7:7',
                type: '',
              },
            ],
            src: '14803:348:7',
          },
        ],
      },
      contents:
        '{\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_addresst_uint256(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    // struct Counters.Counter -> struct Counters.Counter\n    function abi_encode_t_struct$_Counter_$5_memory_ptr_to_t_struct$_Counter_$5_memory_ptr_fromStack(value, pos)  {\n        let tail := add(pos, 0x20)\n\n        {\n            // _value\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x00))\n        }\n\n    }\n\n    function abi_encode_tuple_t_struct$_Counter_$5_memory_ptr__to_t_struct$_Counter_$5_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_struct$_Counter_$5_memory_ptr_to_t_struct$_Counter_$5_memory_ptr_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_uint256(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_address_to_t_address(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    // struct Swaps.Buyer -> struct Swaps.Buyer\n    function abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr(value, pos)  {\n        let tail := add(pos, 0x80)\n\n        {\n            // addr\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_address_to_t_address(memberValue0, add(pos, 0x00))\n        }\n\n        {\n            // deposit\n\n            let memberValue0 := mload(add(value, 0x20))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x20))\n        }\n\n        {\n            // lastPayDate\n\n            let memberValue0 := mload(add(value, 0x40))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x40))\n        }\n\n        {\n            // nextPayDate\n\n            let memberValue0 := mload(add(value, 0x60))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x60))\n        }\n\n    }\n\n    function cleanup_t_bool(value) -> cleaned {\n        cleaned := iszero(iszero(value))\n    }\n\n    function abi_encode_t_bool_to_t_bool(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    // struct Swaps.Seller -> struct Swaps.Seller\n    function abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr(value, pos)  {\n        let tail := add(pos, 0x60)\n\n        {\n            // addr\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_address_to_t_address(memberValue0, add(pos, 0x00))\n        }\n\n        {\n            // deposit\n\n            let memberValue0 := mload(add(value, 0x20))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x20))\n        }\n\n        {\n            // isDeposited\n\n            let memberValue0 := mload(add(value, 0x40))\n            abi_encode_t_bool_to_t_bool(memberValue0, add(pos, 0x40))\n        }\n\n    }\n\n    function panic_error_0x21() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x21)\n        revert(0, 0x24)\n    }\n\n    function validator_assert_t_enum$_Status_$640(value) {\n        if iszero(lt(value, 6)) { panic_error_0x21() }\n    }\n\n    function cleanup_t_enum$_Status_$640(value) -> cleaned {\n        cleaned := value validator_assert_t_enum$_Status_$640(value)\n    }\n\n    function convert_t_enum$_Status_$640_to_t_uint8(value) -> converted {\n        converted := cleanup_t_enum$_Status_$640(value)\n    }\n\n    function abi_encode_t_enum$_Status_$640_to_t_uint8(value, pos) {\n        mstore(pos, convert_t_enum$_Status_$640_to_t_uint8(value))\n    }\n\n    // struct Swaps.Swap -> struct Swaps.Swap\n    function abi_encode_t_struct$_Swap_$681_memory_ptr_to_t_struct$_Swap_$681_memory_ptr_fromStack(value, pos)  {\n        let tail := add(pos, 0x01a0)\n\n        {\n            // buyer\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr(memberValue0, add(pos, 0x00))\n        }\n\n        {\n            // seller\n\n            let memberValue0 := mload(add(value, 0x20))\n            abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr(memberValue0, add(pos, 0x80))\n        }\n\n        {\n            // claimPrice\n\n            let memberValue0 := mload(add(value, 0x40))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0xe0))\n        }\n\n        {\n            // liquidationPrice\n\n            let memberValue0 := mload(add(value, 0x60))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x0100))\n        }\n\n        {\n            // premium\n\n            let memberValue0 := mload(add(value, 0x80))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x0120))\n        }\n\n        {\n            // premiumInterval\n\n            let memberValue0 := mload(add(value, 0xa0))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x0140))\n        }\n\n        {\n            // totalPremiumRounds\n\n            let memberValue0 := mload(add(value, 0xc0))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x0160))\n        }\n\n        {\n            // status\n\n            let memberValue0 := mload(add(value, 0xe0))\n            abi_encode_t_enum$_Status_$640_to_t_uint8(memberValue0, add(pos, 0x0180))\n        }\n\n    }\n\n    function abi_encode_tuple_t_struct$_Swap_$681_memory_ptr__to_t_struct$_Swap_$681_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 416)\n\n        abi_encode_t_struct$_Swap_$681_memory_ptr_to_t_struct$_Swap_$681_memory_ptr_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_addresst_uint256t_uint256t_uint256t_uint256t_uint256t_uint256(headStart, dataEnd) -> value0, value1, value2, value3, value4, value5, value6 {\n        if slt(sub(dataEnd, headStart), 224) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 96\n\n            value3 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 128\n\n            value4 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 160\n\n            value5 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 192\n\n            value6 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    // struct Swaps.Buyer -> struct Swaps.Buyer\n    function abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr_fromStack(value, pos)  {\n        let tail := add(pos, 0x80)\n\n        {\n            // addr\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_address_to_t_address(memberValue0, add(pos, 0x00))\n        }\n\n        {\n            // deposit\n\n            let memberValue0 := mload(add(value, 0x20))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x20))\n        }\n\n        {\n            // lastPayDate\n\n            let memberValue0 := mload(add(value, 0x40))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x40))\n        }\n\n        {\n            // nextPayDate\n\n            let memberValue0 := mload(add(value, 0x60))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x60))\n        }\n\n    }\n\n    function abi_encode_tuple_t_struct$_Buyer_$654_memory_ptr__to_t_struct$_Buyer_$654_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 128)\n\n        abi_encode_t_struct$_Buyer_$654_memory_ptr_to_t_struct$_Buyer_$654_memory_ptr_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    // struct Swaps.Seller -> struct Swaps.Seller\n    function abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr_fromStack(value, pos)  {\n        let tail := add(pos, 0x60)\n\n        {\n            // addr\n\n            let memberValue0 := mload(add(value, 0x00))\n            abi_encode_t_address_to_t_address(memberValue0, add(pos, 0x00))\n        }\n\n        {\n            // deposit\n\n            let memberValue0 := mload(add(value, 0x20))\n            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x20))\n        }\n\n        {\n            // isDeposited\n\n            let memberValue0 := mload(add(value, 0x40))\n            abi_encode_t_bool_to_t_bool(memberValue0, add(pos, 0x40))\n        }\n\n    }\n\n    function abi_encode_tuple_t_struct$_Seller_$661_memory_ptr__to_t_struct$_Seller_$661_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 96)\n\n        abi_encode_t_struct$_Seller_$661_memory_ptr_to_t_struct$_Seller_$661_memory_ptr_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_tuple_t_uint256_t_uint256_t_uint256_t_uint256_t_uint256__to_t_uint256_t_uint256_t_uint256_t_uint256_t_uint256__fromStack_reversed(headStart , value4, value3, value2, value1, value0) -> tail {\n        tail := add(headStart, 160)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value1,  add(headStart, 32))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value2,  add(headStart, 64))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value3,  add(headStart, 96))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value4,  add(headStart, 128))\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function store_literal_in_memory_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226(memPtr) {\n\n        mstore(add(memPtr, 0), "Invalid address")\n\n    }\n\n    function abi_encode_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 15)\n        store_literal_in_memory_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_1462473b7a4b33d32b109b815fd2324d00c9e5839b707ecf16d0ab5744f99226_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n        sum := add(x, y)\n\n        if gt(x, sum) { panic_error_0x11() }\n\n    }\n\n    function checked_mul_t_uint256(x, y) -> product {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x != 0 and y > (maxValue / x)\n        if and(iszero(iszero(x)), gt(y, div(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, x))) { panic_error_0x11() }\n\n        product := mul(x, y)\n    }\n\n}\n',
      id: 7,
      language: 'Yul',
      name: '#utility.yul',
    },
  ],
  sourceMap: '86:1479:2:-:0;;;;;;;;;;;;;;;;;;;',
  deployedSourceMap:
    '86:1479:2:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;941:198;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;177:129:3;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1471:92:2;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1143:99;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;359:578;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1246:107;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;310:217:3;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1357:110:2;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;941:198;1007:7;1022:22;1047:25;1059:4;1065:6;1047:11;:25::i;:::-;1022:50;;1094:4;1083:24;;;1100:6;1083:24;;;;;;:::i;:::-;;;;;;;;1120:14;1113:21;;;941:198;;;;:::o;177:129:3:-;228:7;243:14;260:11;;;;;;;;;;:20;;;:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;243:39;;295:6;288:13;;;177:129;:::o;1471:92:2:-;1513:23;;:::i;:::-;1551:7;1544:14;;;;;;;;;;;;;;;;;;;1471:92;:::o;1143:99::-;1197:11;;:::i;:::-;1223:6;:14;1230:6;1223:14;;;;;;;;;;;1216:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;1143:99;;;:::o;359:578::-;578:7;593:17;613:154;630:4;642:10;660:16;684:13;705:7;720:15;743:18;613:9;:154::i;:::-;593:174;;794:4;778:132;;;806:10;824:16;848:7;863:15;886:18;778:132;;;;;;;;;;:::i;:::-;;;;;;;;923:9;916:16;;;359:578;;;;;;;;;:::o;1246:107::-;1301:12;;:::i;:::-;1328:6;:14;1335:6;1328:14;;;;;;;;;;;:20;;1321:27;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1246:107;;;:::o;310:217:3:-;374:4;425:3;394:35;;:19;:35;;;386:63;;;;;;;;;;;;:::i;:::-;;;;;;;;;485:19;455:11;;:50;;;;;;;;;;;;;;;;;;518:4;511:11;;310:217;;;:::o;1357:110:2:-;1413:13;;:::i;:::-;1441:6;:14;1448:6;1441:14;;;;;;;;;;;:21;;1434:28;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1357:110;;;:::o;1568:595:5:-;1655:7;1672:18;1693:6;:23;1700:15;1693:23;;;;;;;;;;;1672:44;;1743:5;1723;:12;;:17;;;:25;;;;;;;;;;;;;;;;;;1810:4;1783:5;:12;;:24;;;:31;;;;;;;;;;;;;;;;;;1849:20;1872:29;:5;:13;;;:27;:29::i;:::-;1849:52;;1929:12;1907:5;:11;;:19;;:34;;;;2008:15;1982:5;:11;;:23;;:41;;;;2073:5;:21;;;2055:15;:39;;;;:::i;:::-;2029:5;:11;;:23;;:65;;;;2116:13;2101:5;:12;;;:28;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;2143:15;2136:22;;;;1568:595;;;;:::o;882:682::-;1111:7;1126:19;:7;:17;:19::i;:::-;1151:17;1171;:7;:15;:17::i;:::-;1151:37;;1194:20;1217:6;:17;1224:9;1217:17;;;;;;;;;;;1194:40;;1262:5;1241:7;:13;;:18;;;:26;;;;;;;;;;;;;;;;;;1295:11;1274:7;:18;;:32;;;;1339:17;1312:7;:24;;:44;;;;1380:8;1362:7;:15;;:26;;;;1420:16;1394:7;:23;;:42;;;;1471:19;1442:7;:26;;:48;;;;1522:14;1497:7;:14;;:22;;:39;;;;1550:9;1543:16;;;;882:682;;;;;;;;;:::o;1150:117:6:-;1214:7;1236:26;309:1;1236:8;:12;;:26;;;;:::i;:::-;1229:33;;1150:117;;;:::o;945:123:0:-;1050:1;1032:7;:14;;;:19;;;;;;;;;;;945:123;:::o;827:112::-;892:7;918;:14;;;911:21;;827:112;;;:::o;3465:96:1:-;3523:7;3553:1;3549;:5;;;;:::i;:::-;3542:12;;3465:96;;;;:::o;-1:-1:-1:-;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;88:117:7:-;197:1;194;187:12;334:126;371:7;411:42;404:5;400:54;389:65;;334:126;;;:::o;466:96::-;503:7;532:24;550:5;532:24;:::i;:::-;521:35;;466:96;;;:::o;568:122::-;641:24;659:5;641:24;:::i;:::-;634:5;631:35;621:63;;680:1;677;670:12;621:63;568:122;:::o;696:139::-;742:5;780:6;767:20;758:29;;796:33;823:5;796:33;:::i;:::-;696:139;;;;:::o;841:77::-;878:7;907:5;896:16;;841:77;;;:::o;924:122::-;997:24;1015:5;997:24;:::i;:::-;990:5;987:35;977:63;;1036:1;1033;1026:12;977:63;924:122;:::o;1052:139::-;1098:5;1136:6;1123:20;1114:29;;1152:33;1179:5;1152:33;:::i;:::-;1052:139;;;;:::o;1197:474::-;1265:6;1273;1322:2;1310:9;1301:7;1297:23;1293:32;1290:119;;;1328:79;;:::i;:::-;1290:119;1448:1;1473:53;1518:7;1509:6;1498:9;1494:22;1473:53;:::i;:::-;1463:63;;1419:117;1575:2;1601:53;1646:7;1637:6;1626:9;1622:22;1601:53;:::i;:::-;1591:63;;1546:118;1197:474;;;;;:::o;1677:118::-;1764:24;1782:5;1764:24;:::i;:::-;1759:3;1752:37;1677:118;;:::o;1801:222::-;1894:4;1932:2;1921:9;1917:18;1909:26;;1945:71;2013:1;2002:9;1998:17;1989:6;1945:71;:::i;:::-;1801:222;;;;:::o;2029:108::-;2106:24;2124:5;2106:24;:::i;:::-;2101:3;2094:37;2029:108;;:::o;2201:329::-;2342:4;2337:3;2333:14;2431:4;2424:5;2420:16;2414:23;2450:63;2507:4;2502:3;2498:14;2484:12;2450:63;:::i;:::-;2357:166;2311:219;2201:329;;:::o;2536:310::-;2673:4;2711:2;2700:9;2696:18;2688:26;;2724:115;2836:1;2825:9;2821:17;2812:6;2724:115;:::i;:::-;2536:310;;;;:::o;2852:329::-;2911:6;2960:2;2948:9;2939:7;2935:23;2931:32;2928:119;;;2966:79;;:::i;:::-;2928:119;3086:1;3111:53;3156:7;3147:6;3136:9;3132:22;3111:53;:::i;:::-;3101:63;;3057:117;2852:329;;;;:::o;3187:108::-;3264:24;3282:5;3264:24;:::i;:::-;3259:3;3252:37;3187:108;;:::o;3349:856::-;3480:4;3475:3;3471:14;3567:4;3560:5;3556:16;3550:23;3586:63;3643:4;3638:3;3634:14;3620:12;3586:63;:::i;:::-;3495:164;3744:4;3737:5;3733:16;3727:23;3763:63;3820:4;3815:3;3811:14;3797:12;3763:63;:::i;:::-;3669:167;3925:4;3918:5;3914:16;3908:23;3944:63;4001:4;3996:3;3992:14;3978:12;3944:63;:::i;:::-;3846:171;4106:4;4099:5;4095:16;4089:23;4125:63;4182:4;4177:3;4173:14;4159:12;4125:63;:::i;:::-;4027:171;3449:756;3349:856;;:::o;4211:90::-;4245:7;4288:5;4281:13;4274:21;4263:32;;4211:90;;;:::o;4307:99::-;4378:21;4393:5;4378:21;:::i;:::-;4373:3;4366:34;4307:99;;:::o;4462:671::-;4595:4;4590:3;4586:14;4682:4;4675:5;4671:16;4665:23;4701:63;4758:4;4753:3;4749:14;4735:12;4701:63;:::i;:::-;4610:164;4859:4;4852:5;4848:16;4842:23;4878:63;4935:4;4930:3;4926:14;4912:12;4878:63;:::i;:::-;4784:167;5040:4;5033:5;5029:16;5023:23;5059:57;5110:4;5105:3;5101:14;5087:12;5059:57;:::i;:::-;4961:165;4564:569;4462:671;;:::o;5139:180::-;5187:77;5184:1;5177:88;5284:4;5281:1;5274:15;5308:4;5305:1;5298:15;5325:115;5408:1;5401:5;5398:12;5388:46;;5414:18;;:::i;:::-;5388:46;5325:115;:::o;5446:131::-;5493:7;5522:5;5511:16;;5528:43;5565:5;5528:43;:::i;:::-;5446:131;;;:::o;5583:::-;5641:9;5674:34;5702:5;5674:34;:::i;:::-;5661:47;;5583:131;;;:::o;5720:137::-;5805:45;5844:5;5805:45;:::i;:::-;5800:3;5793:58;5720:137;;:::o;5909:1704::-;6048:6;6043:3;6039:16;6138:4;6131:5;6127:16;6121:23;6157:107;6258:4;6253:3;6249:14;6235:12;6157:107;:::i;:::-;6065:209;6358:4;6351:5;6347:16;6341:23;6377:109;6480:4;6475:3;6471:14;6457:12;6377:109;:::i;:::-;6284:212;6584:4;6577:5;6573:16;6567:23;6603:63;6660:4;6655:3;6651:14;6637:12;6603:63;:::i;:::-;6506:170;6770:4;6763:5;6759:16;6753:23;6789:65;6846:6;6841:3;6837:16;6823:12;6789:65;:::i;:::-;6686:178;6949:4;6942:5;6938:16;6932:23;6968:65;7025:6;7020:3;7016:16;7002:12;6968:65;:::i;:::-;6874:169;7136:4;7129:5;7125:16;7119:23;7155:65;7212:6;7207:3;7203:16;7189:12;7155:65;:::i;:::-;7053:177;7326:4;7319:5;7315:16;7309:23;7345:65;7402:6;7397:3;7393:16;7379:12;7345:65;:::i;:::-;7240:180;7504:4;7497:5;7493:16;7487:23;7523:73;7588:6;7583:3;7579:16;7565:12;7523:73;:::i;:::-;7430:176;6017:1596;5909:1704;;:::o;7619:307::-;7754:4;7792:3;7781:9;7777:19;7769:27;;7806:113;7916:1;7905:9;7901:17;7892:6;7806:113;:::i;:::-;7619:307;;;;:::o;7932:1203::-;8045:6;8053;8061;8069;8077;8085;8093;8142:3;8130:9;8121:7;8117:23;8113:33;8110:120;;;8149:79;;:::i;:::-;8110:120;8269:1;8294:53;8339:7;8330:6;8319:9;8315:22;8294:53;:::i;:::-;8284:63;;8240:117;8396:2;8422:53;8467:7;8458:6;8447:9;8443:22;8422:53;:::i;:::-;8412:63;;8367:118;8524:2;8550:53;8595:7;8586:6;8575:9;8571:22;8550:53;:::i;:::-;8540:63;;8495:118;8652:2;8678:53;8723:7;8714:6;8703:9;8699:22;8678:53;:::i;:::-;8668:63;;8623:118;8780:3;8807:53;8852:7;8843:6;8832:9;8828:22;8807:53;:::i;:::-;8797:63;;8751:119;8909:3;8936:53;8981:7;8972:6;8961:9;8957:22;8936:53;:::i;:::-;8926:63;;8880:119;9038:3;9065:53;9110:7;9101:6;9090:9;9086:22;9065:53;:::i;:::-;9055:63;;9009:119;7932:1203;;;;;;;;;;:::o;9189:866::-;9330:4;9325:3;9321:14;9417:4;9410:5;9406:16;9400:23;9436:63;9493:4;9488:3;9484:14;9470:12;9436:63;:::i;:::-;9345:164;9594:4;9587:5;9583:16;9577:23;9613:63;9670:4;9665:3;9661:14;9647:12;9613:63;:::i;:::-;9519:167;9775:4;9768:5;9764:16;9758:23;9794:63;9851:4;9846:3;9842:14;9828:12;9794:63;:::i;:::-;9696:171;9956:4;9949:5;9945:16;9939:23;9975:63;10032:4;10027:3;10023:14;10009:12;9975:63;:::i;:::-;9877:171;9299:756;9189:866;;:::o;10061:311::-;10198:4;10236:3;10225:9;10221:19;10213:27;;10250:115;10362:1;10351:9;10347:17;10338:6;10250:115;:::i;:::-;10061:311;;;;:::o;10378:329::-;10437:6;10486:2;10474:9;10465:7;10461:23;10457:32;10454:119;;;10492:79;;:::i;:::-;10454:119;10612:1;10637:53;10682:7;10673:6;10662:9;10658:22;10637:53;:::i;:::-;10627:63;;10583:117;10378:329;;;;:::o;10713:109::-;10794:21;10809:5;10794:21;:::i;:::-;10789:3;10782:34;10713:109;;:::o;10828:210::-;10915:4;10953:2;10942:9;10938:18;10930:26;;10966:65;11028:1;11017:9;11013:17;11004:6;10966:65;:::i;:::-;10828:210;;;;:::o;11094:681::-;11237:4;11232:3;11228:14;11324:4;11317:5;11313:16;11307:23;11343:63;11400:4;11395:3;11391:14;11377:12;11343:63;:::i;:::-;11252:164;11501:4;11494:5;11490:16;11484:23;11520:63;11577:4;11572:3;11568:14;11554:12;11520:63;:::i;:::-;11426:167;11682:4;11675:5;11671:16;11665:23;11701:57;11752:4;11747:3;11743:14;11729:12;11701:57;:::i;:::-;11603:165;11206:569;11094:681;;:::o;11781:314::-;11920:4;11958:2;11947:9;11943:18;11935:26;;11971:117;12085:1;12074:9;12070:17;12061:6;11971:117;:::i;:::-;11781:314;;;;:::o;12101:143::-;12158:5;12189:6;12183:13;12174:22;;12205:33;12232:5;12205:33;:::i;:::-;12101:143;;;;:::o;12250:351::-;12320:6;12369:2;12357:9;12348:7;12344:23;12340:32;12337:119;;;12375:79;;:::i;:::-;12337:119;12495:1;12520:64;12576:7;12567:6;12556:9;12552:22;12520:64;:::i;:::-;12510:74;;12466:128;12250:351;;;;:::o;12607:664::-;12812:4;12850:3;12839:9;12835:19;12827:27;;12864:71;12932:1;12921:9;12917:17;12908:6;12864:71;:::i;:::-;12945:72;13013:2;13002:9;12998:18;12989:6;12945:72;:::i;:::-;13027;13095:2;13084:9;13080:18;13071:6;13027:72;:::i;:::-;13109;13177:2;13166:9;13162:18;13153:6;13109:72;:::i;:::-;13191:73;13259:3;13248:9;13244:19;13235:6;13191:73;:::i;:::-;12607:664;;;;;;;;:::o;13277:169::-;13361:11;13395:6;13390:3;13383:19;13435:4;13430:3;13426:14;13411:29;;13277:169;;;;:::o;13452:165::-;13592:17;13588:1;13580:6;13576:14;13569:41;13452:165;:::o;13623:366::-;13765:3;13786:67;13850:2;13845:3;13786:67;:::i;:::-;13779:74;;13862:93;13951:3;13862:93;:::i;:::-;13980:2;13975:3;13971:12;13964:19;;13623:366;;;:::o;13995:419::-;14161:4;14199:2;14188:9;14184:18;14176:26;;14248:9;14242:4;14238:20;14234:1;14223:9;14219:17;14212:47;14276:131;14402:4;14276:131;:::i;:::-;14268:139;;13995:419;;;:::o;14420:180::-;14468:77;14465:1;14458:88;14565:4;14562:1;14555:15;14589:4;14586:1;14579:15;14606:191;14646:3;14665:20;14683:1;14665:20;:::i;:::-;14660:25;;14699:20;14717:1;14699:20;:::i;:::-;14694:25;;14742:1;14739;14735:9;14728:16;;14763:3;14760:1;14757:10;14754:36;;;14770:18;;:::i;:::-;14754:36;14606:191;;;;:::o;14803:348::-;14843:7;14866:20;14884:1;14866:20;:::i;:::-;14861:25;;14900:20;14918:1;14900:20;:::i;:::-;14895:25;;15088:1;15020:66;15016:74;15013:1;15010:81;15005:1;14998:9;14991:17;14987:105;14984:131;;;15095:18;;:::i;:::-;14984:131;15143:1;15140;15136:9;15125:20;;14803:348;;;;:::o',
  source:
    "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.7;\n\nimport './Swaps/Swaps.sol';\n\ncontract CDS is Swaps {\n  event MakeSwap(\n    address indexed buyer,\n    uint256 claimPrice,\n    uint256 liquidationPrice,\n    uint256 _premium,\n    uint256 premiumInterval,\n    uint256 totalPremiumRounds\n  );\n  event AcceptSwap(address indexed seller, uint256 swapId);\n\n  function makeSwap(\n    address addr,\n    uint256 claimPrice,\n    uint256 liquidationPrice,\n    uint256 sellerDeposit,\n    uint256 premium,\n    uint256 premiumInterval,\n    uint256 totalPremiumRounds\n  ) public returns (uint256) {\n    uint256 newSwapId = _makeSwap(\n      addr,\n      claimPrice,\n      liquidationPrice,\n      sellerDeposit,\n      premium,\n      premiumInterval,\n      totalPremiumRounds\n    );\n    emit MakeSwap(\n      addr,\n      claimPrice,\n      liquidationPrice,\n      premium,\n      premiumInterval,\n      totalPremiumRounds\n    );\n    return newSwapId;\n  }\n\n  function acceptSwap(address addr, uint256 swapId) public returns (uint256) {\n    uint256 acceptedSwapId = _acceptSwap(addr, swapId);\n    emit AcceptSwap(addr, swapId);\n    return acceptedSwapId;\n  }\n\n  function getSwap(uint256 swapId) public view returns (Swap memory) {\n    return _swaps[swapId];\n  }\n\n  function getBuyer(uint256 swapId) public view returns (Buyer memory) {\n    return _swaps[swapId].buyer;\n  }\n\n  function getSeller(uint256 swapId) public view returns (Seller memory) {\n    return _swaps[swapId].seller;\n  }\n\n  function getSwapId() public view returns (Counters.Counter memory) {\n    return _swapId;\n  }\n}\n",
  sourcePath: '/Users/sdh/Study/BEB_07/projects/CDS/contract/contracts/CDS.sol',
  ast: {
    absolutePath: 'project:/contracts/CDS.sol',
    exportedSymbols: {
      CDS: [528],
      Counters: [73],
      LibSwapCalc: [939],
      PriceConsumer: [579],
      PriceOracleMock: [616],
      SafeMath: [385],
      Swaps: [846],
    },
    id: 529,
    license: 'MIT',
    nodeType: 'SourceUnit',
    nodes: [
      {
        id: 387,
        literals: ['solidity', '^', '0.8', '.7'],
        nodeType: 'PragmaDirective',
        src: '32:23:2',
      },
      {
        absolutePath: 'project:/contracts/Swaps/Swaps.sol',
        file: './Swaps/Swaps.sol',
        id: 388,
        nameLocation: '-1:-1:-1',
        nodeType: 'ImportDirective',
        scope: 529,
        sourceUnit: 847,
        src: '57:27:2',
        symbolAliases: [],
        unitAlias: '',
      },
      {
        abstract: false,
        baseContracts: [
          {
            baseName: {
              id: 389,
              name: 'Swaps',
              nameLocations: ['102:5:2'],
              nodeType: 'IdentifierPath',
              referencedDeclaration: 846,
              src: '102:5:2',
            },
            id: 390,
            nodeType: 'InheritanceSpecifier',
            src: '102:5:2',
          },
        ],
        canonicalName: 'CDS',
        contractDependencies: [],
        contractKind: 'contract',
        fullyImplemented: true,
        id: 528,
        linearizedBaseContracts: [528, 846, 579],
        name: 'CDS',
        nameLocation: '95:3:2',
        nodeType: 'ContractDefinition',
        nodes: [
          {
            anonymous: false,
            eventSelector:
              'b685fc177a65d56e75964fcfa7a66e03deee8c4eb23b284a70448a3fb2848aa9',
            id: 404,
            name: 'MakeSwap',
            nameLocation: '118:8:2',
            nodeType: 'EventDefinition',
            parameters: {
              id: 403,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 392,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'buyer',
                  nameLocation: '148:5:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '132:21:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 391,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '132:7:2',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 394,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'claimPrice',
                  nameLocation: '167:10:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '159:18:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 393,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '159:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 396,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'liquidationPrice',
                  nameLocation: '191:16:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '183:24:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 395,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '183:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 398,
                  indexed: false,
                  mutability: 'mutable',
                  name: '_premium',
                  nameLocation: '221:8:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '213:16:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 397,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '213:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 400,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'premiumInterval',
                  nameLocation: '243:15:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '235:23:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 399,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '235:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 402,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'totalPremiumRounds',
                  nameLocation: '272:18:2',
                  nodeType: 'VariableDeclaration',
                  scope: 404,
                  src: '264:26:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 401,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '264:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '126:168:2',
            },
            src: '112:183:2',
          },
          {
            anonymous: false,
            eventSelector:
              '96a33d274168dd9f48db62d10e3a70d2a3d6b885f26deb52297a7db0d779aecd',
            id: 410,
            name: 'AcceptSwap',
            nameLocation: '304:10:2',
            nodeType: 'EventDefinition',
            parameters: {
              id: 409,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 406,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'seller',
                  nameLocation: '331:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 410,
                  src: '315:22:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 405,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '315:7:2',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 408,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'swapId',
                  nameLocation: '347:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 410,
                  src: '339:14:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 407,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '339:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '314:40:2',
            },
            src: '298:57:2',
          },
          {
            body: {
              id: 452,
              nodeType: 'Block',
              src: '587:350:2',
              statements: [
                {
                  assignments: [430],
                  declarations: [
                    {
                      constant: false,
                      id: 430,
                      mutability: 'mutable',
                      name: 'newSwapId',
                      nameLocation: '601:9:2',
                      nodeType: 'VariableDeclaration',
                      scope: 452,
                      src: '593:17:2',
                      stateVariable: false,
                      storageLocation: 'default',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                      typeName: {
                        id: 429,
                        name: 'uint256',
                        nodeType: 'ElementaryTypeName',
                        src: '593:7:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      visibility: 'internal',
                    },
                  ],
                  id: 440,
                  initialValue: {
                    arguments: [
                      {
                        id: 432,
                        name: 'addr',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 412,
                        src: '630:4:2',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 433,
                        name: 'claimPrice',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 414,
                        src: '642:10:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 434,
                        name: 'liquidationPrice',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 416,
                        src: '660:16:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 435,
                        name: 'sellerDeposit',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 418,
                        src: '684:13:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 436,
                        name: 'premium',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 420,
                        src: '705:7:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 437,
                        name: 'premiumInterval',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 422,
                        src: '720:15:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 438,
                        name: 'totalPremiumRounds',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 424,
                        src: '743:18:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 431,
                      name: '_makeSwap',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 767,
                      src: '613:9:2',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$',
                        typeString:
                          'function (address,uint256,uint256,uint256,uint256,uint256,uint256) returns (uint256)',
                      },
                    },
                    id: 439,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    nameLocations: [],
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '613:154:2',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  nodeType: 'VariableDeclarationStatement',
                  src: '593:174:2',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        id: 442,
                        name: 'addr',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 412,
                        src: '794:4:2',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 443,
                        name: 'claimPrice',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 414,
                        src: '806:10:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 444,
                        name: 'liquidationPrice',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 416,
                        src: '824:16:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 445,
                        name: 'premium',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 420,
                        src: '848:7:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 446,
                        name: 'premiumInterval',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 422,
                        src: '863:15:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      {
                        id: 447,
                        name: 'totalPremiumRounds',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 424,
                        src: '886:18:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 441,
                      name: 'MakeSwap',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 404,
                      src: '778:8:2',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$',
                        typeString:
                          'function (address,uint256,uint256,uint256,uint256,uint256)',
                      },
                    },
                    id: 448,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    nameLocations: [],
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '778:132:2',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 449,
                  nodeType: 'EmitStatement',
                  src: '773:137:2',
                },
                {
                  expression: {
                    id: 450,
                    name: 'newSwapId',
                    nodeType: 'Identifier',
                    overloadedDeclarations: [],
                    referencedDeclaration: 430,
                    src: '923:9:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  functionReturnParameters: 428,
                  id: 451,
                  nodeType: 'Return',
                  src: '916:16:2',
                },
              ],
            },
            functionSelector: '5953cd05',
            id: 453,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'makeSwap',
            nameLocation: '368:8:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 425,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 412,
                  mutability: 'mutable',
                  name: 'addr',
                  nameLocation: '390:4:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '382:12:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 411,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '382:7:2',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 414,
                  mutability: 'mutable',
                  name: 'claimPrice',
                  nameLocation: '408:10:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '400:18:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 413,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '400:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 416,
                  mutability: 'mutable',
                  name: 'liquidationPrice',
                  nameLocation: '432:16:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '424:24:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 415,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '424:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 418,
                  mutability: 'mutable',
                  name: 'sellerDeposit',
                  nameLocation: '462:13:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '454:21:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 417,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '454:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 420,
                  mutability: 'mutable',
                  name: 'premium',
                  nameLocation: '489:7:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '481:15:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 419,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '481:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 422,
                  mutability: 'mutable',
                  name: 'premiumInterval',
                  nameLocation: '510:15:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '502:23:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 421,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '502:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 424,
                  mutability: 'mutable',
                  name: 'totalPremiumRounds',
                  nameLocation: '539:18:2',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '531:26:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 423,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '531:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '376:185:2',
            },
            returnParameters: {
              id: 428,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 427,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 453,
                  src: '578:7:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 426,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '578:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '577:9:2',
            },
            scope: 528,
            src: '359:578:2',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 476,
              nodeType: 'Block',
              src: '1016:123:2',
              statements: [
                {
                  assignments: [463],
                  declarations: [
                    {
                      constant: false,
                      id: 463,
                      mutability: 'mutable',
                      name: 'acceptedSwapId',
                      nameLocation: '1030:14:2',
                      nodeType: 'VariableDeclaration',
                      scope: 476,
                      src: '1022:22:2',
                      stateVariable: false,
                      storageLocation: 'default',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                      typeName: {
                        id: 462,
                        name: 'uint256',
                        nodeType: 'ElementaryTypeName',
                        src: '1022:7:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      visibility: 'internal',
                    },
                  ],
                  id: 468,
                  initialValue: {
                    arguments: [
                      {
                        id: 465,
                        name: 'addr',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 455,
                        src: '1059:4:2',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 466,
                        name: 'swapId',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 457,
                        src: '1065:6:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 464,
                      name: '_acceptSwap',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 845,
                      src: '1047:11:2',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_uint256_$',
                        typeString:
                          'function (address,uint256) returns (uint256)',
                      },
                    },
                    id: 467,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    nameLocations: [],
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1047:25:2',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  nodeType: 'VariableDeclarationStatement',
                  src: '1022:50:2',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        id: 470,
                        name: 'addr',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 455,
                        src: '1094:4:2',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 471,
                        name: 'swapId',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 457,
                        src: '1100:6:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 469,
                      name: 'AcceptSwap',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 410,
                      src: '1083:10:2',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,uint256)',
                      },
                    },
                    id: 472,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    nameLocations: [],
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1083:24:2',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 473,
                  nodeType: 'EmitStatement',
                  src: '1078:29:2',
                },
                {
                  expression: {
                    id: 474,
                    name: 'acceptedSwapId',
                    nodeType: 'Identifier',
                    overloadedDeclarations: [],
                    referencedDeclaration: 463,
                    src: '1120:14:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  functionReturnParameters: 461,
                  id: 475,
                  nodeType: 'Return',
                  src: '1113:21:2',
                },
              ],
            },
            functionSelector: '021c0fd1',
            id: 477,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'acceptSwap',
            nameLocation: '950:10:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 458,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 455,
                  mutability: 'mutable',
                  name: 'addr',
                  nameLocation: '969:4:2',
                  nodeType: 'VariableDeclaration',
                  scope: 477,
                  src: '961:12:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 454,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '961:7:2',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 457,
                  mutability: 'mutable',
                  name: 'swapId',
                  nameLocation: '983:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 477,
                  src: '975:14:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 456,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '975:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '960:30:2',
            },
            returnParameters: {
              id: 461,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 460,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 477,
                  src: '1007:7:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 459,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1007:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1006:9:2',
            },
            scope: 528,
            src: '941:198:2',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 489,
              nodeType: 'Block',
              src: '1210:32:2',
              statements: [
                {
                  expression: {
                    baseExpression: {
                      id: 485,
                      name: '_swaps',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 645,
                      src: '1223:6:2',
                      typeDescriptions: {
                        typeIdentifier:
                          't_mapping$_t_uint256_$_t_struct$_Swap_$681_storage_$',
                        typeString:
                          'mapping(uint256 => struct Swaps.Swap storage ref)',
                      },
                    },
                    id: 487,
                    indexExpression: {
                      id: 486,
                      name: 'swapId',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 479,
                      src: '1230:6:2',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    isConstant: false,
                    isLValue: true,
                    isPure: false,
                    lValueRequested: false,
                    nodeType: 'IndexAccess',
                    src: '1223:14:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Swap_$681_storage',
                      typeString: 'struct Swaps.Swap storage ref',
                    },
                  },
                  functionReturnParameters: 484,
                  id: 488,
                  nodeType: 'Return',
                  src: '1216:21:2',
                },
              ],
            },
            functionSelector: '4a0d89ba',
            id: 490,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'getSwap',
            nameLocation: '1152:7:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 480,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 479,
                  mutability: 'mutable',
                  name: 'swapId',
                  nameLocation: '1168:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 490,
                  src: '1160:14:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 478,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1160:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1159:16:2',
            },
            returnParameters: {
              id: 484,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 483,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 490,
                  src: '1197:11:2',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_struct$_Swap_$681_memory_ptr',
                    typeString: 'struct Swaps.Swap',
                  },
                  typeName: {
                    id: 482,
                    nodeType: 'UserDefinedTypeName',
                    pathNode: {
                      id: 481,
                      name: 'Swap',
                      nameLocations: ['1197:4:2'],
                      nodeType: 'IdentifierPath',
                      referencedDeclaration: 681,
                      src: '1197:4:2',
                    },
                    referencedDeclaration: 681,
                    src: '1197:4:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Swap_$681_storage_ptr',
                      typeString: 'struct Swaps.Swap',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1196:13:2',
            },
            scope: 528,
            src: '1143:99:2',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 503,
              nodeType: 'Block',
              src: '1315:38:2',
              statements: [
                {
                  expression: {
                    expression: {
                      baseExpression: {
                        id: 498,
                        name: '_swaps',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 645,
                        src: '1328:6:2',
                        typeDescriptions: {
                          typeIdentifier:
                            't_mapping$_t_uint256_$_t_struct$_Swap_$681_storage_$',
                          typeString:
                            'mapping(uint256 => struct Swaps.Swap storage ref)',
                        },
                      },
                      id: 500,
                      indexExpression: {
                        id: 499,
                        name: 'swapId',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 492,
                        src: '1335:6:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: false,
                      nodeType: 'IndexAccess',
                      src: '1328:14:2',
                      typeDescriptions: {
                        typeIdentifier: 't_struct$_Swap_$681_storage',
                        typeString: 'struct Swaps.Swap storage ref',
                      },
                    },
                    id: 501,
                    isConstant: false,
                    isLValue: true,
                    isPure: false,
                    lValueRequested: false,
                    memberLocation: '1343:5:2',
                    memberName: 'buyer',
                    nodeType: 'MemberAccess',
                    referencedDeclaration: 664,
                    src: '1328:20:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Buyer_$654_storage',
                      typeString: 'struct Swaps.Buyer storage ref',
                    },
                  },
                  functionReturnParameters: 497,
                  id: 502,
                  nodeType: 'Return',
                  src: '1321:27:2',
                },
              ],
            },
            functionSelector: '5bf608b8',
            id: 504,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'getBuyer',
            nameLocation: '1255:8:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 493,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 492,
                  mutability: 'mutable',
                  name: 'swapId',
                  nameLocation: '1272:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 504,
                  src: '1264:14:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 491,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1264:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1263:16:2',
            },
            returnParameters: {
              id: 497,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 496,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 504,
                  src: '1301:12:2',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_struct$_Buyer_$654_memory_ptr',
                    typeString: 'struct Swaps.Buyer',
                  },
                  typeName: {
                    id: 495,
                    nodeType: 'UserDefinedTypeName',
                    pathNode: {
                      id: 494,
                      name: 'Buyer',
                      nameLocations: ['1301:5:2'],
                      nodeType: 'IdentifierPath',
                      referencedDeclaration: 654,
                      src: '1301:5:2',
                    },
                    referencedDeclaration: 654,
                    src: '1301:5:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Buyer_$654_storage_ptr',
                      typeString: 'struct Swaps.Buyer',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1300:14:2',
            },
            scope: 528,
            src: '1246:107:2',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 517,
              nodeType: 'Block',
              src: '1428:39:2',
              statements: [
                {
                  expression: {
                    expression: {
                      baseExpression: {
                        id: 512,
                        name: '_swaps',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 645,
                        src: '1441:6:2',
                        typeDescriptions: {
                          typeIdentifier:
                            't_mapping$_t_uint256_$_t_struct$_Swap_$681_storage_$',
                          typeString:
                            'mapping(uint256 => struct Swaps.Swap storage ref)',
                        },
                      },
                      id: 514,
                      indexExpression: {
                        id: 513,
                        name: 'swapId',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 506,
                        src: '1448:6:2',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: false,
                      nodeType: 'IndexAccess',
                      src: '1441:14:2',
                      typeDescriptions: {
                        typeIdentifier: 't_struct$_Swap_$681_storage',
                        typeString: 'struct Swaps.Swap storage ref',
                      },
                    },
                    id: 515,
                    isConstant: false,
                    isLValue: true,
                    isPure: false,
                    lValueRequested: false,
                    memberLocation: '1456:6:2',
                    memberName: 'seller',
                    nodeType: 'MemberAccess',
                    referencedDeclaration: 667,
                    src: '1441:21:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Seller_$661_storage',
                      typeString: 'struct Swaps.Seller storage ref',
                    },
                  },
                  functionReturnParameters: 511,
                  id: 516,
                  nodeType: 'Return',
                  src: '1434:28:2',
                },
              ],
            },
            functionSelector: 'd6a9de51',
            id: 518,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'getSeller',
            nameLocation: '1366:9:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 507,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 506,
                  mutability: 'mutable',
                  name: 'swapId',
                  nameLocation: '1384:6:2',
                  nodeType: 'VariableDeclaration',
                  scope: 518,
                  src: '1376:14:2',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 505,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1376:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1375:16:2',
            },
            returnParameters: {
              id: 511,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 510,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 518,
                  src: '1413:13:2',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_struct$_Seller_$661_memory_ptr',
                    typeString: 'struct Swaps.Seller',
                  },
                  typeName: {
                    id: 509,
                    nodeType: 'UserDefinedTypeName',
                    pathNode: {
                      id: 508,
                      name: 'Seller',
                      nameLocations: ['1413:6:2'],
                      nodeType: 'IdentifierPath',
                      referencedDeclaration: 661,
                      src: '1413:6:2',
                    },
                    referencedDeclaration: 661,
                    src: '1413:6:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Seller_$661_storage_ptr',
                      typeString: 'struct Swaps.Seller',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1412:15:2',
            },
            scope: 528,
            src: '1357:110:2',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 526,
              nodeType: 'Block',
              src: '1538:25:2',
              statements: [
                {
                  expression: {
                    id: 524,
                    name: '_swapId',
                    nodeType: 'Identifier',
                    overloadedDeclarations: [],
                    referencedDeclaration: 633,
                    src: '1551:7:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Counter_$5_storage',
                      typeString: 'struct Counters.Counter storage ref',
                    },
                  },
                  functionReturnParameters: 523,
                  id: 525,
                  nodeType: 'Return',
                  src: '1544:14:2',
                },
              ],
            },
            functionSelector: '496ab39a',
            id: 527,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'getSwapId',
            nameLocation: '1480:9:2',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 519,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1489:2:2',
            },
            returnParameters: {
              id: 523,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 522,
                  mutability: 'mutable',
                  name: '',
                  nameLocation: '-1:-1:-1',
                  nodeType: 'VariableDeclaration',
                  scope: 527,
                  src: '1513:23:2',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_struct$_Counter_$5_memory_ptr',
                    typeString: 'struct Counters.Counter',
                  },
                  typeName: {
                    id: 521,
                    nodeType: 'UserDefinedTypeName',
                    pathNode: {
                      id: 520,
                      name: 'Counters.Counter',
                      nameLocations: ['1513:8:2', '1522:7:2'],
                      nodeType: 'IdentifierPath',
                      referencedDeclaration: 5,
                      src: '1513:16:2',
                    },
                    referencedDeclaration: 5,
                    src: '1513:16:2',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Counter_$5_storage_ptr',
                      typeString: 'struct Counters.Counter',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1512:25:2',
            },
            scope: 528,
            src: '1471:92:2',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
        ],
        scope: 529,
        src: '86:1479:2',
        usedErrors: [],
      },
    ],
    src: '32:1534:2',
  },
  compiler: {
    name: 'solc',
    version: '0.8.16+commit.07a7930e.Emscripten.clang',
  },
  networks: {
    '5777': {
      events: {},
      links: {},
      address: '0x6082Ac385d4c63be87d5146b3c43E5E826A7341C',
      transactionHash:
        '0xbf55f7fcc2ddf62e0961c4f693127af0098a57dd9f87225818ff244d1a30f20d',
    },
    '1674132869145': {
      events: {
        '0x2ed1756a33efd26504de885e1c581d28d2d5509a7d9f293a624a948c8d5242b8': {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'numBlocks',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'claimPrice',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'liquidationPrice',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'expirationMonth',
              type: 'uint256',
            },
          ],
          name: 'MakeSwap',
          type: 'event',
        },
      },
      links: {},
      address: '0x0d22D4Db8083A3B72C763143217acf75975e50FD',
      transactionHash:
        '0x2121bbe406e0eb5f75f94b09bf5317bc692a5379de9be90448aab132e6d3d1a8',
    },
    '1674179657143': {
      events: {
        '0x96a33d274168dd9f48db62d10e3a70d2a3d6b885f26deb52297a7db0d779aecd': {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'seller',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'swapId',
              type: 'uint256',
            },
          ],
          name: 'AcceptSwap',
          type: 'event',
        },
        '0xb685fc177a65d56e75964fcfa7a66e03deee8c4eb23b284a70448a3fb2848aa9': {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'claimPrice',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'liquidationPrice',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_premium',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'premiumInterval',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'totalPremiumRounds',
              type: 'uint256',
            },
          ],
          name: 'MakeSwap',
          type: 'event',
        },
      },
      links: {},
      address: '0x669d17e5ce5B926e0Ec002D2DAb76ff34f364C4b',
      transactionHash:
        '0x61ea507f20831f1d3efa4185926bf96eb9c6e5eb12776e872b36a7671aaf8282',
    },
  },
  schemaVersion: '3.4.9',
  updatedAt: '2023-01-20T15:08:43.641Z',
  networkType: 'ethereum',
  devdoc: {
    kind: 'dev',
    methods: {},
    version: 1,
  },
  userdoc: {
    kind: 'user',
    methods: {},
    version: 1,
  },
};
