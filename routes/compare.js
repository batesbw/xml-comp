var express = require('express');
var xmlcompare = require('node-xml-compare');
var router = express.Router();


router.post('/', function(req, res) {

   var returnJSONResults = function(baseName, queryName) {
   var XMLPath1 = "public/tmp/xml1.xml";
   var XMLPath2 = "public/tmp/xml2.xml";
   var xml1 = loadXMLDoc(XMLPath1);
   var xml2= loadXMLDoc(XMLPath2);

   xmlcompare(xml1, xml2, function(result) {
     res.render('compare', { xml1Show: result['-'], xml2Show:  result['+'] });
   });

  function loadXMLDoc(filePath) {
      var fs = require('fs');
      var json;
      try {
          var fileData = fs.readFileSync(filePath, 'ascii');
      return fileData;
      } catch (ex) {console.log(ex)}
  }
  }();
});

module.exports = router;
