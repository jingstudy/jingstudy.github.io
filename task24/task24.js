(function init () {
	 // body...  
	 var root=document.getElementsByClassName("level-1")[0];
	 var pre_find=document.getElementById("pre_find_btn");
	 var in_find=document.getElementById("in_find_btn");
	 var post_find=document.getElementById("post_find_btn");
	 var text,interval,flag=false;  //flag为是否找到指定字符串的标志
	 var stack=[];   //遍历记录
	 var click_flag=[false,false,false]; //按钮点击标志
	 var total_div=document.getElementsByTagName("div"); //存放文档中所有的div节点
	 var root_div_len=total_div.length-2;  //root树中的div数目
	 var selectedNode; //当前被选中的节点
	 var addbtn=document.getElementById("add_node");
	 var delbtn=document.getElementById("del_node");
/******************选中变背景色,使增加与删除按钮可见************************/
	(function flush(){
		total_div=document.getElementsByTagName("div");
		root_div_len=total_div.length-2;
		for (var i = 0; i < root_div_len; i++) {
			(function(n){
				total_div[n].onclick=function(e){
					selectedNode=this;
				    clearSelectedStatus();
				    this.style.backgroundColor="#FFC8B4";
				    addbtn.style.display="block";
				    delbtn.style.display="block";
				    e.stopPropagation();
			    }
			 })(i);
		}
		setTimeout(flush, 500);
	})()
	/******************************/
	addbtn.onclick=function(){
		if(selectedNode){
			var text=prompt("请输入子节点的内容：", "");
			var node=document.createElement("div");
			if (text) node.innerHTML=text;
			node.className="flex";
			node.style.height=selectedNode.offsetHeight*0.8+"px";
			selectedNode.appendChild(node);
		}
		else alert("请选择节点");
	}
	delbtn.onclick=function(){
		if (selectedNode) {
			removeNode(selectedNode);
		}
		else alert("请选择节点");
	}
/******************清除所有节点上的颜色************************/
	function clearSelectedStatus(){
		for (var i = 0; i < root_div_len; i++) {
			(function(n){
                  total_div[n].style.backgroundColor="white";
			})(i)
		}
	}
/************移除该节点及其所有子节点*******/
	function removeNode(node){
		var children_len=node.childNodes.length;
		if (children_len) {
			for (var i = children_len-1; i >= 0 ; i--) {
				node.removeChild(node.childNodes[i]);
			}
		}
		node.parentNode.removeChild(node);
		selectedNode=0;
	}
/**************为遍历按钮绑定事件**************/
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
	 *操作：清空遍历记录（数组）、上次查找到的节点恢复背景色、获取查找内容和间隔
	 当前点击按钮变灰，所有按钮不可点击
	 */
	 function ready(){
	 	var length=stack.length;
	 	if (length) {   //已匹配的节点重置背景色
	 		stack[length-1].style.backgroundColor="white";
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
	 	addbtn.setAttribute("disabled", "");   //增加删除按钮也不可点
	 	delbtn.setAttribute("disabled", "");
	 	clearSelectedStatus();  //清除选中节点的颜色
	 }

	 /*作用：根据遍历按钮标志位重置按钮的状态，增加删除按钮恢复可点击
	 *操作：背景色变为透明、恢复所有按钮可点击状态
	 重置查找标志位和遍历按钮标志位*/
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
	 	addbtn.removeAttribute("disabled");
	 	delbtn.removeAttribute("disabled");
	 }
	 /*动画函数*
	 *interval间隔后，将前一个元素的背景重置透明，当前元素背景变红
	 *遍历到数组最后一个元素，若该元素不是查找内容，将其背景设为透明并弹出消息
	 *否则，背景设为黄色。最后统一停止遍历，重置状态*/
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
	 				stack[i].style.backgroundColor="white";
	 				alert("抱歉，没有找到");
	 			}	
	 			clearInterval(num);
	 			resetStatus();
	 		}
	 		else{
	 			++i;
		 		stack[i-1].style.backgroundColor="white";
		 		stack[i].style.backgroundColor="red";
	 		}
	 	}, interval);		
	 }
/**前序遍历查找内容**********/
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
/*******中序查找内容*********/
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
/******后续遍历查找*********/
	 function postOrderFind(root){
	 	var rNode=root.firstElementChild;
	 	if (!rNode) {   /*该节点是叶子节点*/
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