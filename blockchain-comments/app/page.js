"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import Link from "next/link";
import { ethers } from "ethers";

export default function Home() {
  const [acc, setAcc] = useState();
  const contractAddress = "0xfF34206c9fA6Da3fB093d35BDb84a12F9928C70e";
  const tokenAbi = process.env.NEXT_PUBLIC_ABI; // Assuming you have the ABI in your environment variables

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAcc(accounts[0]);
        console.log(accounts);

        // Create a new provider from MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer
        const signer = provider.getSigner();

        // Create a new instance of the contract with the signer
        const tokenContract = new ethers.Contract(
          contractAddress,
          tokenAbi,
          signer
        );

        console.log("Connected to MetaMask and contract:", tokenContract);
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      console.error("MetaMask is not installed!");
    }
  };

  useEffect(() => {
    connectToMetaMask();
  }, []);

  return (
    <Layout>
      <div>Hello Home Page</div>
      <p>Connected Account is : {acc}</p>
      <button>
        <Link href="/Projects">Next Page</Link>
      </button>
    </Layout>
  );
}
