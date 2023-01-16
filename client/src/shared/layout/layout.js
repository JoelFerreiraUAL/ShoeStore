import { useContext, useState } from "react";
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from "../context/user.context";
import Modal from 'react-bootstrap/Modal';
const Layout = ({cart,total,emptyCart,getCart}) => {
  const [showRegisterModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser,setcurrentUser]=useState({
    email:"",
    password:"",
  });
  const { user, setUser } = useContext(UserContext);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  function onChange({target}){
    const updatedRegisterUser={...currentUser,[target.name]:target.value}
    setcurrentUser(updatedRegisterUser)
  }
  async function submit(){
     
    if(currentUser.email!=="" && currentUser.password!==""){

      if(!isLogin){

        const result= await fetch("http://localhost:3001/api/auth/signup",{
          headers: {
            'Content-Type': 'application/json'
          },
          method:"POST",
          body:JSON.stringify(currentUser)
        })
        if(result.status===200){
          const data= await result.json();
          localStorage.setItem("token",data.token);
          setUser(data.user)
          getCart();
          handleModalClose();
         
  
        }
      }
      else{
        const result= await fetch("http://localhost:3001/api/auth/signin",{
          headers: {
            'Content-Type': 'application/json'
          },
          method:"POST",
          body:JSON.stringify(currentUser)
        })
        if(result.status===200){
          const data= await result.json();
          localStorage.setItem("token",data.token);
          setUser(data.user)
          getCart();
          handleModalClose();

  
        }
      }
    }
  }
  function logout(){
    localStorage.removeItem("token");
    setUser(null)
    emptyCart();
  }
  
  return (
    <>
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow p-3">
        <div className="container">
        <Link className="navbar-brand " to="/"> <b> ShoeStore </b></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="about">About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="services">Services</Link>
        </li>
        </ul>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
                <>
                <li className="nav-item dropdown">
                    <button className="btn btn-outline-dark me-2"  id="navbarDropdown" style={{"maxWidth": 200}} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className='fa-solid fa-cart-shopping'> </span>
                    </button>
                        <ul className="dropdown-menu " aria-labelledby="navbarDropdown" >
                          <div className="row">
                            <div className="col">
                              <h6 className='dropdown-header'> Carrinho</h6>
                            </div>
                          </div>
                          {cart.length===0 && <>
                          
                          <div className="row">
                            <div className="col">
                              <h6 className='dropdown-item'>Não adicionou nada ao carrinho</h6>
                            </div>
                          </div>
                          </>

                          }
                        {cart.length>0 && <>
                          {cart.map((element,index)=>{

                            return (
                              <div key={index} className="row mt-2">
                                <div className="col">
                                <img src={element.imgUrl} height={50} width={50} alt="" />
                                </div>
                                <div className="col mt-3">
                               <h6> {element.price}€</h6>
                                </div>
                                <div className="col mt-3">
                                 <h6>{element.quantity}</h6>
                                </div>
                              </div>

                            )
                          })}
                        <hr className="dropdown-divider"></hr>
                        <div className="row">
                          <div className="col d-flex justify-content-end">
                            <h6 className='me-2'> Total : {total}€</h6>
                           
                          </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <div className="col-8 ">
                            <div>
                            <Link to="checkout" className='btn btn-dark w-100'> Checkout</Link>
                            </div>
                           
                          </div>
                        </div>
                        </>  }

                        </ul>
                      </li>
                 {!user && <>
                  <li className="nav-item">
                    <button
                     onClick={()=>{
                      setIsLogin(true);
                      handleModalShow()}}
                      className="btn btn-outline-dark me-2"
                      aria-current="page"
                    
                    >
                      Log In
                    </button>
                  </li>
                  <li className="nav-item ">
                    <button
                      onClick={()=>{
                        setIsLogin(false);
                        handleModalShow()}}
                      className=" btn btn-dark  "
                      aria-current="page"
                    >
                     Sign Up
                    </button>
                  </li>
                  </>}
                  {user && <>
                  <li className="nav-item dropdown">
                    <button className="btn btn-outline-dark" data-bs-toggle="dropdown" id="userOptions" data-bs-target="#userOptions" aria-controls="userOptions" aria-expanded="false" aria-label="Toggle navigation"> {user.email}</button>
                    <ul className="dropdown-menu" aria-labelledby="userOptions">
                    <li><button onClick={logout} className="dropdown-item" >Logout</button></li>
                    </ul>

                  
                  </li>
                  </>}
                </>
                
                </ul> 
              
    </div>
  </div>
</nav>
    </header>
    <div className="container-fluid mt-5">
        
    <Outlet/>
   </div>

   <Modal show={showRegisterModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>

            {isLogin && "Sign In"}
            {!isLogin && "Sign Up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            <div className="col">
            <label htmlFor="email" className="form-label">Email address</label>
            <input value={currentUser.email} onChange={onChange} type="email" name="email" className="form-control" id="email"/>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
            <label htmlFor="password" className="form-label">Password</label>
            <input value={currentUser.password} onChange={onChange} type="password" name="password" className="form-control" id="password"/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button onClick={submit} className='btn btn-dark w-100'>Sign Up</button>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Layout