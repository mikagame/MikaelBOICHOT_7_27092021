import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Accueil = () => {
    return (
        <div className="home">
            <Header />
            <div id="wall">
            <img src="./img/bgHome.png" alt="logo" />
            </div>
           <div className="footerHome">
               <img src="./img/footer.png" alt="logo-footer" />
           </div>
        </div>
    );
};

export default Accueil;