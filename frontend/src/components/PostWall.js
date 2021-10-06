import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const PostWall = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = donnees =>  axios({
        method: 'post',
        url: 'http://localhost:3000/api/wall',
        data: donnees,  
    })
    
    .then( res => {
      console.log(res.data)
      
       
      }
 
  )
    .catch(err => (err)) 

    return (
    <div className="postWall">
 <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} />
      <input type="submit"  />
    </form>
    </div>
   
            
       
    );
};

export default PostWall;