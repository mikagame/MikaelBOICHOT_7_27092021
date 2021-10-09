import React from 'react';
import DeleteProfil from './DeleteProfil';
import Logout from './Logout';

const HeaderWall = () => {
    return (
        <header id="headerWall">
            <img src="./img/logoGroup.png" />
            <Logout />
            <DeleteProfil />
        </header>
    );
};

export default HeaderWall;