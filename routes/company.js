/*company.js */
exports.getComapny    = function(req,res){
  
  //getting connection
  req.getConnection(function (err, connection) {

    var query = connection.query('select * from company_table',function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "success"},data:{"companylist":rows}});
    });
  });
}


/*addcompanyr api*/
exports.addcompany = function(req,res){
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  //getting connection
  req.getConnection(function (err, connection) {

    var data = {
      company_name    :input.company_name,
      created_by      :input.created_by,
      updated_by      :input.updated_by,
      created_date    :currentDate,
      updated_date    :currentDate,
      active_status : 1
    };
    var query = connection.query("INSERT INTO company_table set ? ",data, function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "company register successfully."}});
    });
  });
};


/*update  user */
exports.deleteCompany = function(req,res){
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  //getting connection
  req.getConnection(function (err, connection) {

    var company_id  = input.company_id;
    var query = connection.query('update company_table set active_status = ? ,updated_date = ? ,updated_by = ? where company_id = ?', 
      ["0",currentDate,"System",company_id], function(err, rows)
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



/*addcompanyr api*/
exports.updatecompany = function(req,res){
  console.log("req",req);
  //stringy obj
  var input = JSON.parse(JSON.stringify(req.body));
  var company_id  = input.company_id;

  //status o means fail 
  var statusResponse = 0;
  //getting current date
  var currentDate = new Date();

  //getting connection
  req.getConnection(function (err, connection) {

    var data = {

      company_name    :input.company_name,
      updated_by      :input.updated_by,
      updated_date    :currentDate
    };
    var query = connection.query("update company_table  set company_name = ? ,updated_by = ?,updated_date = ? where company_id = ?",
      [data.company_name,data.updated_by,data.updated_date,company_id], function(err, rows)
    {
      if (err) {
        console.log("Error inserting : %s ",err );
        res.send({response:{"statusResponse":statusResponse,"message": "failed"}});
      }
      statusResponse = 1;
      res.send({response:{"statusResponse":statusResponse,"message": "company updated successfully."}});
    });
  });
};
