pragma solidity ^0.5.0;

import "./ERC721Full.sol";

// PrizeToken inherits from ERC721Full which is the ERC721 standard
contract GameToken {

    uint256 public totalSupply;
    address master;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );

    mapping(address => uint256) public balanceOf;


    constructor(uint256 _initSupply) public {
        master = msg.sender;
        balanceOf[master] = _initSupply;
        totalSupply = _initSupply;
    }

    // transfers tokens out from the master wallet
    function buyToken(address _to, uint256 _amount) public returns(bool) {
        require(balanceOf[master] >= _amount);

        balanceOf[master] -= _amount;

        balanceOf[_to] += _amount;

        emit Transfer(msg.sender, _to, _amount);

        return true;

    }

    function tokenCount(address _requester) public returns (uint256) {
        return balanceOf[_requester];
    }


    function buyGame(address _cust, uint256 _amount) public returns(bool) {
        require(balanceOf[_cust] >= _amount);

        balanceOf[_cust] -= _amount;

        balanceOf[master] += _amount;

        emit Transfer(_cust, msg.sender, _amount);

        return true;


    }



    function canPlay(address _requester) public returns (bool) {
        if (balanceOf[_requester] < 1) {
            return false;
        }
        return true;
    }



    // things like swap

    // canPlay


    // useToken (use some of your balance)




}
