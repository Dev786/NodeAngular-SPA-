var express = require('express');
var routeRequest = express();
var pathModule = require('path');
var helperModules = require("./helperModules").module;
var bodyparser = require("body-parser");

var urlEncodedParser = bodyparser.urlencoded({
    extended: false
});

var jsonParser = bodyparser.json();
//making resources accessible
routeRequest.use(express.static("css"));
routeRequest.use(express.static("js"));
routeRequest.use(express.static("staticPages"));

//Creating and checking Connection with mysql admin
helperModules.createConnection("localhost", "root", "", "test");

routeRequest.get('/', function (request, response) {
    response.sendfile(pathModule.join(__dirname, "index.html"));
});

routeRequest.get("/user", function (request, response) {
    var selectQuery = "select * from mydata";
    helperModules.Query("SELECT", selectQuery, null, response);
});

routeRequest.post('/user', jsonParser, function (request, response) {
    //console.log(request.body);
    var insertQuery = "Insert into mydata(fname,lname,salary) values(?,?,?)";
    helperModules.Query("INSERT", insertQuery, [request.body.fname, request.body.lname, request.body.salary], response);
});

routeRequest.get("/search/:id", function (request, response) {
    // console.log(request.params.id);
    var selectQuery = "select * from mydata where id = ?";
    helperModules.Query("SELECT", selectQuery, [request.params.id], response);
});


var serverInfo = routeRequest.listen(8080, function () {
    console.log("listening to " + serverInfo.address().address + " address");
    console.log("listening to " + serverInfo.address().port + " port");
});