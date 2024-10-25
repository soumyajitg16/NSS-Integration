// src/pages/NFTDetailsPage.jsx
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import NFTDetails from "../components/NFTDetails";
import { contractABI, contractAddress, nftAbi, tokenabi } from "../lib/data";
import { getOwner, vaults, makeOffer_ } from "../lib/functions";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {  iAtom } from "../atoms/state";
import { balanceOf, getSellOffer, getTotalSellOffers } from "../lib/tokenFunc";

const MyTokensPage = () => {
  const navigate = useNavigate();

  const [nft, setNFT] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [i, setI] = useRecoilState(iAtom);
  const [tcontract, setTContract] = useState();
  const [tokenAddr, setTokenAddr] = useState("");
  const [balances, setBalances] = useState([]);
  const [_NFTcontract, set_NFTcontract] = useState([]);
  const [nftArr, setNftArr] = useState([]);
  const [atlas, setatlas] = useState([]);
  

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(ethersProvider);
        const x=await window.ethereum.request({ method: "eth_requestAccounts" });
        const signers = ethersProvider.getSigner();
        setSigner(signers);
        // console.log(x)
        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signers
        );
        setContract(_contract);

        const _Tcontract = new ethers.Contract(tokenAddr, tokenabi, signers);
        setTContract(_Tcontract);

        //fetch the total vaultcount for now we are hardcoding it to 1
        const vaultCount = 4;

        //from vault counter fetching all vaults
        let vaultsARR = [];
        let NftAddrs = [];
        for (let i = 1; i <= vaultCount; i++) {
          const vaultTX = await vaults(contract, i);
          vaultsARR.push(vaultTX);
          //console.log(vaultTX);
          let tempAADrs = {
            addr: vaultsARR[i - 1][0],
            tokenId: vaultsARR[i - 1][1].toNumber(),
            tokenaddrs:vaultsARR[i-1][3]
          };
          NftAddrs.push(tempAADrs);
        }
        // console.log(tempAADrs)

        //console.log(NftAddrs);

        const _NFTcontract = [];
        const _Tokencontract = [];
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
          NFTS.push({tempNFT:tempNFT,id:i});

          let temp=   new ethers.Contract(
            NftAddrs[i].tokenaddrs,
            tokenabi,
            signers
          );       
          _Tokencontract.push(temp)
        }
        //console.log(tokenURIS);
        setNftArr(NFTS);

        





        const totalbalances_=[]

        for (let i = 0; i < _Tokencontract.length; i++) {
          let temp=await balanceOf(_Tokencontract[i],x[0])
          
          
          totalbalances_.push(temp)
          
        }

        console.log(balances)
        console.log(balances[0],"jello")
        setBalances(totalbalances_)
        console.log((balances[nftArr[1].id]).eq(ethers.BigNumber.from(0)) )
        setatlas([])
        
        


        // console.log(nftArr);
      } else {
        alert("MetaMask is not installed. Please install it to use this app.");
      }
    };

    loadProvider();
    // Fetch NFT details from the blockchain or backend
    
  }, []);

  

  

  return (
    <div >
      <h1 className=" flex justify-center text-4xl font-extrabold">NFT Details</h1>
      <div className=" grid grid-cols-3">

      
      {
      
      
      nftArr.map(function (i) {
        console.log(balances[i.id])
        // const booool=(balances[i.id]).eq(ethers.BigNumber.from(0)) 
        if( !((balances[i.id]).eq(ethers.BigNumber.from(0)))) {
          return (
            <center>
              <div className=" p-2 m-2 rounded-xl border border-black bg-zinc-200">
                <div className=" m-2">
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={i.tempNFT.image}
                    alt="img  here"
                  />
                </div>
                <div className="nft-details">
                  <div>
                    <audio controls auoplay>
                      <source
                        src={i.tempNFT.animation_url}
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                  <button onClick={function(j){
                    setI(i)
                    navigate(`/share-selling`)
                  }}><h3 className="font-bold text-2xl">{i.tempNFT.name}</h3></button>
                  <p className=" m-1 ">Description: {i.tempNFT.description}</p>
                  <p className=" m-1">Total Shares: 1250</p>
                  
                  
                </div>
              </div>
            </center>
          );
        }else{
          return <div>
            hello
          </div>
        }
        
      })}
      </div>
     
    </div>
  );
};

export default MyTokensPage;
