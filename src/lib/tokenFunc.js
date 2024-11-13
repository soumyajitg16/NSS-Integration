import { ethers } from "ethers";

/**
 * Approves a specified spender to spend a set amount of tokens on behalf of the token owner.
 * @param {Object} _contract - The contract instance.
 * @param {string} _spender - The address of the spender.
 * @param {number} _value - The amount of tokens to approve for the spender.
 * @returns {Promise<Object>} - The transaction result.
 */
export async function approve(_contract, _spender, _value) {
  const val=(_value*10**18).toString()
  const tx = await _contract.approve(_spender, val);
  return tx;
}

/**
 * Grants vault-specific approval for a spender to manage tokens within the vault.
 * @param {Object} _contract - The contract instance.
 * @param {string} _spender - The address of the spender.
 * @param {number} _value - The amount of vault tokens to approve.
 * @returns {Promise<Object>} - The transaction result.
 */
export async function vaultApproval(_contract, _spender, _value) {
  const val=(_value*10**18).toString()
  const tx = await _contract.vaultApproval(_spender, val);
  return tx;
}

/**
 * Places a sell offer by specifying the token amount and price per token.
 * @param {Object} _contract - The contract instance.
 * @param {number} _amount - The amount of tokens to sell.
 * @param {number} _price - The price per token in Wei.
 * @returns {Promise<Object>} - The transaction receipt.
 */
export async function sellTokens(_contract, _amount, _price) {
  const tx = await _contract.sellTokens((10 ** 18 * _amount).toString(), (10 ** 18 * _price).toString());
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Cancels an existing sell offer.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<Object>} - The transaction result.
 */
export async function cancelSellOffer(_contract) {
  const tx = await _contract.cancelSellOffer();
  return tx;
}

/**
 * Buys tokens from a specified seller by paying the total price.
 * @param {Object} _contract - The contract instance.
 * @param {string} _seller - The address of the token seller.
 * @param {number} _amount - The amount of tokens to buy.
 * @param {BigNumber} _pricePerToken - The price per token in Wei.
 * @returns {Promise<Object>} - The transaction receipt.
 */
export async function buyTokens(_contract, _seller, _amount, _pricePerToken) {
  const totalPayable = _pricePerToken.mul(_amount);
  console.log(totalPayable.toString());

  const tx = await _contract.buyTokens(_seller, {
    value: totalPayable.toString() // Total value sent
  });

  const receipt = await tx.wait();
  return receipt;
}

/**
 * Retrieves the total number of active sell offers.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<number>} - The total number of sell offers.
 */
export async function getTotalSellOffers(_contract) {
  const totalOffers = await _contract.getTotalSellOffers();
  return totalOffers;
}
export async function getTotalTokenHolder(_contract) {
  const totalOffers = await _contract.getTotalTokenHolder();
  return totalOffers;
}

/**
 * Gets information about a specific sell offer based on its index.
 * @param {Object} _contract - The contract instance.
 * @param {number} _index - The index of the sell offer.
 * @returns {Promise<Object>} - Details of the sell offer.
 */
export async function getSellOffer(_contract, _index) {
  const offer = await _contract.getSellOffer(_index);
  return offer;
}

/**
 * Retrieves information on a specific token holder based on their index.
 * @param {Object} _contract - The contract instance.
 * @param {number} uint - The index of the token holder.
 * @returns {Promise<Object>} - Details of the token holder.
 */
export async function tokenHolders(_contract, uint) {
  const tokenHolder = await _contract.tokenHolders(uint);
  return tokenHolder;
}

/**
 * Retrieves the symbol of the token.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<string>} - The token symbol.
 */
export async function symbol(_contract) {
  const symbol = await _contract.symbol();
  return symbol;
}

/**
 * Retrieves the name of the token.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<string>} - The token name.
 */
export async function name(_contract) {
  const name = await _contract.name();
  return name;
}

/**
 * Gets the sell offer details for a specified address.
 * @param {Object} _contract - The contract instance.
 * @param {string} _addr - The address to query.
 * @returns {Promise<Object>} - Sell offer details for the specified address.
 */
export async function sellOffers(_contract, _addr) {
  const sellOffers = await _contract.sellOffers(_addr);
  return sellOffers;
}

/**
 * Retrieves the token balance of a specified address.
 * @param {Object} _contract - The contract instance.
 * @param {string} _addr - The address to query the balance for.
 * @returns {Promise<BigNumber>} - The balance of the address.
 */
export async function balanceOf(_contract, _addr) {
  const tx = await _contract.balanceOf(_addr);
  return tx;
}

/**
 * Checks the allowance of a specified spender for a given owner address.
 * @param {Object} _contract - The contract instance.
 * @param {string} _addr - The owner's address.
 * @param {string} _spender - The spender's address.
 * @returns {Promise<BigNumber>} - The amount of tokens allowed for the spender.
 */
export async function allowance(_contract, _addr, _spender) {
  const tx = await _contract.allowance(_addr, _spender);
  return tx;
}
export async function transfer(_contract, _addr, _val) {
  const tx = await _contract.transfer(_addr, (_val*10**18).toString());
  return tx;
}
