import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";
import DeleteProfil from './DeleteProfil';

const PostWall = () => {

    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const [name, setName] = useState();
    const [essai, setEssai] = useState()

    const { register, handleSubmit, formState: { errors } } = useForm();

    let elt = document.getElementById("imgChoice")

    axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
    .then(res => {setName(res.data.username)}) 

        const onSubmit = (donnees)  =>  {

            if(elt.checked) {
                console.log("check check")
            }
  
            const formData = new FormData()
            formData.append("post", donnees.post)        // post de l'utilisateur
            formData.append("id", cookies.id)            // userId
            formData.append("image", donnees.imgUrl[0]) // image
            formData.append("username", name)  
            console.log(formData)

            axios.post('http://localhost:3000/api/wall', formData )
            .then(() => window.location.reload())
            .catch(err => (err)) 
         
        }


const image =() =>{
           
            if(elt.checked == true) {
                setEssai(<input  type="file" {...register("imgUrl")}/>)

            }else {
                setEssai("")
            }
}

     return (
    <div className="postWall">
        <form onSubmit={handleSubmit(onSubmit)} >
            <textarea type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} />
            <div className="choice">

                <label htmlFor="imgChoice">
                    Ajouter une image ? 
                    <input id="imgChoice"  type="checkbox" value="hello"  onClick={() =>image()} /> 
                   
                </label>
                {essai}
                
            </div>
            <button  type="submit">Envoyer</button>
        </form>
        <DeleteProfil />
    </div>   
    );

};

export default PostWall;