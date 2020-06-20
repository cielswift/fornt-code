var a;
(function(){
  if(a== undefined){
    console.log("null++++++")
  }
})();
// npm search monet  搜索
// npm install monet  安装 可以多个 空格隔开
//npm init  //初始项目

//npm install nodemon   ; snodemon inhttp.js

//把 package.json复制到一个新文件夹后 执行 npm install 即可复制整个项目结构


  function Hero(name){ //原型
    this.name=name;
  }
  
  Hero.prototype.kill = function(){
    console.log("大沙四方");
  }
  
  var h1 = new Hero("德莱厄斯");
  //h1.kill();
  
  Hero.prototype = {
    back:function(){
      console.log("人在塔在,大宝剑");
    }
  }
  
  //h1.kill();
  //h1.back();
  
  var h2 = new Hero("盖伦");
  
  //h2.back();

exports.h_one = h1; //导出数据
exports.h_two = h2;






