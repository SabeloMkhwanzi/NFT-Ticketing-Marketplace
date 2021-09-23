require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync('.secret').toString()

const projectId = "5a36b4b31ade480f9fa7535c6fa41500"

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
      rinkeby: {
      url: "https://rinkeby.infura.io/v3/5a36b4b31ade480f9fa7535c6fa41500",
      accounts: [privateKey]
               //nftMarket deployed to: "0xa133A138d4A00F3571C9bEBAe20E8eC559BA9041"
              //nft deployed to: "0xCD8cc598Bc5B3A2B963541942135D211A9C0767a"
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/5a36b4b31ade480f9fa7535c6fa41500',
      accounts: [privateKey] 
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};

