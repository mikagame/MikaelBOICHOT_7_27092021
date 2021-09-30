import React from 'react';
import { NavLink } from 'react-router-dom';
import { Clock } from './Clock';

const Navigation = () => {
    return (
        <div className="navigation">
            <Clock />
            <div>
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
           
            
        </div>
    );
};

export default Navigation;