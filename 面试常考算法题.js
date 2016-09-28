//打印两个链表的公共部分
function printCommonNode(head1,head2){
	while(head1!=null&&head2!=null){
		if(head1.value<head2.value){
			head1=head1.next;
		}else if(head1.value>head2.value){
			head2=head2.next
		}else{
			console.log(head1.value)
			head1=head1.next;
			head2=head2.next;
		}
	}
}

//反转单向链表
function reverseSingleLink(head){
	var pre=null;
	var next=null;
	while(head!=null){
		next=head.next;
		head.next=pre;
		pre=head;
		head=next;
	}
	return pre;
}



function Node(data){
	this.data=data||0;
	this.next=null;
}

var node1=new Node(1);
var node2=new Node(2);
var node3=new Node(3);
node1.next=node2;
node2.next=node3;

function display(node){
   while(node!=null){
   	console.log(node.data);
   	node=node.next;
   }
}

reverseSingleLink(node1)
console.log(node2.next.data)