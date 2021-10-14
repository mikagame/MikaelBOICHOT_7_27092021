import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import Comment from '../components/Comment';

const WallComponent = () => {

    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
    const[info, setInfo] = useState()
    const[assoCom, setAssoCom] = useState()
    const [coms, setComs] = useState();
    const [name, setName] = useState();
    const [admin, setAdmin] = useState();

    let urlParams = useParams();
   

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;

    useEffect(() => {
    axios.get(`http://localhost:3000/api/wall/${urlParams.id}`)
    .then(res => {
        
        setInfo(res.data)
        
    }
        )
        axios.get('http://localhost:3000/api/comment')
        .then(res => {
          setComs(res.data)
           
        })
        axios.get(`http://localhost:3000/api/wall/assoc/${urlParams.id}`)
        .then(res => {
            setAssoCom(res.data)
           
        })
        axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
        .then(res => {
            setName(res.data.username)
            setAdmin(res.data.isAdmin)
        }) 
        
}, [])

    return (
        <>
        <header className="wallCom">
          
            <img src=".././img/logoGroup.png" alt="logo"/>
        <h1>Hello {name}</h1>
        <a href="/wall" id="backHome"><i class="fas fa-arrow-circle-left"></i>Back</a>
        </header>
        <div className="one">

        <div className="oneArticle">
        <h1>{info && info.post}</h1>
         
            <img src={info&& info.imgUrl} alt="imgPost" />
        </div> 
            <div id="zoneComment" className="zoneComment">
            {assoCom && assoCom.map(item => (
              <div key={item.id} id={item.id} className="zoneComment">
                  <p>{item.username} :  {item.comment} </p>
              </div>
            ))}
            </div>
                <div className="postComment">
                <Comment id={urlParams.id} />
                </div>
        </div>
        </>
    );
};

export default WallComponent;