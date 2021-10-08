import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const PostWall = () => {

    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const { register, handleSubmit, formState: { errors } } = useForm();
 
    const onSubmit = donnees  =>  
    axios.post('http://localhost:3000/api/wall', {...donnees, "id": cookies.id})
    
    .then( res => {
      console.log(res.data)   
      }
  )
    .catch(err => (err)) 

     return (
    <div className="postWall">
        <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} />
            <input type="file" {...register("imgUrl")}/>
            <input type="submit" />
        </form>
    </div>   
    );



};

export default PostWall;