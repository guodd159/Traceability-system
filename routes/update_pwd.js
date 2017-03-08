var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /edit
router.get('/', checkLogin, function(req, res, next) {
    res.render('update_pwd');
});

router.post('/', checkLogin, function(req, res, next) {
    // var name = req.fields.name1;
    var name = req.session.user.name;
    var oldpassword = req.fields.oldpassword;
    var newpassword = req.fields.newpassword;
    var renewpassword = req.fields.renewpassword;

    // 校验参数
    try {
        if (newpassword.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (newpassword !== renewpassword) {
            throw new Error('两次输入的新密码不一致');
        }
        if (newpassword == oldpassword) {
            throw new Error('旧密码与新密码相同');
        }
    } catch (e) {

        req.flash('error', e.message);
        return res.redirect('/update_pwd');
    }
    // 明文密码加密
    var newpassword = sha1(newpassword);
    UserModel.getUserByName(name)
        .then(function (user) {
            // if (!user) {
            //     req.flash('error', '用户不存在');
            //     return res.redirect('back');
            // }
            // 检查密码是否匹配
            if (sha1(oldpassword) !== user.password) {
                req.flash('error', '旧密码输入错误');
                return res.redirect('back');
            }
            // req.flash('success', '登录成功');
            // 用户信息写入 session
            delete user.password;
            // req.session.user = user;
            // // 跳转到主页
            // res.redirect('/posts');
        })
        .catch(next);
    UserModel.updatePasswordByName(name,{password: newpassword})
        .then(function () {
            req.flash('success', '密码修改成功');
            // 编辑成功后跳转到上一页
            res.redirect('/posts/');
        })
        .catch(next);

});

module.exports = router;