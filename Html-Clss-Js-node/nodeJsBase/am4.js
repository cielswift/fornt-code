var arr = new Array();

function Human(){ 
   }

Human.prototype = arr;

Human.prototype.aaa= function (){
    console.log("aaaaaa");
}

var h =new Human();

h.push("ss");

var r = h.pop();

console.log(r);
