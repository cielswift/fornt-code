var art = require("art-template");
var http = require("http");
var moment = require("moment");
var fs = require("fs");
art.defaults.root = "./";

var server = http.createServer();  //服务端渲染页面

// var art = require("art-template");
// art.defaults.root = "./";  //改为当前路径
// var html = art("./apf.html",{data:[{value:"阀手动阀"}]}); 
// console.log(html);

server.on("request", function (request, response) {

    if (request.url == "/"){
        var file_array = [];

    fs.readdir("./", "utf-8", function (err, files) {  

      for (var x_x = 0; x_x < files.length; x_x++) {

        (function (x_x) {       //闭包
          fs.stat(files[x_x], "utf-8", function (err, data) {   

            file_array[x_x] = {};
            file_array[x_x].name = files[x_x];
            file_array[x_x].size = data.size;
            file_array[x_x].time = moment(data.mtime).format("YYYY-MM-DD hh:mm");  
              
            if (data.isFile()) {  //是否是文件
              file_array[x_x].type = "file"
            } else if (data.isDirectory()) {
              file_array[x_x].type = "dir"
            }

            if (file_array.length == files.length) {
                var html = art("./apf.html",{ci:file_array});
                 response.end(html);
            }
          });
        })(x_x);    
      }

    });
    }
});
server.listen(80, function () {
    console.log("please visit in 127.0.0.1");
  });