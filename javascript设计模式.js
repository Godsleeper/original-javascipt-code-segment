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
