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
    const[ess, setEss] = useState()
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
        .then(res => {setName(res.data.username)}) 

    }, [])


    // Supprimer un Post
    const deletePost =(id) => {
        axios.delete(`http://localhost:3000/api/wall/${id}`)
        .then(res => window.location.reload())
    }

    // Afficher un seul Post
    const showPost = (id) => {history.push(`/wall/${id}`)}

   
    function stopEvent(ev) {ev.stopPropagation()}
    console.log(items)
    console.log(coms)

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

                <p>Auteur du post: {item.username}</p>

                <LikeDislike />
                <div className="thing">
                    <img src={item.imgUrl} />
                </div> 
                {coms && coms.map(com => {              
                    if(com.postId == item.id) {
                        
                        return(<div ></div>) 
                        
                    }}                                     
                )}
                <i className="far fa-comment"></i>              
                Commentaire(s) ({nbrCom}) 
                <div className="btnPost">
                    {(item && item.userId) == cookies.id?<button  className="btnPut" >Modifier le post</button> :null}
                    {(item && item.userId) == cookies.id?<button className="btnDel" onClick={(e) => {{deletePost(item.id)};stopEvent(e)}}>Supprimer le post</button> :null}
                </div>
            </div>      
                    ))} 
                      
                        {/*<button id="del" className="btnDelete" onClick={(e) => {{deletePost(it.id)};stopEvent(e)}}>Supprimer le post</button> 
                        <button id="del" className="btnModif" >Modifier le post</button> */}
                         

               

            </div>
            <PostWall />  
        </>
    );
};

export default Wall;