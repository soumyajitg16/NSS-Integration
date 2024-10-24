// src/pages/NFTDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import NFTDetails from '../components/NFTDetails';

const NFTDetailsPage = () => {
  const [nft, setNFT] = useState(null);

  useEffect(() => {
    // Fetch NFT details from the blockchain or backend
    setNFT({
      id: 1,
      name: 'Cool NFT',
      description: 'This is a cool NFT',
      shares: 100,
    });
  }, []);

  const handleOffer = (nftId, offerAmount) => {
    // Logic for making an offer
    console.log(`Making an offer of ${offerAmount}% shares for NFT ID: ${nftId}`);
  };

  if (!nft) return <div>Loading...</div>;

  return (
    <div>
      <h1>NFT Details</h1>
      <NFTDetails nft={nft} onOffer={handleOffer} />
    </div>
  );
};

export default NFTDetailsPage;
