const path = require('path');
var fs = require('fs');
const bcrypt = require("bcrypt")
const express = require("express");
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const secretKey="55ba52cb8b7da952b7d4afea50d11eea";
const products= require("./db/products.json")
const users=require("./db/users.json")
const usersCart=require("./db/usersCart.json")
const cors = require('cors');
const { verify } = require('crypto');
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
app.put("/api/products",verifyJwtToken,async (req,res)=> {  
  const user=users.find(u=>u.id===Number(req.userId));
  if(user.role==="admin"){
    const product=req.body;
    const currentProducts=products.map(p=>{
      if(Number(p.id)===Number(product.id)){
        p.price=Number(product.price)        
      }
      return product
    })
    await fs.writeFileSync("./db/products.json",JSON.stringify(currentProducts))
    return res.status(200).send("Ok");
  }
  return res.status(400);

})
app.post("/api/auth/signin",async (req,res)=>{
  const user= users.find(u=> u.email==req.body.email)
  if(user){
    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    const id=user.id;
    if(passwordCorrect){
      const token = jwt.sign({ id },secretKey, {
        expiresIn: 1440 // expires in 24h
      });
      const userData={
        email:user.email,
        role:user.role
      }
      return res.status(200).json({ user:userData, token: token });
    }
    else{
      res.sendStatus(400);
    }
      
  }
  else{
    res.sendStatus(400);
  }

})

app.get("/api/auth/getUser",verifyJwtToken,(req,res)=>{

  const user=users.find(u=>u.id==req.userId)
  const currentUser={
    email:user.email,
    role:user.role
  }
  return res.status(200).send(currentUser);
})

function verifyJwtToken(req,res,next){
  const token = req.headers.authorization.split(' ')[1];;
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, secretKey, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

app.post("/api/auth/signup",async (req,res)=>{
  const user=req.body;
  const userExists= users.find(u=> u.email==user.email)
  if(!userExists){
    const passwordHashed = await bcrypt.hash(user.password, 10);
    const userId= users.length+1;
    const userToSave={
      email:user.email,
      role:"user",
      id:userId,
      password:passwordHashed
    };
    users.push(userToSave);
    const id=userId;
    await fs.writeFileSync("./db/users.json",JSON.stringify(users))
    const token = jwt.sign({  id},secretKey, {
      expiresIn: 1440 // expires in 24h
    });
    const userData={
      email:user.email
    }
    return res.status(200).json({ user:userData, token: token });
  }
  else{
    res.sendStatus(400);
  }

})
