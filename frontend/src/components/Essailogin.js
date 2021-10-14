import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useCookies} from "react-cookie";

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
          .catch(err => (err)) 
 
      }
   
     
  return (
    <form id="formLogin" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">email: <input name="email" type="email" placeholder="E-mail" {...register("email", {required: true, maxLength: 80})} /></label>
     

      <label htmlFor="password">password: <input name="password" type="password" placeholder="Password" {...register("password", {required: true, min: 3})} /></label>

      <input type="submit"  />
    </form>
  );
}

export default Essailogin;