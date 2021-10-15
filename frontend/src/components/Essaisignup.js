
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useCookies} from "react-cookie";

const Essaisignup= () => {

  let history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = donnees =>  {

      axios.post('http://localhost:3000/api/auth/signup', donnees)
    .then( () => {
      setForm("Félicitation vous avez créé votre profil")
      function  x() {history.push('/login')} 
       setTimeout( x, 3000 )
    })          
    .catch( err => {
      if (err) {
        setForm(err.response.data.message)
        function  x() {setForm(formulaire)} 
       setTimeout( x, 3000 )
      }
      
    })
      
  }
  const formulaire = (<form id="formSignup" onSubmit={handleSubmit(onSubmit)}>

  <label htmlFor="email">email: <input id="email" type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} /></label>
  <label htmlFor="username">username: <input id="username" type="text" placeholder="Username" {...register("username", {required: true, min: 3, maxLength: 100})} /></label>
  <label htmlFor="password">password: <input id="password" type="password" placeholder="Password" {...register("password", {required: true, min: 5})} /></label>

  <input type="submit" value="Envoyer" />
 
</form>)



  const[form, setForm] = useState( formulaire)
  

  return (
    <div className="formS">
    {form}
    </div>  
  );
}

export default Essaisignup;


