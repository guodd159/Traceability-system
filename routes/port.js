var express = require('express');
var router = express.Router();
var SerialPort = require('serialport');  //引入模块
var port = new SerialPort('com6');
// port.open(function(error){
//    if(error){
//      console.log(error);
//    }else{
//    	console.log("打开串口成功，正在监听数据中");
//      port.on('data',function(data){
//      	console.log(data);
//      })
//    }
// });
// var datapool = '';

//  exports.datapool = function(){}

    port.on('open', function() {
        port.write('main screen turn on', function(err) {
            if (err) {
                 return console.log('Error on write: ', err.message);
            }
            //console.log('message written');

            port.on('data',function(data){
               datapool.push(data.toString()) ;
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
////module.exports = function (app) {
//    //var port = require('./port')
router.get('/', function(req, res, next) {
    res.render('port',{msg:datapool1()});
});
//router.get('/', function (req, res) {
//    res.render('port' ,{msg:'datapool1'})
//});
module.exports=router;