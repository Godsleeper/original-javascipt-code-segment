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
//IE不支持getElementsByClassNmae所以自己封装一个
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
		xmlHttpReg= new Active XObject("Microsoft.XMLHTTP")//IE5 6
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
	xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
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