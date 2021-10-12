import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import PostWall from '../components/PostWall';
import { useState, useEffect } from 'react';
import HeaderWall from '../components/HeaderWall';
import LikeDislike from '../components/LikeDislike';
import Comment from '../components/Comment';
import { useHistory } from 'react-router';


const Wall = () => {
    
    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
    const [items, setItems] = useState();
    const [coms, setComs] = useState();
    const [name, setName] = useState();
    const[nbrCom, setNbrCom] = useState(0)
    const [idWall, setIdWall]=  useState(0)
    const[assoCom, setAssoCom] = useState()
    const[count, setCount] = useState()
    let history = useHistory();
  
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;  
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/wall')
        .then(res => {setItems(res.data)})
        
        axios.get('http://localhost:3000/api/comment')
        .then(res => {
            setComs(res.data)
            setNbrCom(res.data.length)
        })
        axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
        .then(res => {setName(res.data.username)}) 
    }, [])

    const deletePost =(id) => {
        axios.delete(`http://localhost:3000/api/wall/${id}`)
        .then(res => window.location.reload())
    }
    const showPost = (id) => {history.push(`/wall/${id}`)}
   
    function stopEvent(ev) {ev.stopPropagation()}

    return (
        <> 
            <HeaderWall />
            <div className="createPost">
                <div className="welcome">Hello {name}</div>   
            </div>
            <div id="bodyWall"> 

                    {items && items.map(item => (
                        
            <div key={item.id} className="post" onClick={() => {showPost(item.id)}}>        
                {item.post}
                <LikeDislike />
                <div className="thing">
                    <img src={item.imgUrl} />
                </div> 
                {coms && coms.map(com => {              
                    if(com.postId == item.id) {
                        return(<div></div>) 
                    }}                                     
                )}
                <i className="far fa-comment"></i>              
                Commentaire(s) ({nbrCom}) 
                <button id="del" className="btnDelete" onClick={(e) => {{deletePost(item.id)};stopEvent(e)}}>supprimer le post</button>                 
            </div>      
                    ))}  
            </div>
            <PostWall />  
        </>
    );
};

export default Wall;