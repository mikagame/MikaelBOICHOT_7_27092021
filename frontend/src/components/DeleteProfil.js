import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const DeleteProfil = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token','isLog', 'id'])
    
  
    let user = cookies.id

    console.log(user)
   

    const deleteUser = () => {

        axios.delete(`http://localhost:3000/api/auth/${user}`)
        .then(res => window.location.reload())
    }


    return (
        <div className="deleteAccount">
            <NavLink exact to="/" activeClassName="nav-active" onClick={() => {deleteUser()}}>
                Supprimer mon compte
            </NavLink>
        </div>
    );
};

export default DeleteProfil;