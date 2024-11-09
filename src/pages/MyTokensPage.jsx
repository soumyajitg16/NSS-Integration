// src/pages/NFTDetailsPage.jsx
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { contractABI, contractAddress, nftAbi, tokenabi } from "../lib/data";
import {
  getOwner,
  vaults,
  makeOffer_,
  acceptOffer,
  vaultCounter,
} from "../lib/functions";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { iAtom } from "../atoms/state";
import {
  approve,
  balanceOf,
  getSellOffer,
  getTotalSellOffers,
  sellTokens,
  transfer,
  vaultApproval,
} from "../lib/tokenFunc";

const MyTokensPage = () => {
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [i, setI] = useRecoilState(iAtom);
  const [balances, setBalances] = useState([]);
  const [NFTcontract, setNFTcontract] = useState([]);
  const [TOKENcontract, setTOKENcontract] = useState([]);
  const [nftArr, setNftArr] = useState([]);
  const [vaultdetails, setVaultdetails] = useState([]);
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [val, setVal] = useState();
  const [giftAddr, setgiftAddr] = useState();
  const [giftVal, setgiftVal] = useState();
  // const [val, setVal] = useState();
  const [able, setAble] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(ethersProvider);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const signer = ethersProvider.getSigner();
        setSigner(signer);

        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(_contract);

        // Fetch vault data and NFTs
        await fetchVaultsAndNFTs(_contract, signer, accounts[0]);
      } else {
        alert("MetaMask is not installed. Please install it to use this app.");
      }
    };

    const fetchVaultsAndNFTs = async (_contract, signer, userAddress) => {
      try {
        const vaultCount = await vaultCounter(_contract);
        const vaultsARR = [];
        const vaults = [];

        for (let i = 1; i <= vaultCount; i++) {
          const vaultTX = await _contract.vaults(i);
          vaultsARR.push(vaultTX);
          let tempAADrs = {
            addr: vaultsARR[i - 1][0],
            tokenId: vaultsARR[i - 1][1].toNumber(),
            tokenaddrs: vaultsARR[i - 1][3],
            sellingState: vaultsARR[i - 1][4],
            offerPrice: vaultsARR[i - 1][5],
            offerTime: vaultsARR[i - 1][6],
            // offerPercentage: vaultsARR[i - 1][7],
            offerBuyer: vaultsARR[i - 1][7],
            totalAcceptedShares: vaultsARR[i - 1][8],
          };
          vaults.push(tempAADrs);
        }
        setVaultdetails(vaults);

        const _NFTcontract = [];
        const _Tokencontract = [];
        const tokenURIS = [];
        const NFTS = [];

        for (let i = 0; i < vaults.length; i++) {
          let tempContract = new ethers.Contract(
            vaults[i].addr,
            nftAbi,
            signer
          );
          _NFTcontract.push(tempContract);

          let tempURI = await _NFTcontract[i].tokenURI(vaults[i].tokenId);
          tokenURIS.push(tempURI);
          const res = await fetch(tempURI);
          const tempNFT = await res.json();
          NFTS.push({ tempNFT, id: i });

          let tempTokenContract = new ethers.Contract(
            vaults[i].tokenaddrs,
            tokenabi,
            signer
          );
          _Tokencontract.push(tempTokenContract);
        }

        setNftArr(NFTS);
        setTOKENcontract(_Tokencontract);
        setNFTcontract(_NFTcontract);

        // Fetch balances
        const totalbalances = [];
        for (let i = 0; i < _Tokencontract.length; i++) {
          const balance = await _Tokencontract[i].balanceOf(userAddress);
          totalbalances.push(balance);
        }

        setBalances(totalbalances);
        console.log(totalbalances);
        // Assuming this is required as a reset
      } catch (error) {
        console.error("Error fetching vaults or NFTs:", error);
      }
    };

    loadProvider();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center text-4xl font-extrabold">My NFTs</h1>
      <div className="grid grid-cols-3">
        {nftArr.length > 0 && balances.length > 0 ? (
          nftArr.map((i, index) => {
            const balance = balances[i.id];

            // Check if balance and i.tempNFT exist to prevent undefined errors
            if (balance && !balance.eq(ethers.BigNumber.from(0))) {
              return (
                <center key={index}>
                  <div className="p-2 m-2 rounded-xl border border-black bg-zinc-100">
                    <div className="my-2">
                      <img
                        className="rounded-2xl"
                        style={{ width: `300px`, height: `300px` }}
                        src={i.tempNFT.image}
                        alt="NFT Image"
                      />
                    </div>
                    <div className="nft-details">
                      <div>
                        <audio
                          controls
                          className="border border-black rounded-3xl"
                        >
                          <source
                            src={i.tempNFT.animation_url}
                            type="audio/mpeg"
                          />
                        </audio>
                      </div>
                      <button
                      // onClick={() => {
                      //   setI(i);
                      //   navigate(`/share-selling`);
                      // }}
                      >
                        <h3 className="font-bold text-2xl">{i.tempNFT.name}</h3>
                      </button>
                      <p className="m-1">
                        Description: {i.tempNFT.description}
                      </p>
                      <p className="m-1">Total Shares: 1250</p>
                      <div className=" font-semibold text-lg">
                        Your Balance: {ethers.utils.formatUnits(balance, 18)}
                      </div>
                      <input
                        onChange={function (e) {
                          setAmount(e.target.value);
                        }}
                        className="m-1 p-2 rounded-lg w-40 "
                        type="number"
                        placeholder="amount"
                      />
                      <input
                        onChange={function (e) {
                          setPrice(e.target.value);
                        }}
                        className="m-1 p-2  rounded-lg w-40"
                        type="number"
                        placeholder="price per share"
                      />
                      <button
                        onClick={async function (j) {
                          const tx = await sellTokens(
                            TOKENcontract[i.id],
                            amount,
                            price
                          );
                        }}
                        className="bg-white border m-1 border-black rounded-lg p-2 "
                      >
                        Sell Token
                      </button>
                      <hr className="m-1 border border-slate-300" />
                      <div>
                        <input
                          onChange={function (e) {
                            setgiftAddr(e.target.value);
                          }}
                          className="m-1 p-2  rounded-lg w-64"
                          type="text"
                          placeholder="Receiver Address"
                        />
                        <input
                          onChange={function (e) {
                            setgiftVal(e.target.value);
                          }}
                          className="m-1 p-2  rounded-lg w-24"
                          type="number"
                          placeholder="Amount"
                        />
                        <button
                          onClick={async function (j) {
                            const res = await transfer(
                              TOKENcontract[i.id],
                              giftAddr,
                              giftVal
                            );
                            console.log(res)
                          }}
                          className="bg-white border m-1 px-4 border-black rounded-lg p-2 "
                        >
                          Gift
                        </button>
                      </div>

                      {(() => {
                        // console.log(vaultdetails[i.id].sellingState)
                        if (vaultdetails[i.id].sellingState == 1) {
                          return (
                            <div>
                              <hr className="m-1 border border-slate-300" />
                              <div>
                                <div>
                                  Offer Buyer: {vaultdetails[i.id].offerBuyer}
                                </div>
                                <div>
                                  Offer price:{" "}
                                  {ethers.utils.formatUnits(
                                    vaultdetails[i.id].offerPrice.toString(),
                                    18
                                  )}{" "}
                                </div>
                                {/* <div>
                                  Offer Percentage: %
                                  {vaultdetails[
                                    i.id
                                  ].offerPercentage.toString()}{" "}
                                </div> */}
                              </div>

                              <input
                                onChange={function (e) {
                                  setVal(e.target.value);
                                }}
                                className="m-1 p-2 rounded-lg w-40 "
                                type="number"
                                placeholder="amount of shares"
                              />

                              <button
                                onClick={async function (j) {
                                  console.log(i.id);
                                  const tx = await approve(
                                    TOKENcontract[i.id],
                                    contractAddress,
                                    val
                                  );

                                  console.log(tx);
                                  if (tx) {
                                    setAble(true);
                                  }
                                }}
                                className="bg-white border m-1 border-black rounded-lg p-2 "
                              >
                                Approve
                              </button>
                              <button
                                onClick={async function (j) {
                                  if (able) {
                                    console.log(i.id + 1);

                                    const tx2 = await acceptOffer(
                                      contract,
                                      i.id + 1,
                                      val
                                    );
                                    console.log(tx2);
                                  } else {
                                    alert("first approve");
                                  }
                                }}
                                className="bg-white border m-1 border-black rounded-lg p-2 "
                              >
                                Accept offer
                              </button>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </center>
              );
            } else {
              // return (
              //   <div key={index} className="flex justify-center items-center">
              //     No Balance Available
              //   </div>
              // );
            }
          })
        ) : (
          <p>Loading NFT data...</p>
        )}
      </div>
    </div>
  );
};

export default MyTokensPage;
