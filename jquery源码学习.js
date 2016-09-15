//在使用jquery对象时，没有用到构造函数和new
var a=new aQuery();
a.init();
//可能在内部返回了jquery对象？=>这样会陷入死循环
var aQuery=function(){
	return new aQuery();
}
//使用了如下的结构？
var aQuery = function(selector,context){
	return aQuery.prototype.init();
}

aQuery.prototype={
	init:function(){
		return this;
	}
}