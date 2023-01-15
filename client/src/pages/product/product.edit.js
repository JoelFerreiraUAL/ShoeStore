import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";

export const ProductEditPage = () => {
    const [product,setProduct]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const { id } = useParams();
    const navigate= useNavigate();

    useEffect( ()=>{
        const getInitialData = async ()=>{
          await getData();
          setIsLoading(false);
        }
        getInitialData();
      },[])
      async function getData(){
        const result= await fetch(`http://localhost:3001/api/products/${id}`)
        const product= await result.json();
        if(product.id){
          setProduct(product)
        }else{
          navigate("/products")
        }
      }

      async function updateProduct(){
        const token=localStorage.getItem("token")
        const result= await fetch(`http://localhost:3001/api/products`,{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer `+token
            },
            body:JSON.stringify(product)
        })
       if(result.status===200){
        navigate("/")
       }

      }
  return (
   <>
   {!isLoading && <> 
    <div className="row d-flex justify-content-center ">
        <div className="col col-sm-3">
        <div className="card ">
      <div className="card-body">
      <div className="row ">
        <div className="col d-flex justify-content-center">
        <h3>{product.name}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <img className=" img-fluid" heigth={60}  src={product.imgUrl} alt="" />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
        <label htmlFor="email" className="form-label">Email address</label>
            <input value={product.price} onChange={(e)=>{
                const updateProductValue={...product,[e.target.name]:e.target.value}
                setProduct(updateProductValue)
            }} type="number" name="price" className="form-control" id="price"/>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col d-flex justify-content-end">
            <div>
            <button onClick={updateProduct} className='btn btn-dark'> Update Price</button>
            </div>
          
        </div>
      </div>
      </div>
        </div> 
        </div>
    </div></>
   }
   </>
  )
}
