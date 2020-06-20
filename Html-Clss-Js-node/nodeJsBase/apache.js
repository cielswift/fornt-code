var http = require("http");
var fs = require("fs");
var moment = require("moment");

var server = http.createServer();

server.on("request", function (request, response) {

  if (request.url == "/") {
    fs.readFile("apf.html", function (err, data) {
      response.end(data);
    });
  }

  if (request.url == "/jquery-3.3.1.js") {
    fs.readFile("./jquery-3.3.1.js", "utf-8", function (err, data) {
      response.end(data);
    })
  };

  if (request.url == "/getfilelist") {  //显示本地文件列表
    var file_array = [];

    fs.readdir("./", "utf-8", function (err, files) {  //读取当前目录的所有文件,文件夹

      for (var x_x = 0; x_x < files.length; x_x++) {

        (function (x_x) {       //闭包
          fs.stat(files[x_x], "utf-8", function (err, data) {   //stat获取文件的详细信息

            file_array[x_x] = {};
            file_array[x_x].name = files[x_x];
            file_array[x_x].size = data.size;
            file_array[x_x].time = moment(data.mtime).format("YYYY-MM-DD hh:mm");  //格式化时间

            if (data.isFile()) {  //是否是文件
              file_array[x_x].type = "file"
            } else if (data.isDirectory()) {
              file_array[x_x].type = "dir"
            }

            if (file_array.length == files.length) {

              var f_e = JSON.stringify(file_array); //数组转字符串 ;json字符串 ;序列化
              response.end(f_e);
            }
          });
        })(x_x);     //匿名函数自调用
      }

    });
  }

  if (request.url == "/aaa.mp4") {
    fs.readFile("./21.今天内容总结.mp4", function (err, data) {
      response.end(data);
    });
  }

});

server.listen(80, function () {
  console.log("please visit in 127.0.0.1");
});
