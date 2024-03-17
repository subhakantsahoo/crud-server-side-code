

const User = require("../models/user-schema");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const JWTstrategy=require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
// const Username = require('./models/user-schema');
// const secretKey = 'SECRET_KEY';

// const auth = require("../services/authorization");

// passport.use()


class Tokenservices {
  async get(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      const authheader = token.split(" ")[0];
      // console.log(authheader);
      console.log(`Token found...**********${authheader}`);
      // Do something with the token value
    }
    if (!token) {
      return res.status(401).json({
        error: "You Are Not Authorize To Access This Resource",
      });
    }
    try {
      const authheader = token.split(" ")[1];

      const decodeToken = jwt.verify(
        authheader,
        "SECRET_KEY"
        
      );
      console.log(decodeToken);
      console.log("****************");
      const userId = decodeToken.userDetails._id;
      const user = await User.findById(userId);
      // if(user){
      //  return  res.status(401).json( {error:"User found%%%%",})
      // }
      if (!user) {
        return res.status(401).json({
          error: "User not found***",
        });
      }
      req.user = user;
      // console.log("Token***%")
      next(
      // res.status(401).json({message:"*****"})
      );
    } catch (error) {
      return res.status(401).json({
        error: "Invalid Token..!",
      });
    }
    // console.log(req.headers.authorization);
  }

  // } catch(error) {
  //     console.log("Token Not Found");
}

module.exports = Tokenservices;
