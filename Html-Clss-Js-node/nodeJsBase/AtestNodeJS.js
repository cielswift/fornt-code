const fs = require("fs");  //require导入fs模块,文件操作模块  (.\当前目录)
// fs.writeFile("a.txt","夏培鑫a","utf-8",function(err){ //写入
// 	console.log(err);
// });

//fs.mkdir("./xiapeixin",(er) => {console.log(er)}) //创建文件夹

var text ;
var url = require("url");

fs.readFile("./me.html","utf-8",function(error,data){  //读取文件 ,参数顺序决定内容而不是名称
		text=data;
});
///////////////////////////////////////////////////////////////////////////////////////

var http = require("http");
var server = http.createServer(); //返回httpserver

server.on("request",function(request,response){   //给request绑定一个事件


	var query = url.parse(req.url,true).query;  //获取请求参数对象
	var pathname = url.parse(req.url).pathname;  //请求地址
	

	var u_t = url.parse(request.url,true);  //把参数封装为一个json对象
	console.log(u_t);
	console.log(u_t.query);  //query就是这个对象

	if(request.url == "/"){
		response.setHeader("content-Type","text/html;charset=utf-8");
		response.write("<h1>welocme to nodeJS"+"中文测试</h1>");
		response.end(text);
	}else if(request.url=="/favicon.ico") {
				response.setHeader("content-Type","image/png");
     			response.end();
	}else if (request.url=="/25025.jpg"){
		fs.readFile("."+request.url,function(error,data){
			response.end(data);
		});
	}else{
			response.end();
	}

});

server.listen(80,function(){  //监听一个端口
	console.log("server boot success");
});
