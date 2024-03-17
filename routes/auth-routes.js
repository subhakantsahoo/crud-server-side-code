const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../services/auth");
const User = require("../models/user-schema");
// const isAuthenticated=require('../services/middleware')

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, userDetails, info) => {
    try {
      if (err || !userDetails) {
        const error = new Error("An error occurred.*******************");

        return next(error);
      }

      req.login(userDetails, { session: false }, async (error) => {
        if (error) return next(error);

        const user = await User.findById(userDetails._id);
        const token = jwt.sign({ userDetails }, "SECRET_KEY");
        console.log("^^^^^^^", user._id);

        return res.json({ Token: token, userId: user._id }); //...userid,
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  "/rating/:id",
  passport.authenticate("jwt", { session: false }),
  // TokenService.get,
  async (req, res) => {
    const requestGameId = req.params.id;
    const authenticatedUserId = req.user;
    console.log("gameid:   ", requestGameId);
    console.log("                 ");
    console.log("userid", authenticatedUserId);
    try {
      // the user information from the database
      const user = await User.findById(authenticatedUserId).populate("game");
      console.log("This is it **********", user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Check requested game ID matches the game ID is matching with authenticated user or not
      if (requestGameId !== user.game._id.toString()) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
      console.log("Game id from User schema:", user.game);
      return res.json({
        game: user.game.game,
        image: user.game.image,
      });
      // const game = await Game.findById(requestGameId)
      //   .populate("someOtherField") // Replace "someOtherField" with the field you want to populate
      //   .exec();

      // if (!game) {
      //   return res.status(404).json({ error: "Game not found" });
      // }

      // return res.json({ game: game.game, image: game.image });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// router.get('/get',async (req, res, next) => {

//         try{
//         const token = req.headers.authorization;
//         if(token){
//         console.log(`Token found ${token}`);
//         }
//         else
//         {
//             console.error("Not Found");
//         }
//         }catch(error)
//         {
//             console.log("Token Not Found");
//         }

// });

module.exports = router;
