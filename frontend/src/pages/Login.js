import React from 'react';
import Essailogin from '../components/Essailogin';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CookiesProvider} from 'react-cookie';


const Login = () => {
    return (
        <div className="login">
            <CookiesProvider>
            <Header />
            
            <Essailogin />
            
            <Footer />
            </CookiesProvider>
        </div>
    );
};

export default Login;