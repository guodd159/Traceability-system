var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
// var CommentModel = require('../models/comments');
var SerialPort = require('serialport');  //引入模块
var port = new SerialPort('com6');

port.on('open', function () {
    port.write('main screen turn on', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        // console.log('message written');

        port.on('data', function (data) {
            datapool.push(data.toString('hex'));
        });

    });
});
// };
//open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
})

var datapool = [];
var datapool1 = function () {
    var data = datapool.toString();
    datapool = [];
    return data.replace(/,/g, '').substring(14, 18);
};

router.get('/', function (req, res, next) {
    var keyword = datapool1();
    // console.log(typeof (datapool1()));
    // console.log(keyword);
    Promise.all([
        PostModel.search(keyword),
        PostModel.incPv(keyword)// pv 加 1
    ])
        .then(function (result) {
            var post = result[0];
            if (!post) {
                throw new Error('请刷卡');
            }
            res.render('post', {
                post: post
            });
        })
        .catch(next);
});

module.exports = router;

