import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';


const Navbar = () => {
    return (
        <AppBar position='sticky' color='default' className='navbar'>
            <Toolbar>
                <Link to='/'>
                    <Button>Accueil</Button>
                </Link>
                <Link to='/calendrier'>
                    <Button>Calendrier</Button>
                </Link>
                <Link to='/admin' style={{ marginLeft: 'auto' }}>
                    <Button>Admin</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
