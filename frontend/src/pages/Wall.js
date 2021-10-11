import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import PostWall from '../components/PostWall';
import { useState, useEffect } from 'react';
import HeaderWall from '../components/HeaderWall';
import LikeDislike from '../components/LikeDislike';

const Wall = () => {
    
    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
    const [items, setItems] = useState();
    const [coms, setComs] = useState();
    const [name, setName] = useState();
    const[nbrCom, setNbrCom] = useState(0)
    const [idWall, setIdWall]=  useState([])
  

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;  
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/wall')
        .then(res => {
            setItems(res.data)
            console.log(res.data) 
            
        })
        axios.get(`http://localhost:3000/api/wall/${idWall}`)
        .then(res => {
            setItems(res.data)
            console.log(res.data) 
            
        })
        axios.get('http://localhost:3000/api/comment')
        .then(res => {
            setComs(res.data)
            console.log(res.data)
        })
        axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
        .then(res => {
            //console.log(res.data)
            setName(res.data.username)
        })
        
    }, [])
    console.log(idWall)
    return (
        <> 
            <HeaderWall />
            <div className="createPost">
                <div className="welcome">Hello {name}</div>   
            </div>
            <div id="bodyWall"> 

                    {items && items.map(item => (
                        <div key={item.id} id={item.id} className="post" onClick={(e) => {setIdWall(e.target.id)}}>
                            {item.post}
                        <LikeDislike />
                            
                                <div className="thing">
                                    <img src={item.imgUrl} />
                                </div> 
                                <i className="far fa-comment"></i>
                                Voir les commentaires ({nbrCom}) 

                                <button >supprimer le post</button>
                        </div>
                       
                    ))
                    }  
            </div>
            <PostWall />  
        </>
    );
};

export default Wall;