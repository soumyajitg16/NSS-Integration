// src/pages/TokenSalePage.jsx
import React, { useState, useEffect } from 'react';
import TokenSaleCard from '../components/TokenSaleCard';

const TokenSalePage = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Fetch available tokens from your backend or Ethereum contract
    setTokens([
      { id: 1, name: 'Token 1', price: 0.5, shares: 100 },
      { id: 2, name: 'Token 2', price: 1.0, shares: 50 },
    ]);
  }, []);

  const handleBuy = (tokenId) => {
    // Buy logic with Web3.js or Ethers.js
    console.log(`Buying shares of token ID: ${tokenId}`);
  };

  return (
    <div>
      <h1>Available Tokens</h1>
      <div className="token-grid">
        {tokens.map((token) => (
          <TokenSaleCard key={token.id} token={token} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
};

export default TokenSalePage;
