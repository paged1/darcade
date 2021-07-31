pragma solidity ^0.5.0;

import "./ERC721Full.sol";

// PrizeToken inherits from ERC721Full which is the ERC721 standard
contract PrizeToken is ERC721Full  {

    //
    // constructor(name, symbol)
    //
    constructor() ERC721Full("Prize Token", "PRIZE") public {}

    function mint(address _to, string prize _tokenURI) public returns(bool) {
       uint _tokenId = totalSupply().add(1);
       _mint(_to, _tokenId);
       _setTokenURI(_tokenId, _tokenURI);
       return true;
    }
}
