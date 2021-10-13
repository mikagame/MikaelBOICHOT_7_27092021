import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const PostWall = () => {

    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const [name, setName] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
    .then(res => {setName(res.data.username)}) 

        const onSubmit = (donnees)  =>  {
            const formData = new FormData()
            formData.append("post", donnees.post)        // post de l'utilisateur
            formData.append("id", cookies.id)            // userId
            formData.append("image", donnees.imgUrl[0])
            formData.append("username", name)  //image pour multer
            console.log(formData)
    
            axios.post('http://localhost:3000/api/wall', formData )
            .then(() => window.location.reload())
            .catch(err => (err)) 
        }
     return (
    <div className="postWall">
        <form onSubmit={handleSubmit(onSubmit)} >
            <textarea type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} />
            <input type="file" {...register("imgUrl")}/>
            <button  type="submit">Envoyer</button>
        </form>
    </div>   
    );

   





};

export default PostWall;