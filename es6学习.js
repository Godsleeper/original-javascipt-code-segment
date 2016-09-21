//****************************************************promise******************************************
//pending --> resolved||pending --> rejected
//新建promise会立即执行
//基本用法
var promise = new Promise(function(resolve,reject)){
	if(success){
		resolve(data);//相当于callback,如果要在callback中处理数据，就要将success传入
	}else{
		reject(error);
	}
}

promise.then(function(data){
//resolve
},function(data){
//reject
});
//[例一]定时器
function timeout(ms){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms);
	})
}
timeout(100).then(()=>{console.log('hello')});
//[例二]异步加载图片
function loadAsyncImage=function(url){
	return new Promise(resolve,reject){
		var image = new Image();
		image.onload = () =>{
			resolve(image);
		};
		image.onerror = () =>{
			reject(new Error('Could not load image at '+url));
		};
		image.src=url;
	}
}
//[例三]ajax
var getJSON = function(url){
	return new Promise(resolve,reject){
		var xhr = new XMLHttpRequest();
		client.open('GET',url);
		client.onreadystatechange=function(){
			if(xhr.readyState !==4){
				return;
			}
			if(xhr.status ===200){
				resolve(xhr.response);
			}else{
				reject(new Error(xhr.statusText));
			}
		}
		xhr.responseType = 'json';
		xhr.setRequestHeader('Accept','application/json');
		xhr.send();
	}
}
getJSON(url).then(function(json){
	console.log(json);
},function(error){
	console.error(error);
})
//[例三]
//resolve中传入promise对象
var p1 = new Promise(function(resolve,reject){
	setTimeout(()=>reject(new Error('fail')),3000)
})

var p2 = new Promise(function(resolve,reject){
	setTimeout(()=>reject(p1),1000)
})
//then方法
//1.多个将回调返回的数据继续处理
$.getJSON(url)
	.then(callback1(json){ return json.post})
		.then(callback2(post){});
//2.多个异步回调嵌套，与上面的区别，上面的回调不是异步的，会一直等着函数处理，下面的是异步，可以继续执行之后的代码
$.getJSON(url)
	.then(callback(json){return getJSON(json.url)})
		.then(callback2(json.data){})






//************************************************函数******************************************
//1.1函数参数的默认值
function log(x=1,y=2){
	return x+y;//return 3
}

//箭头函数
//1.基本形式
var f = function(v){return v;}
var = v => v;

//1.1 不需要参数或需要多个参数，使用圆括号代替参数
//[1]
var f = function(){return 5;}
var f = () => 5
//[2]
var sum = function(num1,num2){return num1+num2;}
var sum = (num1,num2) =>num1+num2;

//1.2 代码多于一条语句，使用大括号括起来，并使用return返回
var sum = (num1,num2) => {return num1+num2}//大括号被解释为代码块

//1.3箭头函数返回一个对象，必须在对象外面加上括号
var obj = function(id){
	return{
		id:id,
		name:'temp'
	}
}
var obj = id =>({id:id,name:'temp'})

//1.4可以与变量解构一同使用
//1.5 简易工具函数
//[1]
const isEven = function(n){return n%2==0}
const isEven = n => n%2==0;
//[2]
const square = function(n){return n*n;}
const square = n => n*n;

//1.5简化回调函数
//[1]
[1,2,3].map(function(item){return item*item;});
[1,2,3].map(item=>item*item);
//[2]
var result = array.sort(function(a,b){return a-b})
var result = array.sort((a,b) => a-b;)

//1.6注意点
//=>箭头函数函数体内的this就是定义时所在的对象，不是使用时的，this被绑定
//=>不可以当作构造函数，因为无法使用new命令
//=>不可以实用arguments对象，只能用rest参数代替
//=>不可以使用yield，箭头函数无法用作Generator



//变量的解构
//1.1 数组的解构==>模式匹配
var a=1;var b=2;/*==>*/var [a,b]=[1,2];
var [a,...b]=[1,2,3,4]//b=[2,3,4];
var [a,...b]=[1]//b=[];
var [a,b,c]=[1,[1,1],1]//b=[1,1]
//1.2 


//**********************************************class*********************************************
//1.基本语法
//ES5写法
function Point(x,y){
	this.x=x;
	this.y=y;
}
//公用的原型方法
Point.prototype.toString()=function(){};
Point.prototype.toValue()=function(){};
//或是
Point.prototype={
	constructor:function(){},
	toString:function(){},
	toValue:function(){}
}
//或是
Object.assign(Point.prototype,{
	toString:function(){},
	toValue:function(){}
})
//ES6写法
class Point(){
	//每个对象独立的构造属性写在这里
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){}
	toValue(){}
}//此时所有方法都不可枚举

//1.2 constructor方法
//类的默认方法，通过new命令生成对象实例时自动调用该方法，一个类必须有constructor方法，如果没有显示定义，会自动默认添加
//默认返回实例对象（用this构造的对象），也可以返回别的对象
//实例对象遵守规则：除非显示定义在this上，为每个实例定制属性，否则都定义在原型进行公用。
//原型的使用
//构造函数或类==>Object.prototype
//实例对象==>Object.getPrototypeOf(obj)||p1._proto_
class Foo{
	constructor(){
		return Object.create(null);
	}
}
new Foo() instanceof Foo //false

//1.3 class表达式
//指代当前类代替this
const MyClass = class Me{
	getClassNmae(){
		return Me.name;
	}
}
//立即执行的class
let person = new Class{
	constructor(x){
		this.x=x;
	}
	sayName(){
		console.log(this.x);
	}
}("Tang");
//1.3继承
class Child extends Father{
	constructor(fatherX,fatherY,childX){
		super(fatherX,fatherY);//进行父类的构造，没有这段会无法获得this对象
		this.childX=childX;
	}
}

//****************************************数据结构******************************************
//set
//定义
var set =new Set([1,2,3]);
var set =new Set(array);
[1,2,3,4].map((x)=>set.add(x));
//转化为数组
//遍历操作
//keys()返回键名
//values()返回键值
//entries()返回键值对，没有键名键名和键值相同
//forEach()使用回调函数遍历所有成员
var array= [...set];
var array=Array.from(set);
var array=[...new Set(array)];
for(let item of set.keys()){
	array.push(item);
}
for(let item of set,values()){
	array.push(item);
}
//实例操作方法
set.add();
set.delete();
set.has();//返回bool
set.clear();//清空