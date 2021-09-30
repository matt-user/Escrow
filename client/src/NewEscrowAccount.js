import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

class NewEscrowAccount extends Component {
    state = {
        stackId: null,
        escrowAccountAddress: '',
        sellerAddress: '',
        fundAmount: ''
    };

    onSubmit = async (event) => {
        console.log(event);
        const { drizzle, drizzleState } = this.props;
        const escrowFactory = drizzle.contracts.EscrowFactory;

        // let drizzle know we want to call the createEscrow method with 'value'
        const stackId = escrowFactory.methods["createEscrow"].cacheSend(
            this.state.escrowAccountAddress,
            this.state.sellerAddress,
            {
                from: drizzleState.accounts[0],
                value: this.state.fundAmount
            }
        );

        this.setState({ stackId });
    }

    render() {
        return (
            <div>
                <h2>Create an Escrow Contract</h2>
                <Form onSubmit={this.onSubmit}>
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
                            value={this.state.sellerAddress}
                            onChange={event => this.setState({ sellerAddress: event.target.value })}
                        />
                    </Form.Field>

                    <Button primary>Create!</Button>
                </Form>
            </div>
        );
    }
}

export default NewEscrowAccount;