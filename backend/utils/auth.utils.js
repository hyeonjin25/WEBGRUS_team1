const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const localStrategyOptions = {
    usernameField: "userid",
    passwordField: "password"
};

// db에 저장된 id와 비밀번호 대조 (local verify)
async function localVerify(userid, password, done) {
    try {
        // ID 존재 확인
        const user = await userModel.findOne({ userid: userid });
        if (!user) return done(null, false, { message: '잘못된 ID' });
        // 비밀번호 확인
        const pwdCheck = await bcrypt.compare(password, user.password);
        if (!pwdCheck) return done(null, false, { message: '잘못된 비밀번호' });
        return done(null, user);
    } catch (err) {
        console.log(err);
        done(err)
    }
};

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret', // secret string, change this to global const later
    passReqToCallback: true
};

// 현재 JWT token의 유효성 확인 (jwt verify)
async function jwtVerify(req, payload, done) {
    try {
        // jwt token에 명시된 유저와 일치하는 유저가 존재하는지 확인
        const user = await userModel.findOne({ userid: payload.userid });
        if (!user) return done(null, false);
        req.user = user;
        return done(null, user);
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
};

module.exports.init = () => {
    passport.use(new LocalStrategy(localStrategyOptions, localVerify));
    passport.use(new JWTStrategy(jwtStrategyOptions, jwtVerify));
}