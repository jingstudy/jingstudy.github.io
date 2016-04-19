(function init () {
	 // body...  
	 //初始化使目录隐藏
	 var flexs=document.getElementsByClassName("flex");
	 var roots=document.getElementsByClassName("menudiv");
	 for (var i = 1; i < flexs.length; i++) {
	 	flexs[i].style.display="none";
	 }

	 var pre_find=document.getElementById("pre_find_btn");
	 var text,flag=false;  //flag为是否找到指定字符串的标志
	 var stack=[];   //遍历记录
	 var click_flag=[false]; //按钮点击标志
	 var total_div=document.getElementsByTagName("div"); //存放文档中所有的div节点
	 var root_div_len=total_div.length;  //树中的div数目
	 var selectedNode; //当前被选中的节点
	 var addbtn=document.getElementById("add_node");
	 var delbtn=document.getElementById("del_node");
/*****************查找带+-号的span，并绑定事件*********************/
	 var span=document.getElementsByClassName("span");
	 for (var i = 0 , length=span.length; i < length; i++) {
	 	span[i].onclick=function(){
	 		showOrHide(this,event);
	 	}
	 }
	 /*根据span中的内容判断是要展开还是隐藏*/
	 function showOrHide(obj,e){
		 var charactor=obj.textContent;
		 var sibling=obj.parentNode.nextElementSibling;
	 	if (charactor=="−") {
	 		while (sibling) {
	 			sibling.style.display="none";
	 			sibling=sibling.nextElementSibling;
	 		}
	 		obj.innerHTML="+";
	 	}
	 	else{
	 		while (sibling) {
	 			sibling.style.display="block";
	 			sibling=sibling.nextElementSibling;
	 		}
	 		obj.innerHTML="−";
	 	}
	 	e.stopPropagation();
	 }

/*****动态刷新文档，选中变背景色,使增加与删除按钮可见************************/
	(function flush(){
		total_div=document.getElementsByTagName("div");
		flexs=document.getElementsByClassName("flex");
		for (var i = 2; i < total_div.length; i++) {
			if(total_div[i].className=="menudiv"){
			  (function(n){
				total_div[n].onclick=function(e){
					clearSelectedStatus();
					/*点击+-号div，相当于点击其父节点*/
					selectedNode=this.parentNode;   
				    this.style.backgroundColor="#FFC8B4";
				    this.parentNode.style.backgroundColor="#FFC8B4";
				    addbtn.style.display="block";
				    delbtn.style.display="block";
				    e.stopPropagation();
				}	
			  })(i);
			}else{
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
		}
		setTimeout(flush, 1000);
	})()
	/*新增节点：<div class="flex"><div class="menudiv"><span class="span" onclick="showOrHide()">+</span>输入内容</div></div>*/
	addbtn.onclick=function(){
		if(selectedNode){
			var text=prompt("请输入子节点的内容：", "");
			var node=document.createElement("div");
			node.className="flex";
			var menudiv=document.createElement("div");
			menudiv.className="menudiv";
			var span=document.createElement("span");
			span.innerHTML="+";
			span.className="span";
			span.onclick=function(e){
				showOrHide(this);
				e.stopPropagation();
			}
			if (text) var textnode=document.createTextNode(text);
			menudiv.appendChild(span);
			menudiv.appendChild(textnode);
			node.appendChild(menudiv);
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
		for (var i = 2; i < total_div.length; i++) {
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
	 	preOrderFind();
	 	animation();
	 }
	 /*作用：为遍历做准备
	 *操作：上次展开的目录中—变+，目录折叠起来，清空遍历记录、上次查找到的节点恢复背景色、获取查找内容
	 当前点击按钮变灰，所有按钮不可点击
	 */
	 function ready(){
	 	var length=stack.length;
	 	if (length) {   //已匹配的节点重置背景色
	 		stack[length-1].style.backgroundColor="white";
	 	}
	 	for (var i = 0; i < stack.length; i++) {
			stack[i].firstElementChild.innerHTML="+";
		}
	 	for (var i = 1; i < flexs.length; i++) {
	 		flexs[i].style.display="none";
	 	}
	 	text=document.getElementById("text").value;	 
	 	if (click_flag[0]) {
	 		pre_find_btn.style.backgroundColor="darkgray";
	 	}
	 	flag=false;
	 	pre_find_btn.setAttribute("disabled", "");
	 	addbtn.setAttribute("disabled", "");   //增加删除按钮也不可点
	 	delbtn.setAttribute("disabled", "");
	 	clearSelectedStatus();  //清除选中节点的颜色
	 	stack=[];
	 }

	 /*作用：根据遍历按钮标志位重置按钮的状态，增加删除按钮恢复可点击
	 *操作：按钮背景色恢复、所有按钮可点击
	 重置查找标志位和遍历按钮标志位*/
	 function resetStatus(){
	 	if (click_flag[0]) {
	 		pre_find_btn.style.backgroundColor="";
	 		click_flag[0]=false;
	 	}
	 	flag=false;
	 	pre_find_btn.removeAttribute("disabled");
	 	addbtn.removeAttribute("disabled");
	 	delbtn.removeAttribute("disabled");
	 }
	 /*动画函数*
	 *根据遍历记录数组和查找标志，判断是否找到指定文件
	 *找到：menudiv及其父节点变红色背景，根据记录依次展开节点
	 *未找到：指示信息
	 *最后重置状态*/
	 function animation(){
	 	var length=stack.length;
	 	if (length) {
	 		if(flag){
	 			stack[length-1].style.backgroundColor="red";
	 			stack[length-1].parentNode.style.backgroundColor="red";
	 			for (var i = 0; i < length; i++) {
	 				showOrHide(stack[i].firstElementChild,event);
	 			}
	 			alert("已找到");
	 		}else{
	 			alert("找不到指定文件");
	 		}	
	 	}
	   resetStatus();		
	}
/**前序遍历查找内容，只遍历menudiv,因为所有文字都在其span标签内**/
	 function preOrderFind(){
	 	for (var i = 0,length=roots.length; i < length; i++) {
	 		stack.push(roots[i]);
	 		if(roots[i].lastChild.textContent==text){
	 			flag=true; break;
	 		} 
	 	}
	 }
})()