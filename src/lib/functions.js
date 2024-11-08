import { ethers } from "ethers";

/**
 * Creates a new vault in the contract.
 * @param {Object} _contract - The contract instance.
 * @param {string} _name - The name of the vault.
 * @param {string} _symbol - The symbol for the vault.
 * @param {string} _collection - The address of the ERC721 collection.
 * @param {number} _tokenId - The token ID within the collection to be vaulted.
 * @returns {Promise<Object>} The transaction result of vault creation.
 */
export async function createVault(
  _contract,
  _name,
  _symbol,
  _collection,
  _tokenId
) {
  const vault = await _contract.createVault(
    _name,
    _symbol,
    _collection,
    _tokenId
  );
  return vault;
}

/**
 * Accepts an offer on a specified vault.
 * @param {Object} _contract - The contract instance.
 * @param {number} _vaultId - The ID of the vault.
 * @param {number} _amntOfShares - The amount of shares to accept in the offer.
 * @returns {Promise<Object>} The transaction result of accepting the offer.
 */
export async function acceptOffer(_contract, _vaultId, _amntOfShares) {

  const ao = _contract.acceptOffer(_vaultId,( _amntOfShares*10**18).toString());
  return ao;
}

/**
 * Ends an active offer on a specified vault.
 * @param {Object} _contract - The contract instance.
 * @param {number} _vaultId - The ID of the vault.
 * @returns {Promise<Object>} The transaction result of ending the offer.
 */
export async function endOffer(_contract, _vaultId) {
  const ao = _contract.endOffer(_vaultId);
  return ao;
}

/**
 * Handles ERC721 token transfers to the contract.
 * @param {Object} _contract - The contract instance.
 * @param {string} _addr - The address of the sender.
 * @param {number} _addr_uint - The token ID.
 * @param {string} _bytes - Additional data sent with the transfer.
 * @returns {Promise<Object>} The result of the onERC721Received function.
 */
export async function onERC721Received(_contract, _addr, _addr_uint, _bytes) {
  const ao = _contract.onERC721Received(_addr, _addr_uint, _bytes);
  return ao;
}

/**
 * Transfers contract ownership to a new address.
 * @param {Object} _contract - The contract instance.
 * @param {string} _addr - The new owner's address.
 * @returns {Promise<Object>} The transaction result of the ownership transfer.
 */
export async function transferOwnership(_contract, _addr) {
  const ao = _contract.transferOwnership(_addr);
  return ao;
}

/**
 * Retrieves information about a specific vault.
 * @param {Object} _contract - The contract instance.
 * @param {number} _vaultId - The ID of the vault.
 * @returns {Promise<Object>} The vault information, including details like name, symbol, and state.
 */
export async function getVaultInfo(_contract, _vaultId) {
  const v = await _contract.getVaultInfo(_vaultId);
  return v;
}
export async function vaultCounter(_contract) {
  const v = await _contract.vaultCounter();
  return v;
}

/**
 * Gets the vault details for a specified ID directly.
 * @param {Object} _contract - The contract instance.
 * @param {number} _vaultId - The ID of the vault.
 * @returns {Promise<Object>} The vault details as stored on the contract.
 */
export async function vaults(_contract, _vaultId) {
  const vault = await _contract.vaults(_vaultId);
  return vault;
}

/**
 * Retrieves the current owner of the contract.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<string>} The address of the contract owner.
 */
export async function getOwner(_contract) {
  const owner = await _contract.owner();
  return owner;
}

/**
 * Gets the royalty percentage set on the contract.
 * @param {Object} _contract - The contract instance.
 * @returns {Promise<number>} The royalty percentage value.
 */
export async function royaltyPercentage(_contract) {
  const rp = await _contract.royaltyPercentage();
  return rp;
}



/**
 * Makes an offer with a specified amount in ether.
 * @param {Object} _contract - The contract instance.
 * @param {number} vaultId - The ID of the vault.
 * @param {number} percentage - The percentage of shares being offered.
 * @param {number} _offerTime - The duration of the offer.
 * @param {string} amnt - The offer amount in ether as a string (will be converted to wei).
 * @returns {Promise<Object>} The transaction receipt of the offer.
 */
export async function makeOffer_(
  _contract,
  vaultId,
  // percentage,
  _offerTime,
  amnt
) {
  try {
    const ttl=( amnt ).toString();
    const tx = await _contract.makeOffer(vaultId, _offerTime, {
      value: ethers.utils.parseEther(ttl),
    });

    console.log("Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error making offer:", error);
  }
}
