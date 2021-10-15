import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useCookies} from "react-cookie";
import { useState } from 'react';

const Essailogin = () => {

      let history = useHistory();
      const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
      const { register, handleSubmit, formState: { errors } } = useForm();

      const onSubmit = donnees =>  {

          axios.post('http://localhost:3000/api/auth/login', donnees)
          .then( res => {
            const TOKEN = res.data.token;
            const ISLOG = res.data.isLogged;
            const ID = res.data.id
            setCookie("token", TOKEN, { path: '/', sameSite: 'strict'})
            setCookie("isLog", ISLOG, { path: '/', sameSite: 'strict'})
            setCookie("id", ID, {path: '/', sameSite: 'strict'})
            history.push('/wall')
            })
            .catch(err => {if(err){
              setForm(err.response.data.error)
              function  x() {setForm(formulaire)} 
              setTimeout( x, 3000 )
            }})
      }

    const formulaire = ( <form id="formLogin" onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="email">email: <input id="email" type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} /></label>
    <label htmlFor="password">password: <input id="password" type="password" placeholder="Password" {...register("password", {required: true, min: 5})} /></label>
    <input type="submit"  value="Envoyer"/>
  </form>)

  const [form, setForm] = useState(formulaire)
   
     
  return (
    <div className="formS">
      {form}
    </div>
  );
}

export default Essailogin;