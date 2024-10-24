// src/components/MyTokens.jsx
import React from 'react';

const MyTokens = ({ tokens, onSell }) => {
  return (
    <div className="my-tokens">
      {tokens.map((token) => (
        <div className="card" key={token.id}>
          <h3>{token.name}</h3>
          <p>Owned Shares: {token.shares}</p>
          <button onClick={() => onSell(token.id)}>Sell Shares</button>
        </div>
      ))}
    </div>
  );
};

export default MyTokens;
