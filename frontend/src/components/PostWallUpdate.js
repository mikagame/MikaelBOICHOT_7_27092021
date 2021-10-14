import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";

const PostWallUpdate = (props) => {
    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const [name, setName] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();




    axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
    .then(res => {setName(res.data.username)}) 

        const onSubmit = (donnees)  =>  {
            const formData = new FormData()
            formData.append("post", donnees.post)        // post de l'utilisateur
            formData.append("id", cookies.id)            // userId
            formData.append("image", donnees.imgUrl[0])//image pour multer
            formData.append("username", name)  
            formData.append("postId", props.id)
            console.log(formData)
    
            axios.put(`http://localhost:3000/api/wall/${props.id}`, formData )
            .then(() => window.location.reload())
            .catch(err => (err)) 
        }

console.log(props.id)
     return (
    <div className="postWall" id="postWallUpdate">
        <form onSubmit={handleSubmit(onSubmit)} >
            <textarea type="text" placeholder="Modifier votre poste" {...register("post", {required: true, min: 1000})} />
            <input type="file" {...register("imgUrl")}/>
            <button id="modif" type="submit">Modifier</button>
        </form>
    </div>   
    );

};

export default PostWallUpdate;