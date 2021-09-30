import React, { Component } from 'react';

class ShowEscrowAccounts extends Component {
    state = { dataKey: null };

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.EscrowFactory;
        // let drizzle know we want to watch the 'deployedEscrowContracts' method
        const dataKey = contract.methods["getDeployedEscrowContracts"].cacheCall();
        // save the 'dataKey' to local component state for later reference
        this.setState({ dataKey });
    }

    renderEscrowContracts(escrowContracts) {
        if (!!escrowContracts) {
            // return escrowContracts.map(() => {
            //     return (
            //         <tr>
            //             <td>address</td>
            //             <td>View Contract</td>
            //         </tr>
            //     );
            // });
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