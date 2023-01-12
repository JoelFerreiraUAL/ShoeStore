import logo from './logo.svg';
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './shared/layout/layout';
import { LoginPage } from './pages/auth/login/login';
import { RegisterPage } from './pages/auth/register/register';
import { ProductsPage } from './pages/product/products';
import { ProductDetailPage } from './pages/product/product.detail';
function App() {
  const [cart,setCart]=useState([]);

  function addToCard(product,quantity){

  }
    
  return (

    <>
    <Routes>
            <Route
              path="/"
              element={
                  <Layout />
                  
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
                  <ProductDetailPage/>
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
