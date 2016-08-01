//**************************************************完美排序类*****************************************
function ArrayList(){
	var array=[];

	//插入
	this.insert = function(item){
		array.push(item);
	}
	//转为字符串
	this.toString = function(){
		array.join();
	}
	//交换数组下标位置
	var swap=function(array,index1,index2){
		var aux = array[index1];
		array[index1]=array[index2];
		array[index2]=aux;
	};

	this.quickSort = function(){
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
}

