import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

class NewEscrowAccount extends Component {
    state = {
        stackId: null,
        escrowAccountAddress: '',
        sellerAddress: '',
        fundAmount: '',
        transactionStatus: '',
        loading: false
    };

    onSubmit = async (event) => {
        const { drizzle, drizzleState } = this.props;
        const escrowFactory = drizzle.contracts.EscrowFactory;

        this.setState({ loading: true, transactionStatus: '' });
        // let drizzle know we want to call the createEscrow method with 'value'\
        const stackId = escrowFactory.methods.createEscrow.cacheSend(
            this.state.escrowAccountAddress,
            this.state.sellerAddress,
            {
                from: drizzleState.accounts[0],
                gas: '3000000',
                gasPrice: '5000000000',
                value: web3.utils.toWei(this.state.fundAmount, 'ether')
            }
        );
        this.setState({ stackId, loading: false });
    }

    getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;
        // get the transaction hash using our saved 'stackId'
        const txHash = transactionStack[this.state.stackId];
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;
        return transactions[txHash];
        // otherwise return the transaction status
        //return `Transaction Status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    handleTxStatus = (tx) => {
        if (tx) {
            if (tx.status === 'error') {
                return <Message error header="Error" content={tx.error.message} />;
            } else if (tx.status === 'success') {
                return <Redirect to="/" />;
            }
        }
        return null;
    }

    render() {
        return (
            <div>
                <h2>Create an Escrow Contract</h2>
                <Form onSubmit={this.onSubmit} error={!!this.getTxStatus()}>
                    <Form.Field>
                        <label>Escrow Account Address</label>
                        <Input
                            value={this.state.escrowAccountAddress}
                            onChange={event => this.setState({ escrowAccountAddress: event.target.value })}
                        />
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Seller Address</label>
                        <Input
                            value={this.state.sellerAddress}
                            onChange={event => this.setState({ sellerAddress: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Fund Amount</label>
                        <Input
                            value={this.state.fundAmount}
                            onChange={event => this.setState({ fundAmount: event.target.value })}
                        />
                    </Form.Field>

                    {this.handleTxStatus(this.getTxStatus())}
                    <Button primary>Create!</Button>
                </Form>
            </div>
        );
    }
}

export default NewEscrowAccount;