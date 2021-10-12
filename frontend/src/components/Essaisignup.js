
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Username" {...register("username", {required: true, min: 3, maxLength: 100})} />
      <input type="password" placeholder="Password" {...register("password", {required: true, min: 3})} />

      <input type="submit" />
    </form>
  );
}

export default Essaisignup;


