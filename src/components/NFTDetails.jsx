// src/components/NFTDetails.jsx
import React, { useState } from 'react';

const NFTDetails = ({ nft, onOffer }) => {
  const [offerAmount, setOfferAmount] = useState('');

  const handleOffer = () => {
    onOffer(nft.id, offerAmount);
  };

  return (
    <div className="nft-details">
      <h3>{nft.name}</h3>
      <p>Description: {nft.description}</p>
      <p>Available Shares: {nft.shares}</p>
      <input
        type="number"
        placeholder="Offer % Shares"
        value={offerAmount}
        onChange={(e) => setOfferAmount(e.target.value)}
      />
      <button onClick={handleOffer}>Make Offer</button>
    </div>
  );
};

export default NFTDetails;
