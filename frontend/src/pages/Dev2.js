import  { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

const Dev2 = () => {
    //const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);

    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = donnees =>  axios({
        method: 'post',
        url: 'http://localhost:3000/api/dev',
        data: donnees,  
    })
    
    .then( res => {
      console.log(res.data)
      }
    )
    .catch(err => (err)) 
    console.log(register())


    return (
        <div>
             <form id="formPostDev" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="send">Poster votre : </label>
                <input  name="send"   type="file" {...register("imgUrl")}/>
                <input type="submit" />
            </form>
            
        </div>
    );
};

export default Dev2;