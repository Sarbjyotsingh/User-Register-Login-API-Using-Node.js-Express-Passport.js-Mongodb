var User       =require('../models/user');

module.exports = function(router) {
  router.post('/users', function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
  if (req.body.username == null ||  req.body.username == '' || req.body.email == null || req.body.email == ''|| req.body.password == null  || req.body.password == ''  ){
    res.send('Ensure Username, Email and Password is provided');
  
  } else {
        user.save(function(err){
      if(err){
       res.send('Username or Email already exist');
      }
      else {
        res.send('User created!!!')
      }
    });
  }
    
});
  return router;
}