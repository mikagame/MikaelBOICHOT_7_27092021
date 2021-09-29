import React from 'react';
import Navigation from '../components/Navigation';


const Signup = () => {
    return (
        <div className="signup">
             <Navigation />
            <h1>Signup</h1>
            <form>
                <label htmlFor="email">E-mail :</label>
                <input type="email" id="email" name="email"/>
                
                <label htmlFor="userName">Username :</label>
                <input type="text" id="userName" name="userName"/>
                
                <label htmlFor="password">Password :</label>
                <input type="text" id="password" name="password"/>
                
                <button>Signup</button>
            </form>
        </div>
    );
};

export default Signup;