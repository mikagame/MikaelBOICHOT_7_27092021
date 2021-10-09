import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import PostWall from '../components/PostWall';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Logo from '../components/Logo';
import Logout from '../components/Logout';
import HeaderWall from '../components/HeaderWall';

const Wall = () => {
    
  
    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
    const [items, setItems] = useState();
    const [coms, setComs] = useState();
    const [name, setName] = useState();

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;  
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/wall')
        .then(res => {
            setItems(res.data)
            console.log(res.data) 
        })

        axios.get('http://localhost:3000/api/comment')
        .then(res => {
            setComs(res.data)
        })

        axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
        .then(res => {
            //console.log(res.data)
            setName(res.data.username)
        })

    }, [])


    return (
        <>
            <HeaderWall />

            <div className="createPost">
                <div className="welcome">Hello {name}</div>
                
            </div>
                

            <div id="bodyWall">
                
            {items && items.map(item => (
                <div key={item.id} className="post">

                    
                    {item.post}
                    <img src={item.imgUrl} />
                    

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
            <PostWall />
           
         
           
        </>
    );
};

export default Wall;