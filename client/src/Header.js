import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link to="/"><a className="item">Home</a></Link>

            <Menu.Menu position="right">
                <Link to="/escrowAccounts/new"><a className="item">+</a></Link>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;