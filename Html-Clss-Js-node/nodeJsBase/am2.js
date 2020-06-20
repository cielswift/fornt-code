var te = require("./am1");

console.log(te.h_two);
te.h_one.kill();
te.h_two.back();

console.log("--------------------------------------------------+++++++++++++++++++++++++++++++++++++++++++++++")
var mysql   = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'mysql',
  database : 'ssm_empcrud_one',
  charset  : "utf8_general_ci",
  debug  : false
});
 
connection.connect(function (err){
    console.log("go in connection database.........................................");
});
 
connection.query('select * from t_emp where e_id = "371426001002GB00230F00013041"', function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].e_name);
});

 
connection.end();

//var connection = mysql.createConnection('mysql://root:mysql@127.0.0.1/ssm_empcrud_one?debug=true&charset=utf8_general_ci');
