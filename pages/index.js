import React, { Component } from 'react';

const EscrowFactory = artifacts.require('EscrowFactory');

class EscrowIndex extends Component {
    render() {
        return (
            <h3>Escrow Accpounts</h3>
        );
    }
}

export default EscrowIndex;