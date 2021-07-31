pragma solidity ^0.5.0;

import "./ERC721Full.sol";

// PrizeToken inherits from ERC721Full which is the ERC721 standard
contract PrizeToken is ERC721Full  {

    //
    // constructor(name, symbol)
    //
    constructor() ERC721Full("Prize Token", "PRIZE") public {}

    // creates a token (mint token -> creates a token)
    // address _to -> username of person on the blockchain we're giving it to
    // _tokenURI -> location of the image that's stored for this token
    function mint(address _to, string memory _tokenURI) public returns(bool) {
       uint _tokenId = totalSupply().add(1);
       _mint(_to, _tokenId);
       _setTokenURI(_tokenId, _tokenURI);
       return true;
    }
}
