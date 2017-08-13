/*Get User by userid */
exports.loginUser    = function(req,res){
  console.log('req.body',req.body);
  //get object
  var input = JSON.parse(JSON.stringify(req.body));
  
  //active user status
  var statusResponse = 3;
  //user id 
  var username = input.username;
  //password
  var password= input.password;

  var role_id = input.role_id;
  //getting connection
  req.getConnection(function (err, connection) {
  
    var query =  connection.query('SELECT * FROM user_table WHERE username = ? and role_id= ?',
      [username,role_id], 
    function (error, results, fields) { 
      if (err) {
        console.log("Error in query : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      if(results.length > 0) {
        if(results[0].password == password) {
          //{statusResponse:0,message:'login successful'})
          res.json({response:{"statusResponse":0,"message": "success"},data:{"user":results[0]}})
        }
        else {
          res.json({response:{"statusResponse":2,"message": "invalid password"}})
        }
      }
      else {
        res.json({response:{"statusResponse":1,"message": "invalid username"}})
      }  
    });
  });
}
