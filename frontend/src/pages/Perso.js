
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';



const Perso = () => {

    const [com, setCom] = useState()

    function affiche(data)  {
        data.forEach(e => {
            console.log(e.comment)
           
        })
    }
    
   

    axios.get('http://localhost:3000/api/wall')
    .then(res =>  {
        //console.log(res.data); 
        affiche(res.data);
        //console.log(res.data[2].comment)
        setCom (res.data[2].comment)
        
    })
    .catch(err => console.log(err))

    /*useEffect(() => {
        document.title= `bonjour ${com}`  
    })*/

    return (
        <>
        
            <div className="perso">
                <div className="pe">
                    {com}
                </div>
                <div className="pe">
                    {com}
                </div>
           
           </div>
        <Footer />
        </>
        
      
        
        
    );
};

export default Perso;