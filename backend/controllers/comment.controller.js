const Post = require("../models/post.model");

/*
POST /api/posts/:postid/comments
id가 postid인 글에 댓글 추가하기
jwt 토큰 요구
*/

async function createComment(req, res, next) {
    try {
        req.body.owner = req.user.userid;
        console.log("Request to createComment:");
        console.log(req.body);

        const post = await Post.findById(req.params.postid);
        if (!post) res.status(200).json({ done: false });
        await post.updateOne({ $push: { comments: req.body }, $inc: { commentcnt: 1 } });
        return res.status(200).json({ done: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

/*
PUT /api/posts/:postid/comments/:commentid
id가 postid인 글에사 id가 commentid인 댓글 수정
jwt 토큰 요구
*/

async function updateComment(req, res, next) {
    try {
        req.body.modifytime = Date.now;

        const post = await Post.findOne({ _id: req.params.postid, 'comments._id': req.params.commentid });
        if (!post) res.status(404).json({ done: false });
        if (post.owner != req.user.userid) return res.status(401).json({ done: false });
        await post.updateOne(req.body);
        return res.status(200).json({ done: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

/*
DELETE /api/posts/:postid/comments/:commentid
id가 postid인 글에사 id가 commentid인 댓글 지우기
jwt 토큰 요구
*/

async function deleteComment(req, res, next) {
    try {
        const post = await Post.findOne({ _id: req.params.postid, 'comments._id': req.params.commentid });
        if (!post) res.status(404).json({ done: false });
        if (post.owner != req.user.userid) return res.status(401).json({ done: false });
        await post.deleteOne();
        return res.status(200).json({ done: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;