import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const PostWall = () => {

    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const { register, handleSubmit, formState: { errors } } = useForm();
 
    const onSubmit = (donnees)  =>  {
       
        const formData = new FormData()
        formData.append("post", donnees.post)        // post de l'utilisateur
        formData.append("id", cookies.id)            // userId
        formData.append("image", donnees.imgUrl[0])  //image pour multer
        console.log(formData)

        axios.post('http://localhost:3000/api/wall', formData )
        .then(() =>  window.location.reload())
        .catch(err => (err)) 
    }
   

     return (
    <div className="postWall">
        <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} />
            <input type="file" {...register("imgUrl")}/>
            <input type="submit" />
        </form>
    </div>   
    );

   





};

export default PostWall;