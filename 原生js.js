//原生js
//*************************************************************window调用队列函数addLoadEvent*************************************************
function addLoadEvent(func)
{
	var oldonload=window.onload;
	if(typeof oldonload!="function")//如果当前处理函数队列中没有函数的话
	{
		window.onload=func;//绑定传递的函数
	}
	}else{
		window.onload=function{
			oldonload();
			func();//否则先调用当前的，再调用之后的
		}
	}
}
//*************************************************************window调用队列函数addLoadEvent*************************************************


//*************************************************************通过class获取节点的方法*************************************************
//IE不支持getElementsByClassNmae所以自 己封装一个
//该函数传入要找的类名和父级（方便缩小范围，如果不传入就直接使用全局的document）将全局或父级放在变量里，把所有的节点对象都放在数组里面。有可能是全部的，也有可能是你规定了父级下的
//对该数组进行遍历，如果类名是你传入的，就把它放在另一个准备好的数组中，再把准备好的数组return出去，得到你要找的对应class的节点数组
function getByClass(clsName,parent){
	var oParent=parent?document.getElementById(parent):document,
	eles=[],
	elements=oParent.getElementsByTagName('*');
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].className==clsName)
		{
			eles.push(elements[i]);
		}
	}
	return eles;
}
//*************************************************************通过class获取节点的方法*************************************************

//*****************************************************阻止事件冒泡**************************************************
function stopBubble(e)
{
	e=e||window.event;
  	if(e.stopPropagation())
  		{
  			e.stopPropagation();
  		}else{
  			e.cancelBubble==true;
  		}

}
//*****************************************************阻止事件冒泡**************************************************

//*****************************************************获取css样式**************************************************
	function getStyle(obj,attr)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr]//attr是属性，比如width等
		}
		else
		{
			return getComputedStyle(obj,false)[attr];
		}
	}

//*****************************************************完美运动框架，某个元素，运动到某个数值的函数**************************************************
	function startMove(obj,target,attr,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(move,30);
		function move(){
			var icur=0
			if(attr=="opacity")
			{
				icur=Math.round(parseFloat(getStyle(obj,attr)))*100
			}
			else{
				icur=parseInt(getStyle(obj,attr))
			}
			var speed=(target-icur)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(icur==target)
			{
				clearInterval(timer);
				if(fn){fn();}
			}else{
				if(attr=="opacity"){
					obj.style.opacity=(icur+speed)/100
				}else{
					obj.style[attr]=icur+speed+"px";	
				}
				
			}
		}
	}

	//**************************************************声明对象时选择某个对象作为原型***********************************************//
	if(typeof Object.create!=="function")
	{
		Object.create=function(o){
			var F=function(){};
			F.prototype=o;
			return new F();
		}
	}
	var another_stooge=Object.create(stooge);
	//**************************************************声明对象时选择某个对象作为原型***********************************************//

	//*************************************************跨浏览器的的事件处理对象***********************************************//
	//event是浏览器或用户自身的执行的动作，事件处理程序就是处理事件的函数
	var EventUtil={
		addHandler:function(element,type,handler){//添加事件
			if(element.addEventListener){
				element.addEventListener(type,handler,false)//事件处理程序，type[事件]，handler[函数],false[冒泡阶段调用]
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler)//ie写法，时间前面加on
			}else{
				element["on"+type]=handler;
			}
		},

		removeHandler:function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false)
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handler)
			}else{
				element["on"+type]=null;
			}
		},

		getEvent:function(event){//获取事件对象,event对象包含与创建他的特定事件的属性和方法
			return event?event:window.event;
		},

		getTarget:function(){
			return event.target||event.srcElement;
		},

		preventDefault:function(event){//阻止默认事件
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue=false;
			}
		},

		stopPropagation:function(event){//阻止事件冒泡
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},

	}
//*************************************************事件委托***********************************************//
	// 结构 <ul id="mylinks">
	// 		<li id="1">1</li>
	// 		<li id="2">2</li>
	// 		<li id="3">3</li>
	// 	</ul>
	var list = document.getElementById("myLinks")
	EventUtil.addHandler(list,"click",function(event){
		event = EventUtil.getEvent(event)
		var target = EventUtil.getTarget(event);
		switch(target.id){
			case "1":
			break;
			case "2":
			break;
			case "3":
			break;
		}
	})

//*************************************************事件委托***********************************************//

//************************************************原生ajax***********************************************//
//get请求
function ajax(){
	var xmlHttpReq= null;
	if(window.ActiveXObject){
		xmlHttpReg= new ActiveXObject("Microsoft.XMLHTTP")//IE5 6
	}else if(window.XMLHttpRequest){
		xmlHttpReq= new XMLHttpRequest();//实例化XHR对象
	}

	xmlHttpReq.open("GET","test.php",true);//使用open方法设置http请求的方式，URL和异步
	xmlHttpReq.onreadystatechange=RequestCallBack;//设置回调函数,接收到请求会自动调用
	xmlHttpReq.send(null)//get方法不传输数据
	function RequestCallBack(){//只要接收到响应就会调用，不管返回的是不是成功，所以需要加入判断
		if(xmlHttpReq.readyState == 4){
			if(xmlHttpReq.status == 200){
				document.getElementById("resText").innerHTML=xmlHttpReq.responseText;//将返回的数据加入到dom中
			}
		}
	}
}
//post请求
function postajax(){
	var xmlHttpReq= null;
	if(window.ActiveXObject){
		xmlHttpReg= new Active XObject("Microsoft.XMLHTTP")//IE5 6
	}else if(window.XMLHttpRequest){
		xmlHttpReq= new XMLHttpRequest();//实例化XHR对象
	}
	xmlHttpReq.open("POST","test.php")
	var data=//表单元素的值
	xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttpReq.send(data);
	xmlHttpReq.onreadystatechange=RequestCallBack;
	function RequestCallBack(){//只要接收到响应就会调用，不管返回的是不是成功，所以需要加入判断
		if(xmlHttpReq.readyState == 4){
			if(xmlHttpReq.status == 200){
				document.getElementById("resText").innerHTML=xmlHttpReq.responseText;//将返回的数据加入到dom中
			}
		}
	}
}
//完整封装
function ajax(options){
	options=options||{};
	options.type=(options.type||"GET").toUpperCase();
	options.dataType=options.dataType||"json";
	var params=formatParams(options.data);//将json对象转换成url字符串
	var XHR=null;
	if(window.XMLHttpRequest){
		XHR=new XMLHttpRequest();
	}else{
		XHR=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//xhr对象的readystate属性从0-4变化，每个变化对应一个onreadystatechange
	XHR.onreadystatechange=function(){
		if(XHR.readyState==4){
			var status = XHR.status;
			if(status>=200&&status<300){
				options.success&&options.success(XHR.responseText);
			}else{
				options.fail&&options.fail(status);
			}
		}
	}
	//发送
	if(options.type=="GET"){
		XHR.open("GET",options.url+"?"+params,true);
		XHR.send(null);
	}else(options.type=="POST"){
		XHR.open("POST",options.url,true);
		XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//设置请求头，规定post的方式
		XHR.send(params);
	}
}
//格式化发送文本,传入一个json对象，传出一个字符串
function params(data){
	var arr=[];
	for(var name in data){
		arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));//包含特殊字符，需要编码
	}
	arr.push(("result="+Math.random()).replace("."));//拒绝缓存，是一个新的请求
	return arr.join("&");

}

ajax({
	url:"/admin/movie/list",
	type:"POST",
	data:{name:"a",age:20},
	dataType:"json",
	success:function(response){
		//成功发送了请求，对返回的请求体进行处理
	}
	fail:function(status){
		//失败了，将状态码打印出来
	}

})
//************************************************原生ajax***********************************************//

//************************************************创建对象的各种方法***********************************************//
//工厂模式
function createObject(name,age,job){
	var person=new Object();
	person.name=name;
	person.age=age;
	person.job=job;
	person.sayname=function(){
		alert(this.name)//this的执行对象是person对象
	}
	return person;
}//缺点 新建的对象都是以object新建的，无法进行识别，不是createObject的实例

//构造函数模式
function createObject(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	this.sayName=function(){
		alert(this.name);
	}
}
  // 使用new操作符经历三个阶段：1.创建新对象
		// 					 2.构造函数作用域赋给新对象，this作为obj的引用
		// 					 3.添加属性
		// 					 4.返回对象
var personObj=new createObject("xiaoming",16,"student");

//原型模式
function createObject(name,age,job){
	createObject.prototype.name="xiaoming"
	createObject.prototype.age=15;
	createObject.prototype.job="student";
	createObject.prototype.sayName=function(){
		alert(this.name);
	}
}//生成的每个实例都不具有方法和属性，但是根据原型链向上找到proto都可以找到同样的属性

//组合模式
function createObject(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	this.friends={"a","b"}
}//构造函数模式，给对象绑定每个对象特有的属性

createObject.prototype={
	sayName:function(){
		alert(this.name);
	}
}//在原型中加入每个对象都会有的属性

Object.defineProperty(createObject.prototype,"contructor",{
	enumerable:false;
	value:createObject;//通过for循环找不到这个属性
})//通过对constructor的处理使他吻合正常的原型对象中的cons属性

//********************************不定期更新图片轮播*************************************
window.onload=function(){
		var imgbox=document.getElementsByClassName("imgbox")[0];
		var btnlist=document.getElementsByTagName("li");
		console.log(imgbox.style.left);
		function clear(){
			~function(i){
				for(var i=0;i<btnlist.length;i++){
				btnlist[i].className="btn ";
			}
		}(i);
		}

		for(var i=0;i<btnlist.length;i++){
			~function(i){
				btnlist[i].setAttribute("title",i);
				btnlist[i].onclick=function(){
					clear();
					var offset=i*(-700)+"px";
					console.log(offset);
					imgbox.style.left=offset;
					this.className+=" active";		
				}
			}(i)
		}
	}
//********************************不定期更新图片轮播*************************************

//*********************************继承****************************************
//原型链继承
function SuperType(){
	this.property=true;
}//父类

SuperType.prototype.getSuperType=fucntion(){
	return this.property;
}

function SubType(){
	this.subproperty=false;
}//子类

SubType.prototype = new SuperType();//使父类的实例对象成为子类的原型对象

SubType.prototype.getSubValue=function(){
	return this.subproperty;
}//弊端：修改原型中单属性会改变每一个实例对象的属性，因为这些属性实例对象都是没有的，都要到原型里去找

//经典继承
function SuperType(name){
	this.name=name;//可以设置的初始化值
	this.property=true;//默认的初始化值
}//父类

function SubType(){
	SuperType.call(this,"xiaoming");//使用的还是supertype的方法，但是使用call将执行对象改为this。若子类new一个对象执行的就是子类对象
	this.age=29;
}//经典继承缺点：方法都在构造函数中，每次实现基类都要重新使用call，就不是函数复用了。

//组合继承
function SuperType(name){
	this.name=name;
	this.colors=["1","2","3"];
}

SuperType.prototype.sayName = function(){
	alert(this.name);
}

function SubType(name,age){
	SuperType.call(this,name);
	this.age=age;
}

SubType.prototype = new SuperType();
Object.defineProperty(SubType.prototype,"contructor",{
	value:SubType;
	enumerable:false;
})

SubType.prototype.sayAge=function(){
	alert(this.age);
}
//*********************************继承****************************************
//*********************************跨域方法总结********************************
//JSONP
function jsonp(options){
	options=options||{};
	if(!options.url||!options.callback){
		throw new Error("参数不合法");
	}
	//创建script标签并加入
	var callbackName=('jsonp_'+Math.random()).replace(".","");
	var oHead = document.getElementsByTagName("head")[0];
	options.data[options.callback] = callbackName;
	var params = formatParams(options.data);
	var oS=document.createElement("script");
	oHead.appendChild(oS);
	//创建jsonp回调
	window.callbackName = function(json){
		oHead.removeChild(oS);
		clearTimeout(oS.timer);
		window.callbackName = null;
		options.success&&options.success(json);//不用自己定义callback，只需写好success即可
	}

	oS.src = options.url+'?'+params;
	//超时处理
	if(options.time){
		oS.timer = setTimeout(function(){
			window.callbackName=null;
			oHead.removeChild(oS);
			options.fail&&options.fail({message:"超市"})；
		},time)
	}
	//格式化参数
	function params(data){
	var arr=[];
	for(var name in data){
		arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));//包含特殊字符，需要编码
	}
	return arr.join("&");

	}
}
//window.name

