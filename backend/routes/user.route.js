const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');

router.post("/", userController.createUser);

router.put(
    "/favorites/:postid",
    passport.authenticate('jwt', { session: false }),
    userController.toggleFavorite
)
router.get(
    "/favorites/:postid",
    passport.authenticate('jwt', { session: false }),
    userController.checkFavorite
)

router.put(
    "/following/:userid",
    passport.authenticate('jwt', { session: false }),
    userController.toggleFollowing
)

module.exports = router;