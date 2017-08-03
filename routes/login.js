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
  //getting connection
  req.getConnection(function (err, connection) {
  
    var query =  connection.query('SELECT * FROM user_table WHERE username = ?',[username], 
    function (error, results, fields) { 
      if (err) {
        console.log("Error in query : %s ",err );
        res.send({"statusResponse":statusResponse});
      }
      
      if(results[0].username == username || !!results.username){
        if(results[0].password == password) {
          res.json({statusResponse:0,message:'login successful'})
        }
        else {
          res.json({statusResponse:2,message:'invalid password'})
        }
      }
      else {
        res.json({statusResponse:1,message:'Invalid Username '})
      }
    });
  });
}
