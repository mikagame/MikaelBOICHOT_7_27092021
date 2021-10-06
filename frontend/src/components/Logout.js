import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Logout = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token','isLog', 'id'])
    //removeCookie('token', {path: '/wall'})
    return (
        <div className="logout">
            <NavLink exact to="/" activeClassName="nav-active">
                Logout
            </NavLink>
        </div>
    );
};

export default Logout;