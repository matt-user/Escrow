import React, { Component } from 'react';
import Web3 from 'web3';
import { Button } from 'semantic-ui-react';
import Layout from './Layout';
import Escrow from "./contracts/Escrow.json";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

class EscrowContractIndex extends Component {

    onRelease = async () => {
        const { drizzle, drizzleState } = this.props;
        const escrow = new web3.eth.Contract(Escrow.abi, this.props.address);
        await escrow.methods.releaseFunds().send({ from: drizzleState.accounts[0] });
    }

    onRefund = async () => {
        const { drizzleState } = this.props;
        const escrow = new web3.Contract(Escrow.abi, this.props.match.params.address);
        await escrow.methods.refundFunds().send({ from: drizzleState.accounts[0] });
    }

    render() {
        return (
            <div>
                <h2>Escrow Contract</h2>
                <h3>{this.props.match}</h3>
                <div>
                    <Button color="green" basic onClick={this.onRelease}>Release Funds to Seller</Button>
                    <Button color="red" basoc onClick={this.onRefund}>Refund Funds to Buyer</Button>
                </div>
            </div>
        );
    }
}

export default EscrowContractIndex;