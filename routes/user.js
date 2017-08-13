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
      first_name    :input.firstname,
      last_name     :input.lastname,
      mobile_number :input.mobile_no,
      phone_number  :input.phone_no,
      email_id      :input.email_id,
      address       :input.address,
      tin_number    :input.tin_no,
      pan_no        :input.pan_no,
      aadhar_no     :input.adhar_no,
      cretaed_date  :currentDate,
      updated_date  :currentDate,
      created_by    :input.created_by,
      updated_by    :input.updated_by,
      image_path    :input.image_url,
      role_id       :input.user_role_id,
      username      :input.username,
      password      :input.password,
      gst_number    :input.gst_number,
      active_status : 1
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
    first_name    :input.firstname,
    last_name     :input.lastname,
    mobile_number :input.mobile_no,
    phone_number  :input.phone_no,
    email_id      :input.email_id,
    address       :input.address,
    tin_number    :input.tin_no,
    pan_no        :input.pan_no,
    aadhar_no     :input.adhar_no,
    cretaed_date  :currentDate,
    updated_date  :currentDate,
    created_by    :input.created_by,
    updated_by    :input.updated_by,
    image_path    :input.image_url,
    role_id       :input.user_role_id,
    username      :input.username,
    password      :input.password,
    gst_number    :input.gst_number
  };

  //getting connection
  req.getConnection(function (err, connection) {

    var user_id  = input.user_id;
    var query = connection.
    query('update user_table set first_name = ? ,last_name = ? ,mobile_number = ? , phone_number=?, '+
            ' email_id=?, address=?,tin_number=? ,pan_no=?,aadhar_no=?,image_path=?,role_id=?,' + 
              'username=?,password=?,updated_date = ? ,updated_by = ? where user_id = ?', 
                [data.first_name,data.last_name,data.mobile_number,data.phone_number,data.email_id,data.address,data.tin_number,
                  data.pan_no,data.aadhar_no,data.image_path,data.role_id,
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
  //
  var input = JSON.parse(JSON.stringify(req.body));
  var listSize = input.size;
  var userIdFrom = input.useridfrom;
  var statusType = input.statustype;
  var status1 = 0;
  var status2 = 1;  
  //active user 
  if(statusType == 1 ) {
    status2 = 1;
    status1 = 1;
  }
  //deactive user
  else if(statusType == 0) {
    status2 = 0;
    status1 = 0; 
  }
  
  //getting connection
  req.getConnection(function (err, connection) {

    var query = connection.query('select * from user_table where (active_status =? or active_status =?) and user_id > ? limit  ?',
      [status1,status2,userIdFrom,listSize], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
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
  
    var query = connection.query('select * from user_table where active_status =? and  user_id = ?',
      [status,user_id], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "success"},data:{"user":rows}});
    });
  });
};
















