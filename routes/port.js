var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');
var SerialPort = require('serialport');  //引入模块
var port = new SerialPort('com6');

    port.on('open', function() {
        port.write('main screen turn on', function(err) {
            if (err) {
                 return console.log('Error on write: ', err.message);
            }
            //console.log('message written');

            port.on('data',function(data){
               datapool.push(data.toString()) ;
                router.get('/', function(req, res, next) {
                    var keyword = datapool1();

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
                                throw new Error('该信息不存在');
                            }

                            res.render('search', {
                                post: post,
                                comments: comments
                            });
                        })
                        .catch(next);
                    // res.render('port',{postId:datapool1()});
                });
               // res.redirect('/posts');
               //console.log(data.constructor.name);
           });

        });
    });
  // };
//open errors will be emitted as an error event
     port.on('error', function(err) {
         console.log('Error: ', err.message);
     })
      // console.log(datapool);


     var datapool=[];
     var datapool1=function(){
         var data=datapool.toString();
         datapool = [];
         return data;
     }



    // router.get('/', function(req, res, next) {
    //     var keyword = datapool1();
    //
    //     Promise.all([
    //         //PostModel.getPostById(keyword),// 获取文章信息
    //         PostModel.search(keyword),
    //         CommentModel.getComments(keyword),// 获取该文章所有留言
    //         //PostModel.search(keyword),
    //         PostModel.incPv(keyword)// pv 加 1
    //     ])
    //         .then(function (result) {
    //             var post = result[0];
    //             var comments = result[1];
    //             if (!post) {
    //                 throw new Error('该信息不存在');
    //             }
    //
    //             res.render('search', {
    //                 post: post,
    //                 comments: comments
    //             });
    //         })
    //         .catch(next);
    //     // res.render('port',{postId:datapool1()});
    // });

    module.exports=router;