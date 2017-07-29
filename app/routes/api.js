var User       =require('../models/user');

module.exports = function(router) {
  //http://localhost:8080/api/users
  //User Registration Route
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
   //User login Route
   //http://localhost:8080/api/authenticate
   router.post('/authenticate',function(req,res) {
       User.findOne({ username: req.body.username }).select('email username password').exec(function(err,user){
        if (err) throw err;
        if (!user){
          res.json({ success: false, message: 'Could not authenticate user'});
        }else if(user){
          if(req.body.password){
            var validPassword = user.comparePassword(req.body.password);
          }else{
             res.json({ success: false, message: 'No password Provided'});
          }
             
             if(!validPassword){
              res.json({ success: false, message: 'Could not authenticate user'});
             }else {
              res.json({ success: true, message: 'User Authenticate!!!'});
             }
        }
       });
   });

  return router;
}