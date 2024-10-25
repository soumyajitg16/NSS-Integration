// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenSalePage from './pages/TokenSalePage';
import MyTokensPage from './pages/MyTokensPage';
import NFTDetailsPage from './pages/NFTDetailsPage';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/share-selling" element={<TokenSalePage />} />
          <Route path="/my-tokens" element={<MyTokensPage />} />
          <Route path="/" element={<NFTDetailsPage />} />
        </Routes>
      </div>
    </Router>
    </RecoilRoot>
  );
}

export default App;
