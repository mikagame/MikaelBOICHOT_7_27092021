import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';

const Navigation = () => {
    return (
        <div className="navigation">
            <Logo />
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/signup" activeClassName="nav-active">
                Signup
            </NavLink>
            <NavLink exact to="/login" activeClassName="nav-active">
                Login
            </NavLink>
            
        </div>
    );
};

export default Navigation;