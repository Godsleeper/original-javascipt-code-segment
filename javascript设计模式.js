//****************************************************单例模式************************************************
//有类型依赖的单例
var createLoginLayer = (function(){
	var div;
	return function(){
		if(!div){
			var div = document.createElement('div');
			div.innerHTML='我是登录浮窗';
			div.style.display='none';
			document.body.appendChild('div');
		}
		return div;
	}
}());
button.addEventListener('click',function(){
	var loginLayer = createLoginLayer();
	loginLayer.style.display = 'block';
})


//通用的惰性单例
var getSingle =function(obj){
	var result;//result储存在闭包中,储存了创建函数返回的div，永远不会被销毁
	return function(){
		return result||(result=obj.apply(this,arguments))
	}
}

var createLoginLayer = function(){
	var div = document.createElement('div');
	div.innerHTML='我是登录浮窗';
	div.style.display='none';
	document.body.appendChild('div');
	return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);
button.addEventListener('click',function(){
	var loginLayer = createSingleLoginLayer();
	loginLayer.style.display = 'block';
})


//发布订阅模式(观察者模式)
//发布者模型
var event={
	clientList:[],//缓存列表
	listen:function(key,fn){
		if(!this.clientList[key]{
			this.clientList[key]=[];//判断某个事件的订阅列表是不是空的，如果是空的，就新建一个列表
		}
		this.clientList[key].push(fn);//将订阅的事件存入缓存列表
	},
	trigger:function(){
		var key = Array.prototype.shift.call(arguments);//取出订阅事件类型
		var fns = this.clientList[key];//找到订阅事件列表
		if(!fns||fns.length===0){
			return false;
		}
		for(var i=0;i<fns.length;i++){
			fn.apply(this,arguments)//依次调用订阅事件
		}
	},
	remove:function(key,fn){
		var fns = this.clientList[key];//取出事件缓存列表
		if(!fns){
			return false;
		}
		if(!fn){//如果没有传入回调函数，表示取消key对应
			fns&&(fns.length=0)//清空缓存队列
		}else{
			for(var i = fns.length-1;i>=0;i--){
				var _fn = fns[i];
				if(_fn===fn){
					fns.splice(i,1);//删除该函数
				}
			}
		}
	}
}


//类型装载器（深拷贝）
var installEvent = function(eventobj){
	for(var i in event){
		eventobj[i] = event[i];
	}
}

//用例
//普通
var usecase = {};
installEvent(usecase);
usecase.listen('event1',function(arguments){
	//订阅了事件的响应
})
usecase.trigger('event1',arguments);
//ajax
var login = {}；
installEvent(login);
//发布login事件
$.ajax('url',function(data){
	login.trigger('event',data)
})
//不同组件订阅login事件
var header = (function(){
	login.listen('event',function(data){
		header.setAvatar(data.avatar);//将头像信息传入
	})
	return{
		setAvatar:function(data){//返回一个对象，拥有setAvatar方法，使用闭包，可以一直存储data
			console.log(data);
		}
	}
}())
