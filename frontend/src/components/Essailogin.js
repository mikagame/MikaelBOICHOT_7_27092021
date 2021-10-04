import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


const Essailogin= () => {

      let history = useHistory();

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = donnees =>  axios({
          method: 'post',
          url: 'http://localhost:3000/api/auth/login',
          data: donnees,  
      })
      
      .then( 
        res => {
          let token = res.data;
          console.log(token);
          if(!token) {
            history.push('/')
          } 
          else {
            history.push('/perso')
          }
        }
         
    )
      .catch(err => (err)) 
      //console.log(errors);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Password" {...register("password", {required: true, min: 3})} />
      <input type="submit"  />
    </form>
  );
}

export default Essailogin;