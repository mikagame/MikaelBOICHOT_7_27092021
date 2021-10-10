import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const Comment = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])

    const [postId, setPostId] = useState()

    const onSubmit = donnees =>  {
   
    const envoie = {...donnees, idUser: cookies.id , postId: postId}

    axios.post('http://localhost:3000/api/comment', envoie)
    .then( res => {console.log(res.data)})
    .catch(err => (err)) 
    
    
    }
    return (

        <form id="sayForm" onSubmit={handleSubmit(onSubmit)}>
          <input id="textComment" type="text" placeholder="Dire quelquechose" {...register("comment", {required: true, min: 1000})} />
          <input type="submit"  />
        </form>
    );
};

export default Comment;