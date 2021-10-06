import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Layout = (props) => {


const [isLogged, setIsLogged] = useState(false);

axios.defaults.baseURL = 'http://localhost:3000/api';
//axios.defaults.headers.common['Authorization'] = ;




useEffect(() => {
    axios.post('/ping')
    .then(res => {
        setIsLogged(res.data)
        
    })
}, [])


if(isLogged){
    return (
        <div>
            hello world
        </div>
    );
}
else {
    return (
        <div>
            Loupé
        </div>
    )
}
    
};

export default Layout;