import { ethers } from "ethers";

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

export async function acceptOffer(_contract,_vaultId,_amntOfShares) {
  const ao=_contract.acceptOffer(_vaultId,_amntOfShares);
  return ao;
}
export async function endOffer(_contract, _vaultId) {
  const ao=_contract.endOffer(_vaultId);
  return ao;
}
export async function onERC721Received(_contract,_addr,_addr_uint,_bytes) {
  const ao=_contract.onERC721Received(_addr,_addr_uint,_bytes);
  return ao;
}
export async function transferOwnership(_contract,_addr,) {
  const ao=_contract.transferOwnership(_addr);
  return ao;
}
export async function getVaultInfo(_contract, _vaultId) {
  const vault = await _contract.getVaultInfo(_vaultId);
  return vault;
}




/*0:
string: name totaleclipse
1:
string: symbol tec
2:
address: collection 0x20Ed8A5D17667F86A90F503044e04C9A689e4Ca5
3:
uint256: tokenId 1
4:
address: owner 0x2810c698cA6257AF8a2F9d6eB874BC61B4fc1fe2
5:
address: fractionalTokenAddress 0xD2c70DDec21d09e2Abc0Bf849C684473Ef5c59b7
6:
uint8: sellingState 0
7:
uint256: offerPrice 0
8:
uint256: offerTime 0
9:
uint256: offerPercentage 0
10:
address: offerBuyer 0x0000000000000000000000000000000000000000
11:
uint256: totalAcceptedShares 0 */
export async function vaults(_contract, _vaultId) {
  const vault = await _contract.vaults(_vaultId);
  return vault;
}
export async function getOwner(_contract) {
  const owner = await _contract.owner();
  return owner;
}
export async function royaltyPercentage(_contract) {
  const rp = await _contract.royaltyPercentage();
  return rp;
}

export async function makeOffer(
  _contract,
  vaultId,
  percentage,
  _offerTime,
  offerAmount //shold be in string 
) {
  const offer = await _contract.makeOffer(vaultId, percentage, _offerTime, {
    value: offerAmount, 
  });
  return offer;
}
export async function makeOffer_(_contract,
  vaultId,
  percentage,
  _offerTime,
  offerAmount) {
  try {
    //console.log(toString(parseFloat(_etherValue) ))
    const tx = await _contract.makeOffer(vaultId,
      percentage,
      _offerTime, {
      value: ethers.utils.parseEther(offerAmount ) 
    });

    console.log("Transaction hash:", tx.hash);

    
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt
  } catch (error) {
    console.error("Error purchasing vault:", error);
  }
}