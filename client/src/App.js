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
function App() {
  const [user, setUser] = useState();
  const [cart,setCart]=useState([]);
  const [total,setTotal]=useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(()=>{
    const getInitialData= async ()=>{
      await getData();
      getCart();
      setIsLoading(false);
    }
    getInitialData();

  },[])

  function getCart(){
    const cart=sessionStorage.getItem("cart");
    if(cart){
      const currentCart=JSON.parse(cart);
      setCart(currentCart)
      getTotal(currentCart);
    }
    else{
      sessionStorage.setItem("cart",[]);
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
  function addToCard(product,quantity){
    const updatedCart=[...cart];
    let productExists=updatedCart.find(p=>p.id===product.id)
    if(productExists){
      productExists.quantity=productExists.quantity+quantity;
    }
    else{
      updatedCart.push({
        id:product.id,
        name:product.name,
        price:product.price,
        imgUrl:product.imgUrl,
        quantity:quantity
    
        })   

    }    
    sessionStorage.setItem("cart",JSON.stringify(updatedCart));
    getTotal(updatedCart);
    setCart(updatedCart);
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
                  <Layout cart={cart} total={total} />
                  
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
