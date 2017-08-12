/*add user api*/
exports.save = function(req,res){
  console.log("req",req);
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  //getting connection
  req.getConnection(function (err, connection) {

    var data = {
      user_id       :input.user_id,
      first_name    :input.first_name,
      last_name     :input.last_name,
      mobile_number :input.mobile_number,
      phone_number  :input.phone_number,
      email_id      :input.email_id,
      address       :input.address,
      tin_number    :input.tin_number,
      pan_no        :input.pan_no,
      aadhar_no      :input.adhar_no,
      cretaed_date  :input.created_date,
      created_by    :currentDate,
      updated_date  :currentDate,
      created_by    :input.created_by,
      updated_by    :input.updated_by,
      image_path    :input.image_path,
      user_role     :input.user_role,
      username      :input.username,
      password      :input.password,
      gst_number    :input.gst_number,
      active_status :input.status
    };
    var query = connection.query("INSERT INTO user_table set ? ",data, function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "fail register"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "user register successfully."}});
    });
  });
};

/*delete user */
exports.updateUser = function(req,res){
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  var data = {
    user_id       :input.user_id,
    first_name    :input.first_name,
    last_name     :input.last_name,
    mobile_number :input.mobile_number,
    phone_number  :input.phone_number,
    email_id      :input.email_id,
    address       :input.address,
    tin_number    :input.tin_number,
    pan_no        :input.pan_no,
    aadhar_no      :input.adhar_no,
    updated_date  :currentDate,
    updated_by    :input.updated_by,
    image_path    :input.image_path,
    user_role     :input.user_role,
    username      :input.username,
    password      :input.password,
    gst_number    :input.gst_number
  };

  //getting connection
  req.getConnection(function (err, connection) {

    var user_id  = input.user_id;
    var query = connection.
    query('update user_table set first_name = ? ,last_name = ? ,mobile_number = ? , phone_number=?, '+
            ' email_id=?, address=?,tin_number=? ,pan_no=?,aadhar_no=?,image_path=?,user_role=?,' + 
              'username=?,password=?,updated_date = ? ,updated_by = ? where user_id = ?', 
                [data.first_name,data.last_name,data.mobile_number,data.phone_number,data.email_id,data.address,data.tin_number,
                  data.pan_no,data.aadhar_no,data.image_path,data.user_role,
                  data.username,data.password,data.gst_number,data.updated_date,data.updated_by,data.user_id], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "successfully updated."}});
    });
  });
};

/*update  user */
exports.deleteUser = function(req,res){
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  //getting connection
  req.getConnection(function (err, connection) {

    var user_id  = input.user_id;
    var query = connection.query('update user_table set active_status = ? ,updated_date = ? ,updated_by = ? where user_id = ?', ["0",currentDate,"System",user_id], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "delete successfully."}});
    });
  });
};


/*Get User list */
exports.getUserList = function(req,res){
  //status o means fail 
  var statusResponse = 0;
  //active user status
  var status = 1;
  //getting connection
  req.getConnection(function (err, connection) {

    var query = connection.query('select * from user_table where active_status =? ',[status], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "success"},data:{"userlist":rows}});
    });
  });
};


/*Get User by userid */
exports.getUserById = function(req,res){
  //status o means fail 
  var statusResponse = 0;
  //get object
  var input = JSON.parse(JSON.stringify(req.body));
  //active user status
  var status = 1;
  //user id 
  var user_id = input.user_id;
  //getting connection
  req.getConnection(function (err, connection) {
  
    var query = connection.query('select * from user_table where active_status =? and  user_id = ?',[status,user_id], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({"statusResponse":statusResponse});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "success"},data:{"user":rows}});
    });
  });
};
















