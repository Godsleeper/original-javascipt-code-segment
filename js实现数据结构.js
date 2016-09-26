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
	for(var i=1;i<array.length;i++){
		for(var j=array.length-1;j>=i;j--){
			if(array[j-1]>array[j]){
				var _item=array[j];
				array[j]=array[j-1];
				array[j-1]=_item;
			}
		}
	}
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

//****************************************二叉搜索树*******************************************
function Node(data,left,right){
	this.data=data;
	this.left=left;
	this.right=right;
}

function BSTree(){
	this.root=null;
}

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

}
