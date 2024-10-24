// src/components/TokenSaleCard.jsx
import React from 'react';

const TokenSaleCard = ({ token, onBuy }) => {
  return (
    <div className="card">
      <h3>{token.name}</h3>
      <p>Price: {token.price} ETH</p>
      <p>Shares Available: {token.shares}</p>
      <button onClick={() => onBuy(token.id)}>Buy Shares</button>
    </div>
  );
};

export default TokenSaleCard;
