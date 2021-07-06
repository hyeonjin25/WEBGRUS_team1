const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment.controller');
const postController = require('../controllers/post.controller');
const fileUtils = require('../utils/file.utils');

// 글 
router.post(
    "/",
    passport.authenticate('jwt', { session: false }), // 인증
    fileUtils.uploadFile, // 사진 업로드 (최대 30개)
    postController.createPost // DB상에 글의 정보 추가
);
router.get(
    "/content/:postid",
    function (req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (err) return next(err);
            if (!user) postController.readPostAnonymous(req, res, next);
            postController.readPost(req, res, next);
        })(req, res, next);
    }
);
router.get("/users/:userid", postController.readPostByUser);
router.get("/favorites/:userid", postController.readPostsByFavorites);
router.get("/all", postController.readAllPost);
router.put(
    "/:userid",
    passport.authenticate('jwt', { session: false }),
    postController.updatePost
)
router.delete(
    "/:postid",
    passport.authenticate('jwt', { session: false }),
    fileUtils.uploadFile,
    postController.deletePost
)

// 댓글
router.post(
    "/:postid/comments",
    passport.authenticate('jwt', { session: false }),
    commentController.createComment
);
router.put(
    "/:postid/comments/:commentid",
    passport.authenticate('jwt', { session: false }),
    commentController.updateComment
);
router.delete(
    "/:postid/comments/:commentid",
    passport.authenticate('jwt', { session: false }),
    commentController.deleteComment
);

module.exports = router;
