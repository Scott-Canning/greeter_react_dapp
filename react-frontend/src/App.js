import { ethers } from 'ethers';
import './App.css';
import React from 'react';
import greeterJSON from './utils/Greeter.json';


const greeterAddress = "0x4Eb31ed85AdeD65b65a47A9699dda7F722406210";

function App() {

  React.useEffect(() => {
    // this logic will run every time the page reloads
    getGreetingFromGreeter();
  })

  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [greeting, setGreeting] = React.useState("");
  const [greeterInput, setGreeterInput] = React.useState("");
  const { ethereum } = window;
  let provider;
  
  if(ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(ethereum);
    displayUserDetails();
  } else {
    console.log("Please install MetaMask!");
  }

  // new ethers.contract
  // 2. create a contract instance using Ethers.js

  async function getGreetingFromGreeter() {
    const signer = await provider.getSigner()
    const contractInstace = new ethers.Contract(greeterAddress, greeterJSON.abi, signer);
    const currentGreeting = await contractInstace.greet();
    setGreeting(currentGreeting);
  }

  async function setGreetingFromGreeter() {
    const signer = await provider.getSigner()
    const contractInstace = new ethers.Contract(greeterAddress, greeterJSON.abi, signer);
    const currentGreeting = await contractInstace.setGreeting(greeterInput);
    console.log(currentGreeting);
  }

  // hook to track address state
  async function displayUserDetails() {
    const signer = await provider.getSigner(); // gets account connected to 
    const userAddress = await signer.getAddress();
    const userBalance = await provider.getBalance(userAddress);
    setAddress(userAddress);
    setBalance(ethers.utils.formatEther(userBalance));
  }


  return (
    <div className="App">
      <div className="title">
        Greeter
      </div>
      <div className="user-info">
        <p>
          <b>Your address:</b> {address}
        </p>
        <p>
          <b>Your balance:</b> {balance}
        </p>
        <p>
          <b>Current Greeting:</b> {greeting}
        </p>
      </div>
      <p>
      <input className="greeter-input" value={greeterInput} onInput={e => setGreeterInput(e.target.value)}/>

      <button className="set-greeting" onClick={setGreetingFromGreeter}>
        Set Greeting
      </button>
      </p>
    </div>
  );
}

export default App;
