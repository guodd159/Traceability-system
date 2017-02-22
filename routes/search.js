var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');

var checkLogin = require('../middlewares/check').checkLogin;
//router.get('/', function (req, res) {
//    PostModel.search(req.query.keyword, function (err, posts) {
//        if (err) {
//            req.flash('error', err);
//            return res.redirect('/');
//        }
//        res.render('search', {
//            posts: posts
//        });
//    });
//});
//
//router.get('/', function(req, res) {
//    var keyword = req.query.keyword;
//
//    PostModel.search(keyword)
//        .then(function (posts) {
//            res.render('search', {
//                posts: posts
//            });
//        })
//        .catch(next);
//});

//// GET /posts/:postId 单独一篇的文章页
router.get('/', function(req, res, next) {
    //var postId = req.params.postId;
    var keyword = req.query.postId;

    Promise.all([
        //PostModel.getPostById(keyword),// 获取文章信息
        PostModel.search(keyword),
        CommentModel.getComments(keyword),// 获取该文章所有留言
        //PostModel.search(keyword),
        PostModel.incPv(keyword)// pv 加 1
    ])
    .then(function (result) {
            var post = result[0];
            var comments = result[1];
            if (!post) {
                throw new Error('该文章不存在');
            }

            res.render('search', {
                post: post,
                comments: comments
            });
    })
    .catch(next);
});
module.exports = router;