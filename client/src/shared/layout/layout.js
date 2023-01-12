import React ,{useState}from 'react'
import { Link, Outlet } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
const Layout = ({cart,total}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRegister,setUserRegister]=useState({
    email:"",
    password:"",
  });
  const handleRegisterModalClose = () => setShowRegisterModal(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);

  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleLoginModalShow = () => setShowLoginModal(true);

  function onChange({target}){
    const updatedRegisterUser={...userRegister,[target.name]:target.value}
    setUserRegister(updatedRegisterUser)
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
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
                <>
                <li class="nav-item dropdown">
                    <button className="btn btn-outline-dark me-2"  id="navbarDropdown" style={{"maxWidth": 200}} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className='fa-solid fa-cart-shopping'> </span>
                    </button>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdown" >
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
                        <hr class="dropdown-divider"></hr>
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
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-dark me-2"
                      aria-current="page"
                    
                    >
                      Log In
                    </button>
                  </li>
                  <li className="nav-item ">
                    <button
                      onClick={handleRegisterModalShow}
                      className=" btn btn-dark  "
                      aria-current="page"
                    >
                     Sign Up
                    </button>
                  </li>
                </>
                </ul> 
              
    </div>
  </div>
</nav>
    </header>
    <div className="container-fluid mt-5">
        
    <Outlet/>
   </div>

   <Modal show={showRegisterModal} onHide={handleRegisterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            <div className="col">
            <label for="email" className="form-label">Email address</label>
            <input value={userRegister.email} onChange={onChange} type="email" name="email" class="form-control" id="email"/>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
            <label for="password" className="form-label">Password</label>
            <input value={userRegister.password} onChange={onChange} type="password" name="password" class="form-control" id="password"/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button className='btn btn-dark w-100'>Sign Up</button>
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