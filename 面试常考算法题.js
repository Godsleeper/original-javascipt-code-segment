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


