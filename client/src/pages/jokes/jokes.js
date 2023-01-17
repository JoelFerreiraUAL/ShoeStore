import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
export const JokesPage = () => {
const[joke,setJoke]=useState("");
const[disableButton,setdisableButton]=useState(false);

async function getJoke(){
    setdisableButton(true)
    const result = await fetch("http://localhost:3001/api/jokes")
    const joke=await result.json();
    console.log(joke.value)
    setJoke(joke.value)
    setdisableButton(false)
}
  return (
    <>
        <div className="row d-flex ">
            <div className="col d-flex justify-content-center">
                <h3> Está pagina vai apresentar piadas de dev  joke norris</h3>
            </div>
        </div>
        {joke!=="" && <>
        
            <div className="row mt-3">
                <div  className="col d-flex justify-content-center">
                    <h2>{joke}</h2>
                </div>
            </div>
        </>

        }
        <div className="row mt-3">
            <div className="col d-flex justify-content-center ">
                <div>
                <button disabled={disableButton} onClick={getJoke} className='btn btn-dark'> Gerar Piada</button>
                </div>
                
            </div>
        </div>
    </>
  )
}
