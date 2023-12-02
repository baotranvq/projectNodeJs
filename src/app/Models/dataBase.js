var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'shoe_shop'
});
 
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' );
      return;
    }
    console.log('Successfully to connected ');
});
module.exports = db;