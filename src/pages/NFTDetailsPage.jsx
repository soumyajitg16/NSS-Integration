// src/pages/NFTDetailsPage.jsx
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import NFTDetails from "../components/NFTDetails";
import { contractABI, contractAddress, nftAbi, tokenabi } from "../lib/data";
import { getOwner, vaults, makeOffer_, createVault, vaultCounter } from "../lib/functions";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { iAtom } from "../atoms/state";

const NFTDetailsPage = () => {
  const navigate = useNavigate();

  const [nft, setNFT] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [i, setI] = useRecoilState(iAtom);
  const [tcontract, setTContract] = useState();
  const [tokenAddr, setTokenAddr] = useState("");
  const [nftAddr, setNftAddr] = useState([]);
  const [_NFTcontract, set_NFTcontract] = useState([]);
  const [nftArr, setNftArr] = useState([]);
  const [offerAmount, setOfferAmount] = useState();
  const [ttlamnt, setTtlamnt] = useState();
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

        //const v=await createVault(_contract,'new','new','0xF6AdB774f30bdFDd8B8Bcbbc8c520cef85d91c93',2)
        //console.log(v)





        const _Tcontract = new ethers.Contract(tokenAddr, tokenabi, signers);
        setTContract(_Tcontract);

        //fetch the total vaultcount for now we are hardcoding it to 1
        const vaultCount = await vaultCounter(_contract);
        console.log(vaultCount)

        //from vault counter fetching all vaults
        let vaultsARR = [];
        let NftAddrs = [];
        for (let i = 1; i <= vaultCount; i++) {
          const vaultTX = await vaults(_contract, i);
          vaultsARR.push(vaultTX);
          console.log(vaultTX);
          let tempAADrs = {
            addr: vaultsARR[i - 1][0],
            tokenId: vaultsARR[i - 1][1].toNumber(),
          };
          NftAddrs.push(tempAADrs);
        }
        // console.log(tempAADrs)

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
  }, []);

  async function handleOffer() {
    let totalamt = 1250 * offerAmount ;
    //setTtlamnt(totalamt)

    console.log(time);
    const tx = await makeOffer_(contract, 1, time, totalamt);
    console.log(tx);
  }

  return (
    <div>
      <h1 className=" flex justify-center text-4xl font-extrabold">
        NFT Details
      </h1>
      <div className=" grid grid-cols-3">
        {( nftArr.length > 0) ?(nftArr.map(function (i) {
          return (
            <center>
              <div className=" p-2 m-2 rounded-xl border border-black bg-zinc-200">
                <div className=" m-2">
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={i.image}
                    alt="img  here"
                  />
                </div>
                <div className="nft-details">
                  <div>
                    <audio controls auoplay>
                      <source src={i.animation_url} type="audio/mpeg" />
                    </audio>
                  </div>
                  <button
                    onClick={function (j) {
                      setI(i);
                      navigate(`/share-selling`);
                    }}
                  >
                    <h3 className="font-bold text-2xl">{i.name}</h3>
                  </button>
                  <p className=" m-1 ">Description: {i.description}</p>
                  <p className=" m-1">Total Shares: 1250</p>
                  <p className=" m-1 text-red-500">
                    Total amount to be paid: {ttlamnt}
                  </p>
                  {/* <input
                    className="m-1 p-1 rounded-md"
                    type="number"
                    placeholder="Offer % Shares"
                    onChange={(e) => setpercentage(e.target.value)}
                  /> */}
                  <input
                    className="m-1 rounded-md p-1"
                    type="number"
                    placeholder="Time in timestamp"
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <input
                    className="m-1 p-1 rounded-md"
                    type="number"
                    placeholder="Matic per share"
                    onChange={(e) => {
                      const x = e.target.value;
                      setOfferAmount(x);
                    }}
                  />
                  <button
                    className=" p-2 bg-zinc-100 rounded-sm m-2"
                    onClick={function (i) {
                      let totalamt = 1250 * offerAmount ;
                      console.log(totalamt);
                      setTtlamnt(totalamt);
                    }}
                  >
                    Calculate
                  </button>
                  <button
                    className=" p-2 bg-red-700 text-white rounded-sm m-2"
                    onClick={handleOffer}
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </center>
          );
        })):(
          <p>loading.....</p>
        )
        
        
        
        
        }
      </div>
      {/* <NFTDetails nft={nft} onOffer={handleOffer} /> */}
    </div>
  );
};

export default NFTDetailsPage;
