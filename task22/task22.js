(function init() {
	var root=document.getElementsByClassName("root")[0];
	var pre_order_btn=document.getElementById("pre_order_btn");
	var mid_order_btn=document.getElementById("mid_order_btn");
	var post_order_btn=document.getElementById("post_order_btn");
	var stack=[];
	var flag=[false,false,false];
	/*********为三个按钮绑定事件**********/
	pre_order_btn.onclick=function(){
		pre_order_btn.style.backgroundColor="darkgray";	
		pre_order_btn.setAttribute("disabled", "");
		mid_order_btn.setAttribute("disabled", "");
		post_order_btn.setAttribute("disabled", "");
		
		flag[0]=true;
		stack_clear();
		preBtnHandle(root);
		changeBgColor();	
	}
	mid_order_btn.onclick=function(){
		mid_order_btn.style.backgroundColor="darkgray";	
		mid_order_btn.setAttribute("disabled", "");
		pre_order_btn.setAttribute("disabled", "");
		post_order_btn.setAttribute("disabled", "");

		stack_clear();
		flag[1]=true;
		midBtnHandle(root);
		changeBgColor();		
	}
	post_order_btn.onclick=function(){
		post_order_btn.style.backgroundColor="darkgray";	
		mid_order_btn.setAttribute("disabled", "");
		pre_order_btn.setAttribute("disabled", "");
		post_order_btn.setAttribute("disabled", "");

		flag[2]=true;
		stack_clear();
		postBtnHandle(root);
		changeBgColor();		
	}
	/***************动画处理函数*******************/
	function changeBgColor(){
		var interval=document.getElementById("interval").value;
		var length=stack.length;
		var i=0;			
		stack[i].style.background="red";
		var time=setInterval(function(){
			if (i==length-1) {
				stack[i].style.background="transparent";
				clearInterval(time);
				if (flag[0]) {
					pre_order_btn.style.backgroundColor="";
					mid_order_btn.removeAttribute("disabled");
					post_order_btn.removeAttribute("disabled");
				}
				if (flag[1]) {
					mid_order_btn.style.backgroundColor="";
					pre_order_btn.removeAttribute("disabled");
					post_order_btn.removeAttribute("disabled");
				}
				if(flag[2]){
					post_order_btn.style.backgroundColor="";
					pre_order_btn.removeAttribute("disabled");
					mid_order_btn.removeAttribute("disabled");
				}		
			}
			else{
				++i;
				stack[i-1].style.background="transparent";
				stack[i].style.background="red";
			}
		}, interval);				
	}
/************************重置函数*************************/
	function stack_clear(){
		stack=[];
	}
/***************前、中、后序遍历的处理函数*******************/
	function preBtnHandle(root){
		stack.push(root);
		if(root.firstElementChild){
			preBtnHandle(root.firstElementChild);
		}
		if (root.lastElementChild) {
			preBtnHandle(root.lastElementChild);
		}
	}
	function midBtnHandle(root){
		if (root.firstElementChild) {
			midBtnHandle(root.firstElementChild);
		}
		stack.push(root);
		if (root.lastElementChild) {
			midBtnHandle(root.lastElementChild);
		}
	}
	function postBtnHandle(root){
		if (root.firstElementChild) {
			postBtnHandle(root.firstElementChild);
		}
		if (root.lastElementChild) {
			postBtnHandle(root.lastElementChild);
		}
		stack.push(root);
	}
})()
