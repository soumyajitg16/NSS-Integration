// src/pages/MyTokensPage.jsx
import React, { useState, useEffect } from 'react';
import MyTokens from '../components/MyTokens';

const MyTokensPage = () => {
  const [myTokens, setMyTokens] = useState([]);

  useEffect(() => {
    // Fetch owned tokens from blockchain or backend
    setMyTokens([
      { id: 1, name: 'Token 1', shares: 20 },
      { id: 2, name: 'Token 2', shares: 10 },
    ]);
  }, []);

  const handleSell = (tokenId) => {
    // Sell logic with Web3.js or Ethers.js
    console.log(`Selling shares of token ID: ${tokenId}`);
  };

  return (
    <div>
      <h1>My Tokens</h1>
      <MyTokens tokens={myTokens} onSell={handleSell} />
    </div>
  );
};

export default MyTokensPage;
