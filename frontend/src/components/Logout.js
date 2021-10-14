import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Logout = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token','isLog', 'id'])
    const removeToken = () => {
       setCookie("token", 0 )
    }


    return (
        <div className="logout">
            <NavLink exact to="/" activeClassName="nav-active" onClick={() => {removeToken()}}>
                Me déconnecter
            </NavLink>
        </div>
    );
};

export default Logout;