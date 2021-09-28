import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class EscrowAccountNew extends Component {
    state = {
        buyerAddress: '',
        escrowAccountAddress: '',
        sellerAddress: '',
        errorMessage: '',
        loading: false
    }

    render() {
        return (
            <Layout>
                <h3>Create an Escrow Contract</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Buyer Address</label>
                        <Input value={this.state.buyerAddress} onChange={event => this.setState({ buyerAddress: event.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Escrow Account Address</label>
                        <Input value={this.state.escrowAccountAddress} onChange={event => this.setState({ escrowAccountAddress: event.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Seller Account Address</label>
                        <Input value={this.state.sellerAddress} onChange={event => this.setState({ sellerAddress: event.target.value })} />
                    </Form.Field>

                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary></Button>
                </Form>
            </Layout>
        );
    }

}

export default EscrowAccountNew;