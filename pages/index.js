import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from 'semantic-ui-react';

class EscrowIndex extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <h3>Escrow Accounts</h3>
                    <Link href="/escrowAccounts/new">
                        <a><Button floated="right" content="Create an Escrow Contract" icon="add circle" primary /></a>
                    </Link>
                </div>
            </Layout>
        );
    }
}

export default EscrowIndex;