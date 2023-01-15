import React, {  useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/context/user.context";
import { LoadingSpinner } from "../../components/loading-spinner/loading.spinner";
export const ProductsPage = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [products,setProducts]=useState([]);
  const { user, setUser } = useContext(UserContext);
  useEffect(()=>{
    const init= async ()=>{
      await getData();
      setIsLoading(false);
    
    }
    init();
  },[])

   async function getData(){
    const response= await fetch("http://localhost:3001/api/products");
    const result= await response.json();
    setProducts(result);
  }
  return (
   <>

    <div className="row">
        <div className="col d-flex justify-content-center">
            <h1>Produtos</h1>
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

        {products.map((element,index)=>{
          return(<>
            <div key={index} className=" col-sm-3 col-lg-3 col-xl-2">
          <div className="card  w-100 ">
        
            <div className="card-body">
              <div className="row">
                <div className="col " >
                <img className="card-img"  src={element.imgUrl} alt="" />
                </div>
              </div>
              <h6 className="card-title">{element.name}</h6>
              <div className="row mt-3">
                <div className="col ">            
                <b >{element.price}€</b>
                </div>
              </div>
              <div className="row mt-3">
               {user?.role==="admin" &&
               <div className="col">            
               <Link to={`/products/edit/${element.id}`} className="btn btn-dark ">Editar</Link>
                </div> } 
                <div className="col d-flex justify-content-end">            
               <Link to={`/products/${element.id}`} className="btn btn-dark ">Detalhes</Link>
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
