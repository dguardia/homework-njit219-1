var http = require('http');
var fs = require('fs');
var time = require('dateformat');
var csv = require('node-csv');

console.log("Starting");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var server = http.createServer(function(request, response){
    console.log("Received request:" + request.url);
    fs.readFile("./public" + request.url, function(error, data){
        if(error){
            response.writeHead(404, {"Content-Type":"text-plain"});
            response.end("Sorry the page was not found");
        } else {
            response.writeHead(200, {"Content-Type":"text/html"});
            response.end(data);
        }
    });
    fs.appendFile("./public/test.csv", data(request,time), function(error){
        if(error){
            console.log("An error has occurred" + error);
        }
    });

});
server.listen(port, host, function(){
    console.log("Listening: http://" + host + ":" + port);
});

fs.watchFile("config.json", function () {
    config = JSON.parse(fs.readFile("config.json"));
    host = config.host;
    port = config.port;
    server.close();
    server.listen(port, host, function(){
        console.log("Now listening \n http://" + host + ":" + port);
    });
});

var data = function(request, time){
    console.log("File has been written");
    var now = new Date();
    time = "Date"+"\t"+ time(now)+"\n";
    var useragent ="User Agent: " + "\t" + request.headers['user-agent'] + "\t";

    var result = useragent + time;
    return result;
};


server.on("writinfigle", function(){
    console.log("Start listening for events....");
});
server.emit("writinfigle");
