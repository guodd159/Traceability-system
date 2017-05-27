var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');


var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function (req, res, next) {
    var keyword = req.query.postId;

    Promise.all([
        PostModel.search(keyword),
        PostModel.incPv(keyword)// pv 加 1
    ])
        .then(function (result) {
            var post = result[0];
            if (!post) {
                throw new Error('该信息不存在');
            }
            res.render('post', {
                post: post
            });
        })
        .catch(next);
});

module.exports = router;