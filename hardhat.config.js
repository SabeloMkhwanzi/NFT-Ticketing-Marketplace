require("@nomiclabs/hardhat-waffle");
const fs = require("fs")

const projectId = "e2a657a09d56489e8d5eb38815ec1b58"


//original address
//const projectId = "5a36b4b31ade480f9fa7535c6fa41500"
const privateKey =  "8e692ca583f10d11615afa0c9b53ad6c1ce08ba4186774d74734e2148025ba95"

// Rinkeby Network

// rinkeby
module.exports = {
  networks: {
    hardhat: {
      chainId:1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey]
        // Rinkeby TicketNFT2 = '0xDe51c3679D52b26d9d0EEF10FEdF19DCA31DdcDc' 
       // nftMarket deployed to: 0xB71fD4D9d4F16bfF86ecF3105b775E4b6Ebf4b08
      // nft deployed to: 0x9f1Dfb6F812A4821B5dB030aa4EA785a584E4234
    }
  },
  solidity: "0.8.4", 
  }



// Polygon 
module.exports = {
  networks: {
    hardhat: {
      chainId:1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
      // Polygon TicketNFT2 0xDe51c3679D52b26d9d0EEF10FEdF19DCA31DdcDc
     //nftMarket deployed to: 0xB71fD4D9d4F16bfF86ecF3105b775E4b6Ebf4b08
    //nft deployed to: 0x9f1Dfb6F812A4821B5dB030aa4EA785a584E4234
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4", 
  }














