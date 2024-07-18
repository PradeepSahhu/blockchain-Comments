"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import Link from "next/link";
import { ethers } from "ethers";

export default function Home() {
  const [acc, setAcc] = useState();
  // const contractAddress = "0xfF34206c9fA6Da3fB093d35BDb84a12F9928C70e";
  const contractAddress = "0xcdb63aEABb7bC725590f66941eA3CDbF942Db4C6";

  const [contractInstance, setContractInstance] = useState();
  const [number, setNumber] = useState();
  const tokenAbi = process.env.abi; // Assuming you have the ABI in your environment variables

  //------------------------------------

  const [ethWindow, setEthWindow] = useState(null);

  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      setAcc(accountsArray[0]);
      console.log(accountsArray[0]);
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAcc(accounts[0]);
    }

    // connectToMetaMask();
  };

  //--------------------------------------

  const disconnectWallet = () => {
    setAcc(undefined);
    setContractInstance(undefined);
    setNumber(undefined);
  };

  const increaseNumber = async () => {
    if (contractInstance) {
      const tx = await contractInstance.increase();
      tx.wait(2);

      setNumber(undefined);

      // window.location.reload();
    }
  };

  const connectToMetaMaskContract = async () => {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);

      // // Get the signer
      // const signer = await provider.getSigner();
      console.log(tokenAbi);

      const provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      const signer = await provider.getSigner();

      // Create a new instance of the contract with the signer
      const contract = new ethers.Contract(contractAddress, tokenAbi, signer);
      setContractInstance(contract);
      console.log(contract);
    } catch (error) {
      console.error("User rejected the request:", error);
    }
  };

  const getNum = async () => {
    try {
      if (contractInstance) {
        const num = await contractInstance.getNumber();
        setNumber(parseInt(num));
        console.log("Number  is : ", parseInt(num));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (number == undefined) {
    getNum();
  }

  useEffect(() => {
    initialize();
    getNum();
  }, [contractInstance, acc]);

  return (
    <Layout>
      <div>Hello Home Page</div>
      <p>Connected Account is : {acc}</p>
      <p>The Number is : {number}</p>

      <div>
        <button className="bg-blue-400" onClick={connectToMetaMaskContract}>
          Connect
        </button>

        <button className="bg-rose-400" onClick={disconnectWallet}>
          Disconnect
        </button>
      </div>

      <button className="bg-green-700" onClick={() => increaseNumber()}>
        Increase Number
      </button>

      <button>
        <Link href="/Projects">Next Page</Link>
      </button>
    </Layout>
  );
}
