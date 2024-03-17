const routes=require('express').Router();
//const { post, get } = require('.');
 const Token=require('../services/middleware');
let TokenService=new Token();
 routes.get("/get",TokenService.get);


    
module.exports=routes;
  