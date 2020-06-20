var str = "xiap52eixin22a";
var reg = /\d+[a-e]/g;

while(resu = reg.exec(str)){
    console.log(resu);
}

var fs = require("fs");

fs.readFile("./apache.js","utf-8",(err,data) =>{}
   // console.log(data)
)

var dd = __dirname;  //当前执行的 js文件所在的目录 绝对目录; C:\CustomSoftware\CodeShell------
var ff = __filename;  //包含正在执行的文件的 完整目录;   C:\CustomSoftware\CodeShell\am3.js------
console.log(dd+"------");
console.log(ff+"------");

var path = require("path");

var pp = path.join("c:","CustomSoftware","/CodeShell");  //拼接路径
console.log(pp+"++++++++++"); 

var http = require("http");
http.createServer((req,res) => {
    res.end("qqqqqqqqqqqqqq");
}).listen(80);
