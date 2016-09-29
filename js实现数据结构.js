//**************************************************快速排序*****************************************
	var swap=function(array,index1,index2){
		var aux = array[index1];
		array[index1]=array[index2];
		array[index2]=aux;
	};

	var quickSort = function(array){
		quick(array,0,array.length-1);
	};

	var quick = function(array,left,right){
		var index;

		if(array.length > 1){
			index = partition(array,left,right);
			if(left<index - 1){
				quick(array,left,index-1)
			}
			if(index<right){
				quick(array,index,right)
			}
		}
	};

	var partition = function(array,left,right){
		var pivot=array[Math.floor((right+left)/2)];
		var i = left;
		var j = right;
		while(i<=j){
			while(array[i]<pivot){i++;}
			while(array[j]>pivot){j--;}
			if(i<=j){
				swap(array,i,j);
				i++;
				j--;
			}
		}
		return i;
	}
//**************************************************快速排序*****************************************

//**************************************************冒泡排序******************************************
var bublesort = function(array){
	var temp=true;
	for(var i=1;i<array.length&&temp;i++){
		temp=false;
		for(var j=array.length-1;j>=i;j--){
			if(array[j-1]>array[j]){
				var _item=array[j];
				array[j]=array[j-1];
				array[j-1]=_item;
				temp=true;
			}
		}
	}
	return array;
}
//**************************************************冒泡排序******************************************

//**************************************************选择排序******************************************
var chosesort=function(array){
	for(var i=0;i<array.length-1;i++){
		var _item=i;
		for(var j=i+1;j<array.length;j++){
			if(array[_item]>array[j]){
				_item=j;
			}
		}
		if(i!=_item){
			var _temp=array[_item];
			array[_item]=array[i];
			array[i]=array[_temp];
		}
	}
}

//**************************************************选择排序******************************************

//*****************************************归并排序*****************************************
function merageSort(array){
	if(array.length==1){
		return array;
	}
	var mid = Math.floor(array.length/2);
	var left=array.slice(0,mid);
	var right=array.slice(mid);
	return merage(merageSort(left),merageSort(right));
}

function merage(left,right){
	var re=[];
	while(left.length>0&&right.length>0){
			if(left[0]<right[0]){
				re.push(left.shift());
			}else{
				re.push(right.shift());
			}
	}
	return re.concat(left).concat(right);
}
console.log(merageSort([2,4,65,2,4,5,4]))

//*****************************************归并排序*****************************************

//*****************************************直接插入排序*************************************
function insertSort(array){
	for(var i=1;i<array.length;i++){
		if(array[i]<array[i-1]){
			var guard=array[i];//
			var j=i-1;
			while(j>=0&&guard<array[j]){
				array[j+1]=array[j];
				j--;
			}
			array[j+1]=guard;
		}
	}
	return array;
}
//*****************************************直接插入排序*************************************

//****************************************二叉搜索树*******************************************
function Node(data,left,right){
	this.data=data;
	this.left=left;
	this.right=right;
}

function BSTree(){
	this.root=null;
}


//插入
BSTree.prototype.insert=function(data){
	var node=new Node(data,null,null);
	if(this.root==null){
		this.root=node;
	}else{
		var current=this.root;
		var parent;
		while(true){
			parent=current;
			if(data<current.data){
				current=current.left;
				if(current==null){
					parent.left=node;
					break;
				}
			}else{
				current=current.right;
				if(current=null){
					parent.right=node;
					break;
				}
			}

		}
	}
}
//前序遍历
BSTree.prototype.preorder=function(node){//传入根节点
  if(node!=null){
  	console.log(node.data);
  	this.preorder(node.left);
  	this.preorder(node.right);
  }
}
//中序遍历
BSTree.prototype.inorder=function(node){
	if(node!=null){
		this.inorder(node.left);
		console.log(node.data);
		this.inorder(node.right);
	}
}
//后序便利
BSTree.prototype.postorder=function(node){
	if(node!=null){
		this.postorder(node.left);
		this.postorder(node.right);
		console.log(node.data);
	}
}

//删除节点
BSTree.prototype.remove=function(data){
	if(this.root == null){
		return false;
	}
	var currentNode=this.root;
	var parent=null;
	while(current!=null&&current.data!=data){
		parent=currentNode;
		if(data<current.data){
			currentNode=currentNode.left;
		}else{
			currentNode=currentNode.right;
		}
	}
	if(currentNode=null){
		return false;
	}

}

//查找
BSTree.prototype.find=function(data){
	var currentNode=this.root;
	while(currentNode!=null){
		if(currentNode.data=data){
			return currentNode
		}else if(currentNode.data<data){
			currentNode=currentNode.left;
		}else{
			currentNode=currentNode.right;
		}
	}
	return null;
};


//***************************************二分查找********************************************
//非递归
var twoParts=function(index,array){
	var low=0;
	var high=array.length;
	while(low<=high){
		mid=Math.floor((low+high)/2);
		if(index<array[mid]){
			high=mid-1;
		}else if(index>array[mid]){
			low=mid+1;
		}else{
			return mid;
		}
	}
	return -1;
};
//递归
var twoPart=function(index,array){
  var low=0;
  var high=array.length;
  var mid=Math.floor((low+high)/2);
  if(index==array[mid]){
  	return mid;
  }else if(index<array[mid]){
  	high=mid-1;
  	mid=Math.floor((low+high)/2);
  	arguments.callee(index,array.slice(low,high+1))
  }else{
    low=mid+1;
    mid=Math.floor((low+high)/2);
    arguments.callee(index,array.slice(low,high+1))
  }
}

//***************************************二分查找********************************************

//***************************************链表***********************************************


//***************************************链表***********************************************

//***************************************栈***********************************************
function Stack(){
	var items=[];
	this.push=function(element){
		items.push(element);
	}
	this.pop=function(){
		return items.pop();
	}
	this.peek=function(){
		return items[items.length-1];
	}
	this.isEmpty=function(){
		return items.length==0;
	}
	this.size=function(){
		return items.length;
	}
	this.clear=function(){
		items.length=0;
	}
	this.print=function(){
		console.log(items.join(","));
	}
}
//***************************************栈***********************************************

//**************************************队列*********************************************
//普通队列
function Quene(){
	var items=[];
	this.enquene=function(element){
		items.push(element);
	}
	this.dequene=function(){
		return items.shift();
	}
	this.front=function(){
		return items[0];
	}
	this.isEmpty=function(){
		return items.length==0;
	}
	this.size=function(){
		return items.length;
	}
}
//优先级队列

//**************************************队列*********************************************
//**************************************集合*********************************************
function MySet(){
	var items={};
	//判断有无
	this.has=function(value){
		return items.hasOwnProperty(value);//或value in items
	}
	//添加
	this.add=function(value){
		if(!this.has(value)){
			items[value]=value;
			return true;
		}
		return false;
	}
	//删除
	this.remove=function(value){
		if(this.has(value)){
			delete items[value];
			return true;
		}
		return false;
	}
	//清空
	this.clear=function(){
		items={};
	}
	//大小
	this.size=function(){
		var count=0;
		for(var prop in items){
			if(items.hasOwnProperty(prop)){
				count++;
			}
		}
		return count;
	}
	//返回所有元素
	this.values=function(){
		var keys=[];
		for(var key in items){
			keys.push(key);
		}
		return keys;
	}
	//并集
	this.union=function(otherset){
		var unionSet=new MySet();
		var values= this.values();//所有元素组成的数组
		for(var i=0;i<values.length;i++){
			unionSet.add(values[i]);
		}
		values=otherset.values();
		for(var i=0;i<values.length;i++){
			unionSet.add(values[i]);
		}
		return unionSet;
	}
	//交集
	this.intersection=function(otherSet){
		var intersectionSet=new MySet();
		var values=this.value();
		for(var i=0;i<values.length;i++){
			if(otherSet.has(value[i])){
				intersectionSet.add(value[i]);
			}
		}
		return intersectionSet;
	}
	//差集
	this.difference=function(otherSet){
	  var differenceSet=new MySet();
	  var values=this.value();
	  for(var i=0;i<values.length;i++){
	  	if(!otherSet.has(values[i])){
	  		differenceSet.add(values[i]);
	  	}
	  }	
	  return differenceSet;
	}
	//子集
	this.subset=function(parentset){
		var values=this.value();
		if(this.size()<parentset.size()){
			return false;
		}else{
			for(var i=0;i<values.length;i++){
				if(!parentset.has(values[i])){
					return false;
				}
			}
			return true;
		}
	}
}

