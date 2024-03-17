const router = require("express").Router();
const userrouter = require("./user-routes");

const moviesrouter = require("./movies-routes");

const ratingrouter = require("./rating-routes");

const authrouter = require("./auth-routes");

const author = require("./middleware-routes");

const api = require("./xapi-routes");

// const authorization=require('./authorization-routes');

// const authorized=require("../services/middleware");

router.use("/user", userrouter);
router.use("/movie", moviesrouter);
router.use("/rating", ratingrouter);
router.use("/auth", authrouter);
router.use("/xapi", api);

// router.use("/me",authorized);

router.use("/dc", author);

// router.use("/mar",authorization);

module.exports = router;
