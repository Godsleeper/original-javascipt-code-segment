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



//*************************************************箭头函数***********************************
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