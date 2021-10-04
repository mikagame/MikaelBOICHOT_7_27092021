import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';


const Essailogin = () => {

      let history = useHistory();

      const [cookies, setCookies] = useCookies();
      const { register, handleSubmit, formState: { errors } } = useForm();

      const onSubmit = donnees =>  axios({
          method: 'post',
          url: 'http://localhost:3000/api/auth/login',
          data: donnees,  
      })
      
      .then( res => {
         let token = res.data;
        console.log(res.data)
        setCookies('Token', res.data)
        console.log(cookies.Token)
          if(!token ) {
            history.push('/login')
            
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