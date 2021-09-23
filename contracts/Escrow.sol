// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/// @title handles escrow funds
/// @author mattauer@umich.edu
contract Escrow {

    address payable private buyer;
    address private escrowAccount;
    address payable private seller;

    /**
    * @notice constructs and escrow contract
    * @param _escrowAccount the escrow account to manage the funds
    * @param _seller the account which receives the funds
    */
    constructor(address _escrowAccount, address payable _seller) payable {
        buyer = payable(msg.sender);
        escrowAccount = _escrowAccount;
        seller = _seller;
    }

    /**
    * @notice releases the funds to the seller
    */
    function releaseFunds() external {
        require(msg.sender == buyer || msg.sender == escrowAccount, "Only the buyer or escrow account can release funds.");
        seller.transfer(address(this).balance);
    }

    /**
    * @notice refunds the funds to the seller
    */
    function refundFunds() external {
        require(msg.sender == seller || msg.sender == escrowAccount, "Only the seller or escrow account can refund funds");
        buyer.transfer(address(this).balance);
    }

}