module.exports = function (app) {
  //var port = require('./port')
  app.get('/', function (req, res) {
        //res.redirect('/posts');
      //res.render('port' ,{msg:'qwe'})
      res.redirect('/signin');
      
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/port', require('./port'));
  app.use('/search', require('./search'));
  app.use('/edit', require('./edit'));
//  var port = require('./port')
  // 404 page
app.use(function (req, res) {
  if (!res.headersSent) {
    res.render('404');
  }
});
};