import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies} from "react-cookie";
import DeleteProfil from './DeleteProfil';

const PostWall = () => {

    const [cookies, setCookie] = useCookies(['token','isLog', 'id'])
    const [name, setName] = useState();
    const [essai, setEssai] = useState()
    const[admin, setAdmin] = useState()

    const { register, handleSubmit, formState: { errors } } = useForm();

    let elt = document.getElementById("imgChoice")

    axios.get(`http://localhost:3000/api/auth/${cookies.id}`)
    .then(res => {
        setName(res.data.username)
        setAdmin(res.data.isAdmin)
    }) 

  
      /*  const onSubmit =   (donnees)  =>  {

            const formData = new FormData()
            formData.append("post", donnees.post)        // post de l'utilisateur
            formData.append("id", cookies.id)            // userId
            formData.append("image", donnees.imgUrl[0]) // image
            formData.append("username", name)  
            console.log(formData)

            axios.post('http://localhost:3000/api/wall', formData )
            .then(() => window.location.reload())
            .catch(err => (err)) 
        }*/

        const onSubmit  =   (donnees)  =>   {

            if(elt.checked) {
            const formData = new FormData()
            formData.append("post", donnees.post)        // post de l'utilisateur
            formData.append("id", cookies.id)            // userId
            formData.append("image", donnees.imgUrl[0]) // image
            formData.append("username", name)  
            console.log(formData)
            
            axios.post('http://localhost:3000/api/wall', formData )
            .then(() => {
                window.location.reload()
               
            })
            .catch(err => (err)) 
        } else {
           
            axios.post('http://localhost:3000/api/wall/sans', {...donnees, "id": cookies.id, "username": name} )
            .then(() => {
                window.location.reload()
                
            })
            .catch(err => (err) )
        }
        }






const image =() =>{
           
            if(elt.checked ) {
                setEssai(<input  type="file" {...register("imgUrl")}/>)

            }else {
                setEssai("")
            }
}

     return (
    <div className="postWall">
        <form onSubmit={handleSubmit(onSubmit)} >
            <label className="lab" htmlFor="textareaWall">Poster ?<textarea id="textareaWall" type="text" placeholder="Poster quelquechose" {...register("post", {required: true, min: 1000})} /></label>
            <div className="choice">

                <label htmlFor="imgChoice">
                    Ajouter une image ? 
                    <input id="imgChoice"  type="checkbox"  onClick={() =>image()} /> 
                   
                </label>
                {essai}
                
            </div>
            <button  type="submit">Envoyer</button>
        </form>

        
        {(!admin)?<DeleteProfil />:null}
    </div>   
    );

};

export default PostWall;