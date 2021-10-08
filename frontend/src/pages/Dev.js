import  { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';


const Dev = () => {

const [select, setSelect] = useState('')

const[cookies, setCookie] = useCookies(['token', 'isLog', 'id']);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;

const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit = donnees =>  axios({
    method: 'post',
    url: 'http://localhost:3000/api/wall',
    data: donnees,  
})

.then( res => {
  console.log(res.data)
  }
)
.catch(err => (err)) 

    return (
        <>
            <form id="formTypeDev"> 
            <p>Choisir votre type de POST : </p>
                <label htmlFor="com">com</label>
                <input id="com" name="type" value="text" type="radio" onChange={(e) => {setSelect(e.target.value)}}/>

                <label htmlFor="img"  >img</label>
                <input id="img" name="type" value="file" type="radio" onChange={(e) => {setSelect(e.target.value)}}/>
              </form>

            <form id="formPostDev" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="send">Poster votre : </label>
                <input id={select} name="send"  placeholder={select} type={select} {...register("img")}/>
                <input type="submit" />
            </form>

            
            

           
        
      
        </>
    );
};

export default Dev;