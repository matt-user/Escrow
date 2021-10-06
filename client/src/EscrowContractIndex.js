import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Message } from 'semantic-ui-react';
import Escrow from "./contracts/Escrow.json";
import web3 from './getWeb3';

class EscrowContractIndex extends Component {
    state = {
        action: false,
        loading: false,
        errorMessage: ''
    };

    onRelease = async () => {
        const { drizzleState } = this.props;
        const escrow = new web3.eth.Contract(Escrow.abi, this.props.address);
        this.setState({ loading: true, errorMessage: '' });
        try {
            await escrow.methods.releaseFunds().send({ from: drizzleState.accounts[0] });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false, action: true });
    }

    onRefund = async () => {
        const { drizzleState } = this.props;
        const escrow = new web3.eth.Contract(Escrow.abi, this.props.address);
        this.setState({ loading: true, errorMessage: '' });
        try {
            await escrow.methods.refundFunds().send({ from: drizzleState.accounts[0] });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false, action: true });
    }

    handleActions = () => {
        if (!!this.state.errorMessage) {
            return <Message error header="Error" content={this.state.errorMessage} />;
        }
        else if (this.state.action) {
            return <Redirect to="/" />;
        }
        return null;
    }

    render() {
        return (
            <div error={!!this.state.errorMessage}>
                <h2>Escrow Contract</h2>
                <h3>{this.props.match}</h3>
                <div>
                    <Button color="green" basic onClick={this.onRelease}>Release Funds to Seller</Button>
                    <Button color="red" basoc onClick={this.onRefund}>Refund Funds to Buyer</Button>
                </div>
                {this.handleActions()}
            </div>
        );
    }
}

export default EscrowContractIndex;