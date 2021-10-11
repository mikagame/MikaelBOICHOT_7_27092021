import React from 'react';
import DeleteProfil from './DeleteProfil';
import Logout from './Logout';

const HeaderWall = () => {
    return (
        <header id="headerWall">
            <img src="./img/logoGroup.png" />
        <div className="ddd">
            <Logout />
            <DeleteProfil />
        </div>
        </header>
    );
};

export default HeaderWall;