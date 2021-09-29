import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = props => {
    return (
        <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <Header />
            {props.children}
        </Container>
    );
}

export default Layout;