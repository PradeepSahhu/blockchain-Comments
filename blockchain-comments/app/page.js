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

  const disconnectWallet = () => {
    setAcc(undefined);
    setContractInstance(undefined);
    setNumber(undefined);
  };

  const increaseNumber = async () => {
    if (contractInstance) {
      const tx = await contractInstance.increase();
      tx.wait();
      // window.location.reload();
    }
  };

  const connectToMetaMask = async () => {
    try {
      // Request account access if needed

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAcc(accounts[0]);

      console.log(accounts[0]);
      console.log(window.ethereum);

      // Create a new provider from MetaMask
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
      getNum();
    } catch (error) {
      console.log("okay not working");
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

  useEffect(() => {}, [contractInstance, number]);

  return (
    <Layout>
      <div>Hello Home Page</div>
      <p>Connected Account is : {acc}</p>
      <p>The Number is : {number}</p>

      <div>
        <button className="bg-blue-400" onClick={connectToMetaMask}>
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
