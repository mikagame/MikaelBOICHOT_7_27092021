import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import HeaderWall from '../components/HeaderWall';
import Comment from '../components/Comment';

const WallComponent = () => {

    const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);
  const[info, setInfo] = useState()
    const[assoCom, setAssoCom] = useState()
  const [coms, setComs] = useState();
let urlParams = useParams();
console.log(urlParams.id)

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;  
useEffect(() => {
    axios.get(`http://localhost:3000/api/wall/${urlParams.id}`)
    .then(res => {
        console.log(res.data)
        setInfo(res.data)
    }
        )
        axios.get('http://localhost:3000/api/comment')
        .then(res => {
          setComs(res.data)
            console.log(res.data)
        })
        axios.get(`http://localhost:3000/api/wall/assoc/${urlParams.id}`)
        .then(res => setAssoCom(res.data))
     
}, [])
console.log(assoCom)
console.log(info)
    return (
        <>
            {assoCom && assoCom.map(item => (
              <div key={item.id} id={item.id} >
                  {item.comment}
              </div>
            ))}
               <Comment />
             
            

        </>
    );
};

export default WallComponent;