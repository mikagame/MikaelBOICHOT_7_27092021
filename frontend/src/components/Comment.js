import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const Comment = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = donnees =>  axios({
        method: 'post',
        url: 'http://localhost:3000/api/comment',
        data: donnees,  
    })
    
    .then( res => {
      console.log(res.data)
      
       
      }
 
  )
    .catch(err => (err)) 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      
      
        <input type="text" placeholder="Dire quelquechose" {...register("comment", {required: true, min: 1000})} />
        <input type="submit"  />
      </form>
    );
};

export default Comment;