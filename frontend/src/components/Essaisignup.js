
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useCookies} from "react-cookie";

const Essaisignup= () => {

  let history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = donnees =>  axios.post('http://localhost:3000/api/auth/signup', donnees)
  .then(history.push('/login')) 
  .catch(err => (err)) 
  console.log(errors);

  return (
    <form id="formSignup" onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="email">email: <input id="email" type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} /></label>
      <label htmlFor="username">username: <input id="username" type="text" placeholder="Username" {...register("username", {required: true, min: 3, maxLength: 100})} /></label>
      <label htmlFor="password">password: <input id="password" type="password" placeholder="Password" {...register("password", {required: true, min: 3})} /></label>

      <input type="submit" value="Envoyer" />
    </form>
  );
}

export default Essaisignup;


