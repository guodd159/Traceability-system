module.exports = function (app) {

  app.get('/', function (req, res) {

      res.redirect('/signin');
      
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/port', require('./port'));
  app.use('/search', require('./search'));
  app.use('/canz', require('./canz'));
  app.use('/update_pwd', require('./update_pwd'));
app.use(function (req, res) {
  if (!res.headersSent) {
    res.render('404');
  }
});
};