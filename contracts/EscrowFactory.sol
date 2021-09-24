// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Escrow.sol";

/// @title creates new escrow contracts
/// @author mattauer@umich.edu
contract EscrowFactory {

    address[] private deployedEscrowContracts;

    /**
    * @notice creates a new escrow contract and adds it to a list
    * @param _escrowAccount the escrow account to manage the funds
    * @param _seller the account which receives the funds
    */
    function createEscrow(address payable _escrowAccount, address payable _seller) external {
        address newEscrow = address(new Escrow(payable(msg.sender), _escrowAccount, _seller));
        deployedEscrowContracts.push(newEscrow);
    }
}