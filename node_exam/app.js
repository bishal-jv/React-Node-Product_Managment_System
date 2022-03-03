require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const app = express();
const port = process.env.PORT || 5000;


let productData = [];
let productID = 1;


const userData = {
  userId: "1",
  username: "bishal",
  password: "123",
  name: "Bishal",
  isAdmin: true
};



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return next(); 
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } 
    else {
      req.user = user;
      next();
    }
  });
});


//index page
app.get('/', (req, res) => {
  if (req.user) return res.status(401).json({ success: false, message: 'User not allowed'});
  res.send('Welcome to Product Managment System !');
});


//login api
app.post('/api/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username/Password required."
    });
  }

  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username/Password is Wrong."
    });
  }

  const token = utils.generateToken(userData);
  const userObj = utils.getCleanUser(userData);
  return res.json({ user: userObj, token });
});


//new register api
app.post('/api/register', function (req, res) {
  const name = req.body.name;
  const pwd = req.body.password;
  const user = req.body.username;
  const email = req.body.email;
  const contact = req.body.contact;
  let userObj = {};

  if (!name || !pwd || !user || !email || !contact) {
    return res.status(400).json({
      error: true,
      message: "Values missing."
    });
  } 
  
  else {
    userObj.name = name;
    userObj.username = user;
    userObj.email = email;
    userObj.contact = contact;
    return res.json({ user: userObj });
  }
});


//saveproduct api
app.post('/api/productManagement/saveProduct', function (req, res) {
  const productName = req.body.productName;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const vendor = req.body.vendor;
  const warranty= req.body.warranty;
  let productObj = {};

  if (!productName || !price || !quantity || !vendor || !warranty ) {
    return res.status(400).json({
      error: true,
      message: "Values missing."
    });
  } 
  
  else {
    productObj.productId = productID;
    productObj.productName = productName;
    productObj.price = price;
    productObj.quantity = quantity;
    productObj.vendor = vendor;
    productObj.warranty = warranty;
    productData.push(productObj);
    productID++;
    return res.json({ product: productObj });
  }

});


//list api
app.get('/api/productManagement/listProduct', function (req, res) {
  return res.json({ product: productData });
});


//delete api
app.delete('/api/productManagement/delete', function (req, res) {
  const productId = req.body.productId;

  if (!productId ) {
    return res.status(400).json({
      error: true,
      message: "Values missing."
    });
  } 
  
  else {
    let productIndex = productData.findIndex(product => (product.productId === productId));
    productData.splice(productIndex,1)
    return res.json({ Message:"Product deleted"});
  }
});


//port update - running on 5000
app.listen(port, () => {
  console.log('\nServer started on : ' + port);
});
