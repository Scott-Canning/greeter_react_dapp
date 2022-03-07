require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:__dirname+'/.env'});

module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: "./app/artifacts",
  },
  defaultNetwork: "rinkeby", 
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.RINKEBY_KEY],
    },
  },
};
