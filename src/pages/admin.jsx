// src/pages/NFTDetailsPage.jsx
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import NFTDetails from "../components/NFTDetails";
import { contractABI, contractAddress, nftAbi, tokenabi } from "../lib/data";
import { getOwner, vaults, makeOffer_, createVault } from "../lib/functions";
import {
  buyTokens,
  getSellOffer,
  getTotalSellOffers,
  name,
  symbol,
} from "../lib/tokenFunc";
import { useRecoilState } from "recoil";
import { iAtom } from "../atoms/state";

const Admin = () => {
  // const [i, setI] = useRecoilState(iAtom);
  const [nft, setNFT] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState();
  const [shareAmnt, setShareAmnt] = useState(0);
  const [contract, setContract] = useState();
  const [tcontract, setTContract] = useState();
  const [tname, setTName] = useState("");
  const [tsymbol, setTSymbol] = useState("");
  const [getSellOffers, setGetSellOffers] = useState([]);
  const [_NFTcontract, set_NFTcontract] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [addr, setAddr] = useState("");
  const [tknId, setTknId] = useState();

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

        //fetch the total vaultcount for now we are hardcoding it to 1
        // const vaultCount = 4;

        // //from vault counter fetching all vaults
        // let vaultsARR = [];
        // let NftAddrs = [];
        // for (let i = 1; i <= vaultCount; i++) {
        //   const vaultTX = await vaults(_contract, i);
        //   vaultsARR.push(vaultTX);
        //   // console.log(vaultTX);
        //   let tempAADrs = {
        //     addr: vaultsARR[i - 1][0],
        //     tokenId: vaultsARR[i - 1][1].toNumber(),
        //   };
        //   NftAddrs.push(tempAADrs);
        // }
        // console.log(vaultsARR);
        // let tokenAddr_ = vaultsARR[0][3]; //oth ka
        // console.log(tokenAddr_);

        // const _Tcontract = new ethers.Contract(tokenAddr_, tokenabi, signers);
        // setTContract(_Tcontract);

        // const totalsellOffers = (
        //   await getTotalSellOffers(_Tcontract)
        // ).toNumber();

        // let getSellOffers_ = [];
        // for (let i = 0; i < totalsellOffers; i++) {
        //   let temp = await getSellOffer(_Tcontract, i);
        //   getSellOffers_.push(temp);
        // }
        // setGetSellOffers(getSellOffers_);
        // console.log(getSellOffers);
        // const _name = await name(_Tcontract);
        // const _symbol = await symbol(_Tcontract);
        // setTName(_name);
        // setTSymbol(_symbol);
        // console.log(tname, tsymbol);
      } else {
        alert("MetaMask is not installed. Please install it to use this app.");
      }
    };

    loadProvider();
  }, []);

  return (
    <div>
      {contract ? (
        <div className="bg-slate-800 h-screen">
          <center>
            <div className="text-4xl font-bold pb-5 text-white bg-slate-900 p-2">
              Admin Window
            </div>
            <div className="flex flex-col justify-center ">
              <div className="text-2xl text-white m-3">
                Name{" "}
                <input
                  onChange={function (e) {
                    setName(e.target.value);
                  }}
                  className="p-1 m-2   bg-slate-600 rounded-lg"
                  type="text"
                />
              </div>
              <div className="text-2xl text-white m-3">
                Symbol{" "}
                <input
                  onChange={function (e) {
                    setSymbol(e.target.value);
                  }}
                  className="p-1 m-2   bg-slate-600 rounded-lg"
                  type="text"
                />
              </div>
              <div className="text-2xl text-white m-3">
                Collection Address{" "}
                <input
                  onChange={function (e) {
                    setAddr(e.target.value);
                  }}
                  className="p-1 m-2   bg-slate-600 rounded-lg"
                  type="text"
                />
              </div>
              <div className="text-2xl text-white m-3">
                Token Id{" "}
                <input
                  onChange={function (e) {
                    setTknId(e.target.value);
                  }}
                  className="p-1 m-2   bg-slate-600 rounded-lg"
                  type="number"
                />
              </div>
            </div>
            <div>
              <button onClick={async function(){
                try{
                  const res=await createVault(contract,name,symbol,addr,tknId)
                  console.log(res)
                }catch(err){
                  console.log(err)
                  alert("invalid arguments")
                }
                
              }} className="bg-white text-4xl font-semibold px-5 p-2 rounded-xl">
                Create
              </button>
            </div>
          </center>
        </div>
      ) : (
        <div>Loading........</div>
      )}
    </div>
  );
};

export default Admin;
