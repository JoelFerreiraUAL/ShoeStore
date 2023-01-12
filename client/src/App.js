import logo from './logo.svg';
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './shared/layout/layout';
import { LoginPage } from './pages/auth/login/login';
import { RegisterPage } from './pages/auth/register/register';
import { ProductsPage } from './pages/product/products';
import { ProductDetailPage } from './pages/product/product.detail';
import { CheckoutPage } from './pages/checkout/checkout';
function App() {
  const [cart,setCart]=useState([]);
  const [total,setTotal]=useState(0);
  useEffect(()=>{
    getCart();

  },[])

  function getCart(){
    const cart=localStorage.getItem("cart");
    if(cart){
      const currentCart=JSON.parse(cart);
      setCart(currentCart)
      getTotal(currentCart);
    }
    else{
      localStorage.setItem("cart",[]);
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
    localStorage.setItem("cart",JSON.stringify(updatedCart));
    getTotal(updatedCart);
    setCart(updatedCart);
  }
  function getTotal(cart){
    let total=0
    cart.forEach(element => {
      console.log(element)
      total=total+(element.price*element.quantity);      
    });
    setTotal(total);
  }
    
  return (

    <>
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
      
    </>
   

  );
}

export default App;
