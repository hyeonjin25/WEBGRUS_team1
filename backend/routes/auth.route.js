const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// 컨트롤러로 라우팅
router.post("/login", authController.createAuth);
router.post("/logout", authController.deleteAuth);
router.post(
    "/check",
    passport.authenticate('jwt', { session: false }),
    authController.checkAuth
);

module.exports = router;
