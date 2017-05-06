var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var session = require('express-session');
var rand = require("random-key");
var router = express.Router();

router.use(session({
  cookieName: 'session',
  secret: 'dDt5cr0LUSnpG0nw7U1q3Brks',
}));

router.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

   var folderName = rand.generate(25);
   var dir = 'public/tmp/' + folderName; // generate random folder
   if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
       //req.session.dir = folderName;
    }

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../public/tmp');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});


router.get('/', function(req, res, next) {

    res.render('index');
});


module.exports = router;
