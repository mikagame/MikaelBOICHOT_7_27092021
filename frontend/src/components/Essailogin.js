import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useCookies} from "react-cookie";

const Essailogin = () => {

      let history = useHistory();

      const [cookies, setCookie] = useCookies(['token','isLog'])

      const { register, handleSubmit, formState: { errors } } = useForm();

      const onSubmit = donnees =>  axios({
          method: 'post',
          url: 'http://localhost:3000/api/auth/login',
          data: donnees
      })
      
      .then( res => {
        const TOKEN = res.data.token;
        console.log(res.data)
        const ISLOG = res.data.isLogged;
        //const ISLOGGED = res.data.isLogged;
        setCookie("token", TOKEN, { path: '/wall', sameSite: 'strict'})
        setCookie("isLog", ISLOG, { path: '/wall', sameSite: 'strict'})
          console.log(res.data)
            history.push('/wall')
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