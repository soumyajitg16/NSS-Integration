// src/pages/NFTDetailsPage.jsx
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import NFTDetails from "../components/NFTDetails";
import { contractABI, contractAddress, nftAbi, tokenabi } from "../lib/data";
import { getOwner, vaults,makeOffer_ } from "../lib/functions";

const NFTDetailsPage = () => {
  const [nft, setNFT] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [tcontract, setTContract] = useState();
  const [tokenAddr, setTokenAddr] = useState("");
  const [nftAddr, setNftAddr] = useState([]);
  const [_NFTcontract, set_NFTcontract] = useState([]);
  const [nftArr, setNftArr] = useState([]);
  const [offerAmount, setOfferAmount] = useState();
  const [percentage, setpercentage] = useState();
  const [time, setTime] = useState();
  
  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(ethersProvider);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signers = ethersProvider.getSigner();
        setSigner(signers);

        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signers
        );
        setContract(_contract);

        const _Tcontract = new ethers.Contract(tokenAddr, tokenabi, signers);
        setTContract(_Tcontract);

        //fetch the total vaultcount for now we are hardcoding it to 1
        const vaultCount = 2;

        //from vault counter fetching all vaults
        let vaultsARR = [];
        let NftAddrs = [];
        for (let i = 1; i <= vaultCount; i++) {
          const vaultTX = await vaults(contract, i);
          vaultsARR.push(vaultTX);
          let tempAADrs = {
            addr: vaultsARR[i - 1][2],
            tokenId: vaultsARR[i - 1][3].toNumber(),
          };
          NftAddrs.push(tempAADrs);
        }

        console.log(NftAddrs);

        const _NFTcontract = [];
        const tokenURIS = [];
        const NFTS = [];

        for (let i = 0; i < NftAddrs.length; i++) {
          let tempContract = new ethers.Contract(
            NftAddrs[i].addr,
            nftAbi,
            signers
          );
          _NFTcontract.push(tempContract);
          let tempURI = await _NFTcontract[i].tokenURI(NftAddrs[i].tokenId);
          tokenURIS.push(tempURI);
          const res = await fetch(tokenURIS[i]);
          const tempNFT = await res.json();
          NFTS.push(tempNFT);
        }
        console.log(tokenURIS);
        setNftArr(NFTS);
        // console.log(nftArr);
      } else {
        alert("MetaMask is not installed. Please install it to use this app.");
      }
    };

    loadProvider();
    // Fetch NFT details from the blockchain or backend
    setNFT({
      id: 1,
      name: "Cool NFT",
      description: "This is a cool NFT",
      shares: 100,
    });
  }, []);

   async function handleOffer() {
    let totalamt=1250*offerAmount*(percentage/100)
    console.log(time)
    const tx=await makeOffer_(contract,1,percentage,time,totalamt.toString())
    console.log(tx)
  };

  if (!nft) return <div>Loading...</div>;

  return (
    <div>
      <h1>NFT Details</h1>
      {nftArr.map(function (i) {
        return (<center><div>
          {i.name}

          <div>
            <img
              style={{ width: `100px`, height: `100px` }}
              src={i.image}
              alt="img  here"
            />
          </div>
          <div className="nft-details">
            <h3>{nft.name}</h3>
            <p>Description: {i.description}</p>
            <p>Total Shares: 1250</p>
            <input
              type="number"
              placeholder="Offer % Shares"
              
              onChange={(e) => setpercentage(e.target.value)}
            />
            <input
              type="number"
              placeholder="time in mins"
              
              onChange={(e) => setTime(e.target.value)}
            />
            <input
              type="number"
              placeholder="amnt"
              
              onChange={(e) => setOfferAmount(e.target.value)}
            />
            <button onClick={handleOffer}>Make Offer</button>
          </div>
        </div></center>
          
        );
      })}
      {/* <NFTDetails nft={nft} onOffer={handleOffer} /> */}
    </div>
  );
};

export default NFTDetailsPage;
