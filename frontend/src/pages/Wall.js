import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';

import PostWall from '../components/PostWall';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Logo from '../components/Logo';



const Wall = () => {

   
    const[cookies, setCookie] = useCookies(['token', 'isLog']);

    console.log('le token est : ' + cookies.token)
    //console.log(cookies.token)
    console.log('le isLogged est : ' + cookies.isLog)

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;
    
    const [items, setItems] = useState();
    const [coms, setComs] = useState();
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/wall')
        .then(res => {
            setItems(res.data)
        })

        axios.get('http://localhost:3000/api/comment')
        .then(res => {
            setComs(res.data)
        })

        /*axios.get(`http://localhost:3000/api/auth/${}`)
        .then(res => {
            console.log(res)
        })*/

    }, [])

   




    return (
        <>
            <Logo />
            <PostWall />
          
            <div id="bodyWall">
                
            {items && items.map(item => (
                <div key={item.id} className="post">
                    {item.post}
                    <div className="com">
                    {coms && coms.map(com => (
                        <div key={com.id } >
                            {com.comment}
                        </div>
                    ))}
                    </div>

                    <div className="say">
                    <Comment />
                    </div>
                </div>
            ))}
            
            </div>
            <Footer />
           
         
           
        </>
    );
};

export default Wall;