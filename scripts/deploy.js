const hre = require("hardhat");
const { ethers } = require('ethers');
require('dotenv').config();


async function deploy() {
  const url = process.env.RINKEBY_URL;
  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.RINKEBY_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);

  let artifacts = await hre.artifacts.readArtifact("Greeter");
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let contract = await factory.deploy({_greeting: "Good morning!"});

  console.log("Contract address:", contract.address);
  await contract.deployed();
}

deploy()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
