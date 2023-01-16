import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";

export const ServiceDetail = ({addToCart}) => {
    const { id } = useParams();
    const navigate= useNavigate();
    const [service,setService]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const [quantity,setQuantity]=useState(1);
    useEffect( ()=>{
      const getInitialData = async ()=>{
        await getData();
        setIsLoading(false);
      }
      getInitialData();
    },[])
    async function getData(){
      const result= await fetch(`http://localhost:3001/api/services/${id}`)
      const service= await result.json();
      if(service.id){
        setService(service)
      }else{
        navigate("/services")
      }
    }
  
    return (
     <>{!isLoading &&
      <div className="row d-flex justify-content-center ">
      <div className="col col-3 ">
      <div className="card ">
        <img className="card-img-top img-fluid"  src={service.imgUrl} alt="" />
        <div className="card-body">
        <div className="row ">
          <div className="col d-flex justify-content-center">
          <h3>{service.name}</h3>
          </div>
        </div>
        </div>
          </div> 
      </div>
      <div className="col col-3 ">
      <div className="row">
          <div className="col">
           
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h3>Preço <b>{service.price}€</b> </h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col  ">
          <select value={quantity} onChange={(e)=>{
            setQuantity(Number(e.target.value));
          }} className="form-select" aria-label="Default select example">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
  </select>
          </div>
          <div className="col">
            <h4 className='text-muted'>Quantidade</h4>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <button onClick={()=>{
              addToCart(service,quantity);
            }} className='btn btn-dark'> Add to cart</button>
          </div>
        </div>
      </div>
    </div>
     }
     
     
     </>
    )
}
