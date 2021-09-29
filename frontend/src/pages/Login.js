import React from 'react';
import Header from '../components/Header';


const Login = () => {
    return (
        <div className="login">
            <Header />
            <form>
                <label htmlFor="email">E-mail :</label>
                <input type="email" id="email" name="email"/>
                
                <label htmlFor="userName">Username :</label>
                <input type="text" id="userName" name="userName"/>
                
                <label htmlFor="password">Password :</label>
                <input type="text" id="password" name="password"/>
                
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;