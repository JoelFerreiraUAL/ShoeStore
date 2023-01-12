const path = require('path');
const bcrypt = require("bcrypt")
const express = require("express");
const PORT = process.env.PORT || 3001;

const products= require("./db/products.json")
const users=require("./db/users.json")

const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.get("/api/products",(req,res)=>{
    res.status(200).send(products);
})


app.get("/api/products/:id",(req,res)=> {  
  const id = req.params.id;
  const product= products.find(e=>e.id==id);
  if(product){
    res.status(200).send(product);
  }
  else{
    res.status(200).send({});
  }

})
app.post("/api/auth/signin",async (req,res)=>{
  const user= users.find(u=> u.email==req.body.email)
  if(user){
    console.log(user)

    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(passwordCorrect){
      
      res.status(200).send("Password Correct");
    }
    else{
      res.sendStatus(400);
    }
      
  }
  else{
    res.sendStatus(400);
  }

})

app.post("/api/auth/signup",async (req,res)=>{
  const user=req.body;
  const userExists= users.find(u=> u.email==user.email)
  if(!userExists){
    const passwordHashed = await bcrypt.hash(user.password, 10);
    const userToSave={
      email:user.email,
      password:passwordHashed
    };
    users.push(userToSave);
    res.status(200).send(userToSave)
  }
  else{
    res.sendStatus(400);
  }

})
