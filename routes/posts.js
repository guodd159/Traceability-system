var path = require('path');
var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var checkLogin = require('../middlewares/check').checkLogin;


router.get('/', function (req, res, next) {
  var author = req.query.author;
  var page = parseInt(req.query.p) || 1;
  Promise.all([
    PostModel.total(author),// 获取信息总数
    PostModel.getPosts(author, page)// 获取该页信息
  ])
    .then(function (result) {
      var num = result[0];
      var posts = result[1];
      // if (!post) {
      //     throw new Error('该文章不存在');
      // }
      console.log(num);
      res.render('posts', {
        posts: posts,
        page: page,
        isFirstPage: (page - 1) == 0,
        isLastPage: ((page - 1) * 3 + posts.length) == num
      });
    })
    .catch(next);

});

// GET /posts/create 信息录入页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create');
});

router.post('/', checkLogin, function (req, res, next) {
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var chart = req.files.chart.path.split(path.sep).pop();
  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
    if (!req.files.chart.name) {
      throw new Error('缺少图片');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = {
    author: author,
    title: title,
    content: content,
    chart: chart,
    pv: 0
  };

  PostModel.create(post)
    .then(function (result) {
      post = result.ops[0];
      req.flash('success', '成功');
      res.redirect(`/posts/${post._id}`);
    })
    .catch(next);
});



router.get('/:postId', function (req, res, next) {
  var postId = req.params.postId;

  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)// pv 加 1
  ])
    .then(function (result) {
      var post = result[0];
      if (!post) {
        throw new Error('该文章不存在');
      }
      res.render('post', {
        post: post
      });
    })
    .catch(next);
});


router.get('/:postId/edit', checkLogin, function (req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('该文章不存在');
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足');
      }
      res.render('edit', {
        post: post
      });
    })
    .catch(next);
});


router.post('/:postId/edit', checkLogin, function (req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var chart1 = req.files.chart1.path.split(path.sep).pop();

  PostModel.updatePostById(postId, author, { title: title, content: content, chart: chart1 })
    .then(function () {
      req.flash('success', '编辑成功');
      res.redirect(`/posts/${postId}`);
    })
    .catch(next);
});


router.get('/:postId/remove', checkLogin, function (req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  PostModel.delPostById(postId, author)
    .then(function () {
      req.flash('success', '删除成功');
      res.redirect('/posts');
    })
    .catch(next);
});

module.exports = router;