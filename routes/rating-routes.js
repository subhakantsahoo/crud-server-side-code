const routes=require('express').Router();
//const { post, get } = require('.');
const Rating=require('../services/rating-service');
let RatingsUser=new Rating();
routes.post("/create",RatingsUser.create);
routes.get("/get",RatingsUser.get);
routes.patch("/:id",RatingsUser.update);
routes.delete("/:id",RatingsUser.delete);
routes.get("/one/:id",RatingsUser.getbyid);

module.exports=routes;
