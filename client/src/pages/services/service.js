import React, {  useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/context/user.context";
import { LoadingSpinner } from "../../components/loading-spinner/loading.spinner";

export const ServicePage = () => {
    const [isLoading,setIsLoading]=useState(true);
    const [services,setServices]=useState([]);
    const { user, setUser } = useContext(UserContext);
    useEffect(()=>{
      const init= async ()=>{
        await getData();
        setIsLoading(false);
      
      }
      init();
    },[])
  
     async function getData(){
      const response= await fetch("http://localhost:3001/api/services");
      const result= await response.json();
      setServices(result);
    }
    return (
     <>
  
      <div className="row">
          <div className="col d-flex justify-content-center">
              <h1>Serviços</h1>
          </div>
      </div>
      {isLoading && <>
      <div className="row mt-3">
        <div className="col d-flex justify-content-center">
        <LoadingSpinner/>
        </div>
      </div>
      </>
     }
      { !isLoading && <div className="row  mt-3 d-flex justify-content-center">
  
          {services.map((element,index)=>{
            return(<>
              <div key={index} className=" col-sm-3 col-lg-3 col-xl-2">
            <div className="card  w-100 ">
            <img className="card-img"  src={element.imgUrl} alt="" />
              <div className="card-body">
                <h6 className="card-title">{element.name}</h6>
                <div className="row mt-3">
                  <div className="col ">            
                  <b >{element.price}€</b>
                  </div>
                </div>
                <div className="row mt-3">
    
                  <div className="col d-flex justify-content-end">            
                 <Link to={`/services/${element.id}`} className="btn btn-dark ">Detalhes</Link>
                  </div>
                </div>
            
              </div>
              </div>  
          </div>
            </>)
  
          })}
  
      </div>}
     
     </>
    )
}
