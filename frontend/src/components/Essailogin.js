import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';



const Essailogin= () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = donnees =>  axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth/login',
      data: donnees

  })
  .then( //res => {console.log(res)}
  
 )
  .catch(err => (err)) 
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Password" {...register("password", {required: true, min: 3})} />

      <input type="submit" />
    </form>
  );
}

export default Essailogin;