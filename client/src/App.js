import logo from './logo.svg';
import { UserContext } from './shared/context/user.context';
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './shared/layout/layout';
import { LoginPage } from './pages/auth/login/login';
import { RegisterPage } from './pages/auth/register/register';
import { ProductsPage } from './pages/product/products';
import { ProductDetailPage } from './pages/product/product.detail';
import { CheckoutPage } from './pages/checkout/checkout';
import { ProductEditPage } from './pages/product/product.edit';
import { AboutPage } from './pages/about/about';
import { ServicePage } from './pages/services/service';
import { ServiceDetail } from './pages/services/service.detail';
function App() {
  const [user, setUser] = useState();
  const [cart,setCart]=useState([]);
  const [total,setTotal]=useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(()=>{
    const getInitialData= async ()=>{
      await getData();
      await getCart();
      setIsLoading(false);
    }
    getInitialData();

  },[])

 async  function getCart(){
  const token=localStorage.getItem("token");
  if(token){
    try {
      const response= await fetch("http://localhost:3001/api/cart",{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
  
       })
       const userCart= await response.json();
       setCart(userCart);
       getTotal(userCart);
       setCart(userCart);
      
    } catch (error) {
      localStorage.removeItem("token")
      setCart(null);
      setCart(null);
    }
  }
   
  }
  async function getData(){
    const token=localStorage.getItem("token");
    if(token){
       const response= await fetch("http://localhost:3001/api/auth/getUser",{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }

       })
       const user= await response.json();
       setUser(user);
    }
  }
  function emptyCart(){
    setCart([]);
  }
 async function addToCard(product,quantity){
    const token=localStorage.getItem("token");
    const addProduct={
      id:product.id,
      name:product.name,
      price:product.price,
      imgUrl:product.imgUrl,
      quantity:quantity
  
      }
    const response= await fetch("http://localhost:3001/api/products/cart",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify(addProduct)       
    })

    const result= await response.json();
    if(result.length>=1){
      getTotal(result);
      setCart(result);
    }

  }
  function getTotal(cart){
    let total=0
    cart.forEach(element => {
      total=total+(element.price*element.quantity);      
    });
    setTotal(total);
  }
    
  return (

     <>
     {!isLoading &&
       <UserContext.Provider value={providerValue}>
      <Routes>
            <Route
              path="/"
              element={
                  <Layout getCart={getCart} emptyCart={emptyCart} cart={cart} total={total} />
                  
              }
            >
                <Route
                path="/"
                element={
                  <ProductsPage/>
                }
              />
                <Route
                path="/products"
                element={
                  <ProductsPage/>
                }
              />
                <Route
                path="/products/:id"
                element={
                  <ProductDetailPage addToCart={addToCard}/>
                }
                
              />
               <Route
                path="/about"
                element={
                  <AboutPage 
                  />
                }
                
              />
                <Route
                path="/services"
                element={
                  <ServicePage 
                  />
                }
                
              />
                              <Route
                path="/services/:id"
                element={
                  <ServiceDetail addToCart={addToCard}/>
                }
                
              />
                              <Route
                path="/products/edit/:id"
                element={
                  <ProductEditPage/>
                }
                
              />
               <Route
                path="checkout"
                element={
                  <CheckoutPage cart={cart}/>
                }
                
              />
                <Route
                path="/auth/login"
                element={
                  <LoginPage/>
                }
              />
               <Route
                path="/auth/register"
                element={
                  <RegisterPage/>
                }
              />
            </Route>
            </Routes>
            </UserContext.Provider>}
      
    </>
              
   

  );
}

export default App;
