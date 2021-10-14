import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import PostWall from '../components/PostWall';
import { useState, useEffect } from 'react';
import HeaderWall from '../components/HeaderWall';
import LikeDislike from '../components/LikeDislike';
import Comment from '../components/Comment';
import { useHistory } from 'react-router';
import PostWallUpdate from '../components/PostWallUpdate';

const Wall = () => {
    
    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
    const [items, setItems] = useState();
    const [coms, setComs] = useState();
    const [name, setName] = useState();
    const[nbrCom, setNbrCom] = useState(0)
    const[admin, setAdmin] = useState()
    const[formUpdate, setFormUpdate] = useState(<PostWall />)

    let history = useHistory();
    
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

    const showUpdate = (id) => {
setFormUpdate(<PostWallUpdate id={id}/>)

    }

    // Afficher un seul Post
    const showPost = (id) => {history.push(`/wall/${id}`)}

    function stopEvent(ev) {ev.stopPropagation()}
    
    return (
        <> 
            <HeaderWall />
            <div className="createPost">
                <div className="welcome"><h1>Hello {name}</h1></div>   
            </div>
            <div id="bodyWall"> 

                    {items && items.map(item => (
                   
            <div key={item.id} className="post" onClick={() => {showPost(item.id)}}>      

                <p>Auteur du post: {item.username}</p>

                <LikeDislike />
                <div className="thing">
                    <img src={item.imgUrl} alt="imgPost" />
                </div> 
                {item.post}
                {coms && coms.map(com => {              
                    if(com.postId == item.id) {
                        
                        return(<div ></div>) 
                        
                    }}                                     
                )}
                <i className="far fa-comment"></i>              
                Commentaire(s) () 
                <div className="btnPost">
                    {((item && item.userId) == cookies.id || admin)?<button  className="btnPut" onClick={(e) => {{showUpdate(item.id)};stopEvent(e)}}>Modifier le post</button> :null}  {/*{updatePost(item.id)}*/}
                    {((item && item.userId) == cookies.id || admin)?<button className="btnDel" onClick={(e) => {{deletePost(item.id)};stopEvent(e)}}>Supprimer le post</button> :null}
                </div>
                
            </div>      
                    ))} 
                      
            </div>
           
            
            {formUpdate}
        </>
    );
};

export default Wall;