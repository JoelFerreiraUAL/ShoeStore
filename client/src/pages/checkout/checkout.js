import React ,{useState}from 'react'

export const CheckoutPage = ({cart}) => {
  return (
   <>
   <div className="row d-flex justify-content-center ">
    <div className="col col-sm-6">
    <div className="card">
                <h5 className="card-header">
                          <div className="row">
                                        <div className="col">                                            
                                            <h5>Produt</h5>
                                        </div>
                                        <div className="col">                                            
                                            <h5>Quantity</h5>
                                        </div>
                                        <div className="col">                                            
                                            <h5>Price</h5>
                                        </div>
                                
                                </div>     
                        
                </h5>
                    <div className="card-body">
                       {cart.map((ele,index)=>{
                            return <div key={index} className="row">
                                <div className="col">
                                    <img src={ele.imgUrl} height={100} alt="" />                             
                                </div>
                                <div className="col">
                                    <h4 className='mt-4'> {ele.quantity}</h4>                               
                                </div>
                                <div className="col">
                                    <h4 className='mt-4'>{ele.price} € </h4>                               
                                </div>
                            </div>
                       })}
                    </div>
                    <div class="card-footer text-muted">
                        <div className="row">
                            <div className="col d-flex justify-content-end">
                                <div>
                                            <button className="btn btn-dark w-100"> Make Purchase</button>
                                </div>
                            </div>
                        </div>
                      
                    </div>
     </div>
    </div>
   </div>
   </>
  )
}
