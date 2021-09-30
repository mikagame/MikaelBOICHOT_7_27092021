import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';


const Login = () => {
    return (
        <div className="login">
           
            <Header />
            <form>
                <label htmlFor="email">E-mail :</label>
                <input type="email" id="email" name="email"/>
                
                <label htmlFor="password">Password :</label>
                <input type="text" id="password" name="password"/>
                
                <button>Login</button>
            </form>
            <Footer />
        </div>
    );
};

export default Login;