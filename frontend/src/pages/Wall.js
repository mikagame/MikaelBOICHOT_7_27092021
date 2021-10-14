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
    const[admin, setAdmin] = useState()
    let history = useHistory();
    let res = []
    let count = 0;
   

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;  
    
    useEffect(() => {
        // Récupération des Posts
        axios.get('http://localhost:3000/api/wall')
        .then(res => {setItems(res.data)})
        // Récupération des commentaires
        axios.get('http://localhost:3000/api/comment')
        .then(res => {
            setComs(res.data)
            
            
        })
        // Récupération du Username
        axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
        .then(res => {
            setName(res.data.username)
            setAdmin(res.data.isAdmin)
        }) 

    }, [])


    // Supprimer un Post
    const deletePost =(id) => {
        axios.delete(`http://localhost:3000/api/wall/${id}`)
        .then(res => window.location.reload())
    }

    const updatePost = (id) => {
        axios.put(`http://localhost:3000/api/wall/${id}`)
        .then(res => window.location.reload())

    }

    // Afficher un seul Post
    const showPost = (id) => {history.push(`/wall/${id}`)}

   
    function stopEvent(ev) {ev.stopPropagation()}
    console.log(cookies)
   

    return (
        <> 
            <HeaderWall />
            <div className="createPost">
                <div className="welcome">Hello {name}</div>   
            </div>
            <div id="bodyWall"> 

                    {items && items.map(item => (
                   
            <div key={item.id} className="post" onClick={() => {showPost(item.id)}}>      

                <p>Auteur du post: {item.username}</p>

                <LikeDislike />
                <div className="thing">
                    <img src={item.imgUrl} />
                </div> 
                {item.post}
                {coms && coms.map(com => {              
                    if(com.postId == item.id) {
                        
                        return(<div ></div>) 
                        
                    }}                                     
                )}
                <i className="far fa-comment"></i>              
                Commentaire(s) ({nbrCom}) 
                <div className="btnPost">
                    {((item && item.userId) == cookies.id || admin)?<button  className="btnPut" onClick={(e) => {{deletePost(item.id)};stopEvent(e)}}>Modifier le post</button> :null}
                    {((item && item.userId) == cookies.id || admin)?<button className="btnDel" onClick={(e) => {{updatePost(item.id)};stopEvent(e)}}>Supprimer le post</button> :null}
                </div>
            </div>      
                    ))} 
                      
            </div>
            <PostWall />  
        </>
    );
};

export default Wall;