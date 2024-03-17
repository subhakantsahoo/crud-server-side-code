//NOT working....!!!!
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user-schema');
const Tokenservices = require('./middleware');
const secretKey = 'SECRET_KEY';
const jwtOptions = {
  secretOrKey: secretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      // const user = await User.findById("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOnsidXNlciI6IktyaXNobmEifSwiaWF0IjoxNjc5OTk2NTUxfQ.AdBjv7IWvKReXOUTlYUpqxXt4QXmS2jFJH9Lk8mWaMQ");
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// passport.use('/protected',Tokenservices.get,(req,res)=>{
//   res.status(200).json({
//     message:'You are authorized to access this resource',
//     user:req.user
//   });
// });

// const passport = require('passport');
// const Tokenservices = require('./middleware');

const auth = {};

auth.protectedRoute = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

auth.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await Tokenservices.refreshTokens(refreshToken);

    res.cookie('jwt', newTokens.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.cookie('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      message: 'Tokens refreshed successfully',
    });
  } catch (error) {
    return next(error);
  }
};



module.exports = auth;


// function authorize(req, res, next) {
//   // check if user is authenticated
//   if (!req.user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// }
