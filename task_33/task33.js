(function() {
	 // body...  
	 var canvas=document.getElementById("chessboard");
	 /*绘制棋盘格*/
	 if (canvas.getContext) {
	 	var cvs=canvas.getContext('2d'); 
	 	cvs.strokeStyle="#888";
	 	cvs.lineWidth=1; 
	 	for (var i = 1; i < 12; i++) {	
	 		cvs.moveTo(i*50, 50);
	 		cvs.lineTo(i*50,550);			
	 	}
	 	for (var i = 1; i < 12; i++) {
	 		cvs.moveTo(50, i*50);
	 		cvs.lineTo(550,i*50);
	 	}
	 	cvs.stroke();
	 	var x,y;
	 	cvs.font="15px Microsoft Yahei";
	 	//绘制行列号
	 	for (var i = 1; i < 11; i++) {
	 		x=20+50*i;
	 		cvs.fillText(i,x,30);
	 	}
	 	for (var i = 1; i < 11; i++) {
	 		y=30+50*i;
	 		cvs.fillText(i,20,y);
	 	}
	 }
	 //行进方向抽象
	 var dir={
	 	top:[0,-1],
	 	bottom:[0,1],
	 	left:[-1,0],
	 	right:[1,0],
	 	stay:[0,0]
	 };
	 //头部蓝色矩形抽象
	 var front={
	 	x:0,  
	 	y:0,
	 	width:50,
	 	height:10,
	 	pos:"top"
	 };
	 //棋子抽象
	 var chessman={
	 	pos:[7,7],//棋盘标号处为开始处，标号从0开始
	 	size:50,     //宽高都为50
	 	direction:dir.top, //默认方向往上走
	 	head:front,        //头部信息
	 	x:null,
	 	y:null,
	 	flag:true,     //是否为初次加载状态
	 	tempDir:{       //根据命令调整后的方向信息
	 		headDir:"",   //头部信息字符串
	 		dir:null      //实际方向
	 	},
	 	//绘制正方形
	 	draw:function(){
	 		if(!this.flag){	
	 			this.pos[0]=this.pos[0]+this.direction[0];
	 			this.pos[1]=this.pos[1]+this.direction[1];	
	 		}
	 		//判断边界条件
	 		if(this.pos[0]<1||this.pos[0]>10||this.pos[1]<1||this.pos[1]>10){
	 			alert("出界了");
	 			return;
	 		}
	 		this.x=this.pos[0]*this.size;
 			this.y=this.pos[1]*this.size;		
	 		cvs.moveTo(this.x,this.y);
	 		//绘制红色矩形
		 	cvs.fillStyle="#f00";
		 	cvs.fillRect(this.x,this.y,this.size,this.size);
		 	//绘制蓝色头部
		 	cvs.fillStyle="#00f";
		 	this.x=this.x+this.head.x;
		 	this.y=this.y+this.head.y;
		 	cvs.fillRect(this.x,this.y,this.head.width,this.head.height);
	 	},
	 	//前进方向上前进一格
	 	go:function(){
	 		//清除正方形区域
	 		this.clear(this.x,this.y,this.head.width,this.head.height);
	 		this.clear(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		//描边
	 		this.strokeRect(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		this.flag=false;
	 		this.draw();
	 	},
	 	turnBack:function(){
	 		this.clear(this.x,this.y,this.head.width,this.head.height);
	 		this.clear(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		this.strokeRect(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		this.flag=false;
	 		//根据头部方向调整头部
	 		this.changeFront(this.head.pos,"back");
	 		//重置头部方向
	 		this.head.pos=this.tempDir.headDir;
	 		//画矩形块
	 		this.direction=dir.stay;
	 		this.draw();
	 		//重置正方形方向
	 		this.direction=this.tempDir.dir;
	 	},
	 	turnLeft:function(){
	 		this.clear(this.x,this.y,this.head.width,this.head.height);
	 		this.clear(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		
	 		this.strokeRect(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		this.flag=false;
	 		
	 		this.changeFront(this.head.pos,"left");
	 		this.head.pos=this.tempDir.headDir;//
	 		
	 		this.direction=dir.stay;
	 		this.draw();
	 		
	 		this.direction=this.tempDir.dir;//
	 	},
	 	turnRight:function(){
	 		this.clear(this.x,this.y,this.head.width,this.head.height);
	 		this.clear(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		
	 		this.strokeRect(this.x-this.head.x,this.y-this.head.y,this.size,this.size);
	 		this.flag=false;
	 		
	 		this.changeFront(this.head.pos,"right");
	 		this.head.pos=this.tempDir.headDir;//
	 		
	 		this.direction=dir.stay;
	 		this.draw();
	 		
	 		this.direction=this.tempDir.dir;//
	 	},
	 	clear:function(x,y,width,height){
	 		cvs.clearRect(x,y,width,height);
	 	},
	 	strokeRect:function(x,y,width,height){
	 		cvs.strokeStyle="#888";
	 		cvs.strokeRect(x,y,width,height);
	 	},
	 	changeFront:function(oldDir,curDir){
	 		//根据上一次头部方向，计算右转、左转、反向时的头部方向
	 		if(curDir=="right"){
	 			switch (oldDir) {
	 				case "top":
	 					front.x=40,front.width=10,front.height=50;
	 					this.tempDir.headDir="right";
	 					this.tempDir.dir=dir.right;
	 					break;
	 				case "bottom":
	 					front.y=0,front.width=10,front.height=50;
	 					this.tempDir.headDir="left";
	 					this.tempDir.dir=dir.left;
	 					break;
	 				case "left":
	 					front.width=50,front.height=10;
	 					this.tempDir.headDir="top";
	 					this.tempDir.dir=dir.top;
	 					break;
	 				default:
	 					front.x=0,front.y=40,front.width=50,front.height=10;
	 					this.tempDir.headDir="bottom";
	 					this.tempDir.dir=dir.bottom;
	 					break;
	 			}
	 		}else if(curDir=="left"){
	 			switch (oldDir) {
	 				case "top":
	 					front.width=10,front.height=50;
	 					this.tempDir.headDir="left";
	 					this.tempDir.dir=dir.left;
	 					break;
	 				case "bottom":
	 					front.x=40,front.y=0,front.width=10,front.height=50;
	 					this.tempDir.headDir="right";
	 					this.tempDir.dir=dir.right;
	 					break;
	 				case "right":
	 					front.x=0,front.width=50,front.height=10;
	 					this.tempDir.headDir="top";
	 					this.tempDir.dir=dir.top;
	 					break;
	 				default:
	 					front.y=40,front.width=50,front.height=10;
	 					this.tempDir.headDir="bottom";
	 					this.tempDir.dir=dir.bottom;
	 					break;
	 			}
	 		}else if(curDir=="back"){
	 			switch (oldDir) {
	 				case "top":
	 					front.y=40;
	 					this.tempDir.headDir="bottom";
	 					this.tempDir.dir=dir.bottom;
	 					break;
	 				case "right":
	 					front.x=0;
	 					this.tempDir.headDir="left";
	 					this.tempDir.dir=dir.left;
	 					break;
	 				case "left":
	 					front.x=40;
	 					this.tempDir.headDir="right";
	 					this.tempDir.dir=dir.right;
	 					break;
	 				default:
	 					front.y=0;
	 					this.tempDir.headDir="top";
	 					this.tempDir.dir=dir.top;
	 					break;
	 			}
	 		}
	 	}
	 };
	 chessman.draw();   //绘制初始位置
	 var btn=document.getElementById("excute");
	 btn.addEventListener("click", function(){
	 	var order=document.getElementById("ipt").value.toLowerCase();
	 	if (order==""){
	 		alert("请输入指令!");
	 	} 
	 	if(order=="go"||order=="tun lef"||order=="tun rig"||order=="tun bac"){
	 		switch (order) {
	 			case "go":
	 				chessman.go();
	 				break;
	 			case "tun lef":
	 				chessman.turnLeft();
	 				break;
	 			case "tun rig":
	 				chessman.turnRight();
	 				break;
	 			default:
	 				chessman.turnBack();
	 				break;
	 		}
	 	}else{
	 		alert("指令非法，请重新输入");
	 	} 		
	 });	
})()