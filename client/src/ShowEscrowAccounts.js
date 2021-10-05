import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

class ShowEscrowAccounts extends Component {
    state = { dataKey: null };

    componentDidMount() {
        const { drizzle } = this.props;
        const escrowFactory = drizzle.contracts.EscrowFactory;
        // let drizzle know we want to watch the 'deployedEscrowContracts' method
        const dataKey = escrowFactory.methods.getDeployedEscrowContracts.cacheCall();
        // save the 'dataKey' to local component state for later reference
        this.setState({ dataKey });
    }

    renderEscrowContracts(escrowContracts) {
        if (!!escrowContracts) {
            const items = escrowContracts.value.map((address) => {
                return {
                    header: address,
                    description: (
                        <Link to="/">View Escrow Contract</Link>
                    ),
                    fluid: true
                };
            });
            return <Card.Group items={items} />
        }
    }

    render() {
        // get the contract state from the drizzleState
        const { EscrowFactory } = this.props.drizzleState.contracts;
        // using the save 'dataKey', get the variable we're interested in
        const escrowContracts = EscrowFactory.getDeployedEscrowContracts[this.state.dataKey];
        // if it exists, then we display its value
        return (
            <div>
                <h2 id='title'>Escrow Contracts</h2>
                <table id='escrowContracts'>
                    <tbody>
                        {this.renderEscrowContracts(escrowContracts)}
                    </tbody>
                </table>
                <a></a>
            </div>
        );
    }
}

export default ShowEscrowAccounts;