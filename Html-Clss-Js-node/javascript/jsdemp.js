alert("hello Javascript i im learns for you")
var age = 3;   //定义一个变量 var 和 ; 不写也行,
age="he learns english every day";  //js弱类型,类型重新定义为字符串,单引号,双引号都代表字符串
age=true;
alert(age+10);

var a = 37;
alert(a/10*10); //算数运算符 x/ +- ;因为是弱类型,乘除不会整除,会自动保留小数;
alert("12"-1);  //会得到11,-号会把12转为整数, +号会连接字符串;
alert(true+1);  //算数运算时;js中false就是0,或者null,非0,非空就是true,默认用1表示;

3>0?alert("yes"):alert("no");  //三元运算符
//undefined ;未定义,比如 var xx ; alert(xx);   alert(xx==undefined)

alert(typeof("string"));  // 获取类型  ;string,number,boolean
alert(typeof(123)=="number");  //还可以判断类型
alert(typeof(true));

String.prototype.sayHello=function () {
    return "hello world";
}