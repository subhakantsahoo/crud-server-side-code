const routes = require("express").Router();
const Xapi = require("../services/xapi-service");
let xapi = new Xapi();
routes.post("/create", (req, res) => {
  xapi.create(req, res);
});
routes.get("/get", (req, res) => {
  xapi.get(req, res);
});
module.exports = routes;
