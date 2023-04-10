const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};

// the way to send the tokens
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// defining secret key
jwtOptions.secretOrKey = 'LOVE_LETTERS_SECRET_KEY'

module.exports = jwtOptions;