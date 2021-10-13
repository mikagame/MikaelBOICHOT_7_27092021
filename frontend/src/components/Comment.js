import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const Comment = (props) => {
console.log(props.id)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const [name, setName] = useState();
    const [postId, setPostId] = useState()

    axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
    .then(res => {setName(res.data.username)}) 

    const onSubmit = donnees =>  {
   
    const envoie = {...donnees, idUser: cookies.id, postId: props.id, username: name}

    axios.post('http://localhost:3000/api/comment', envoie)
    .then( () => document.location.reload())
    .catch(err => (err)) 
    
    
    }
    return (

        <form id="sayForm" onSubmit={handleSubmit(onSubmit)}>
          <textarea id="textComment" type="textarea" placeholder="Dire quelquechose" {...register("comment", {required: true, min: 1000})} />
          <input type="submit"  />
        </form>
    );
};

export default Comment;