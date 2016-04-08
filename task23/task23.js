(function init () {
	 // body...  
	 var root=document.getElementsByClassName("root")[0];
	 var pre_find=document.getElementById("pre_find_btn");
	 var in_find=document.getElementById("in_find_btn");
	 var post_find=document.getElementById("post_find_btn");
	 var text,interval,flag=false;  //flag为是否找到指定字符串的标志
	 var stack=[];   //遍历顺序
	 var click_flag=[false,false,false];

	 pre_find.onclick=function(){
	 	click_flag[0]=true;
	 	ready();
	 	preOrderFind(root);
	 	animation();
	 }
	 in_find.onclick=function(){ 
	 	click_flag[1]=true;
	 	ready();	
	 	inOrderFind(root);
	 	animation();
	 }
	 post_find.onclick=function(){
	 	click_flag[2]=true;
	 	ready();
 		postOrderFind(root);
 		animation();
	 }
	 /*作用：为遍历做准备 防止重复点击按钮影响遍历
	 *操作：清空遍历记录（数组）、点击的按钮变灰，使三个按钮不可点击
	 */
	 function ready(){
	 	var length=stack.length;
	 	if (length) {
	 		stack[length-1].style.backgroundColor="";
	 		stack=[];
	 	}
	 	text=document.getElementById("text").value;
	 	interval=document.getElementById("interval").value;
	 	if (click_flag[0]) {
	 		pre_find_btn.style.backgroundColor="darkgray";
	 	}
	 	else if (click_flag[1]) {
	 		in_find_btn.style.backgroundColor="darkgray";
	 	}
	 	else if (click_flag[2]) {
	 		post_find_btn.style.backgroundColor="darkgray";
	 	}
	 	flag=false;
	 	pre_find_btn.setAttribute("disabled", "");
	 	in_find_btn.setAttribute("disabled", "");
	 	post_find_btn.setAttribute("disabled", "");
	 }

	 /*作用：根据点击标志位重置按钮的状态
	 *操作：背景色变为透明、恢复可点击状态*/
	 function resetStatus(){
	 	if (click_flag[0]) {
	 		pre_find_btn.style.backgroundColor="";
	 		click_flag[0]=false;
	 	}
	 	else if (click_flag[1]) {
	 		in_find_btn.style.backgroundColor="";
	 		click_flag[1]=false;
	 	}
	 	else if (click_flag[2]) {
	 		post_find_btn.style.backgroundColor="";
	 		click_flag[2]=false;
	 	}
	 	flag=false;
	 	pre_find_btn.removeAttribute("disabled");
	 	in_find_btn.removeAttribute("disabled");
	 	post_find_btn.removeAttribute("disabled");
	 }
	 /**************动画函数***************/
	 function animation(){
	 	var length=stack.length;
	 	var i=0;
	 	if (length) {
	 		stack[i].style.backgroundColor="red";
	 	}
	 	else return;
	 	var num=setInterval(function(){
	 		if (i==length-1) {
	 			if (flag) {
	 				stack[i].style.backgroundColor="yellow";
	 			}
	 			else{
	 				stack[i].style.backgroundColor="transparent";
	 				alert("抱歉，没有找到");
	 			}	
	 			clearInterval(num);
	 			resetStatus();
	 		}
	 		else{
	 			++i;
		 		stack[i-1].style.backgroundColor="transparent";
		 		stack[i].style.backgroundColor="red";
	 		}
	 	}, interval);		
	 }

	 function preOrderFind(root){
	 	if (root) {
	 		stack.push(root);
	 	}
	 	var str=root.firstChild.nodeValue.trim("\n\r");
	 	if(str==text){
	 		flag=true;
	 		return true;
	 	}
	 	var rNode=root.firstElementChild;
	 	while (rNode) {
	 		if(preOrderFind(rNode)) 
	 			return true;
	 		else  rNode=rNode.nextElementSibling;
	 	}
	 	return false;
	 }

	 function inOrderFind(root){
	 	var rNode=root.firstElementChild;
	 	if (!rNode) {  /**root节点是叶子节点*/
	 		stack.push(root);
	 		if (root.firstChild.nodeValue.trim("\r\n")==text) {
	 			flag=true;
	 			return true;
	 		}
	 		else return false;
	 	}
	 	var midChildIndex=Math.floor((root.childElementCount-1)/2); //中间位置的孩子节点下标
	 	var n=0; //统计已经遍历了几个孩子节点
	 	while (rNode) {
	 		if (inOrderFind(rNode)) {
	 			flag=true;
	 			return true;
	 		}
	 		else{
	 			if (n==midChildIndex) {
	 				stack.push(root);
	 				if (root.firstChild.nodeValue.trim("\r\n")==text) {
	 					flag=true;
	 					return true;
	 				}
	 			}
	 			rNode=rNode.nextElementSibling;
	 			if (rNode) {
	 				++n;
	 			}
	 		}
	 	}
	 	return false;
	 }

	 function postOrderFind(root){
	 	var rNode=root.firstElementChild;
	 	if (!rNode) {
	 		stack.push(root);
	 		if (root.firstChild.nodeValue.trim("\r\n")==text) {
	 			flag=true;
	 			return true;
	 		}
	 	}
	 	while (rNode) {
	 		if (postOrderFind(rNode)) {
	 			return true;
	 		}
	 		else{
	 			rNode=rNode.nextElementSibling;
	 			if (!rNode) {
	 				if (root) {
	 					stack.push(root);
	 					if (root.firstChild.nodeValue.trim("\r\n")==text) {
	 						flag=true;
	 						return true;
	 					}
	 				} 				
	 				else return false;
	 			}
	 		}
	 	}
	 	return false;
	 }
})()