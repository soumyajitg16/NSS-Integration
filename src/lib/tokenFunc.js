import { ethers } from "ethers";



export async function vaultApproval(
    _contract,  
    _spender,    
    _value        
  ) {
    const tx = await _contract.vaultApproval(_spender, _value);
    
    return tx;
  }
  
  export async function sellTokens(
    _contract,   // The contract instance                                                                                                                             
    _amount,     // The amount of tokens to sell
    _price       // The price per token in Wei
  ) {
    const tx = await _contract.sellTokens(_amount, _price);
    const receipt = await tx.wait();
    return receipt;
  }
  
  export async function cancelSellOffer(_contract) {
    const tx = await _contract.cancelSellOffer();
   
    return tx;
  }
  
  export async function buyTokens(
    _contract,     // The contract instance
    _seller,       // Seller's address
    _amount,       // Number of tokens to buy
    _pricePerToken // Price per token in Wei
  ) {
    const totalPayable = _pricePerToken * _amount;
  
    const tx = await _contract.buyTokens(_seller, _amount, {
      value: totalPayable // Total value sent
    });
  
    const receipt = await tx.wait();
    return receipt;
  }
  
  export async function getTotalSellOffers(_contract) {
    const totalOffers = await _contract.getTotalSellOffers();
    return totalOffers;
  }
  
  export async function getSellOffer(
    _contract,   // The contract instance
    _index       // The index of the token holder in tokenHolders array
  ) {
    const offer = await _contract.getSellOffer(_index);
    return offer;
  }


  export async function tokenHolders(
    _contract,
    uint       
  ) {
    const tokenHolder = await _contract.tokenHolders(uint);
    return tokenHolder;
  }


  export async function symbol(_contract) {
    const symbol = await _contract.symbol();
    return symbol;
  }

  export async function sellOffers(_contract,_addr) {
    const sellOffers = await _contract.sellOffers(_addr);
    return sellOffers;
  }
  export async function balanceOf(_contract,_addr) {
    const tx = await _contract.balanceOf(_addr);
    return tx;
  }
  export async function allowance(_contract,_addr,_splender) {
    const tx = await _contract.allowance(_addr,_splender);
    return tx;
  }

  