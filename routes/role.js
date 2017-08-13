/*Get User by userid */
exports.getRole    = function(req,res){
  
  //getting connection
  req.getConnection(function (err, connection) {

    var query = connection.query('select * from user_role',function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "success"},data:{"rolelist":rows}});
    });
  });
}
