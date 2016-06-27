(function(){
	var colnums=4;  //每行图片列数
	var sections=document.getElementsByTagName("section");
	var len=sections.length;
	if(len>colnums-1){
		imgLocation(sections,len,colnums);
		window.onscroll=function(){
			loadDynamic(sections,len,colnums);
		}
	}
})()
//计算图片位置，成瀑布流效果
function imgLocation(sections,len,colnums){
	var heightArr=[];
	//第一排的编号放入数组
	for(var i=0;i<colnums;i++){
		heightArr.push(i);
	}
	//根据数组中对象底部的Y坐标对索引号升序排序
	var sortArr=function(arr){
		return arr.sort(function(a,b){
			var h1=sections[a].offsetHeight+sections[a].offsetTop||0;
			var h2=sections[b].offsetHeight+sections[b].offsetTop||0;
			if(h1<h2) return -1;
			if(h1>h2) return 1;
			else return 0;
		});
	};
	var sortedArr,offset1,offset2;
	//计算每个元素的位置（第一排除外）
	while (i<len) {
		sortedArr=sortArr(heightArr);
		sections[i].style.position="absolute";
		offset1=sections[sortedArr[0]].offsetTop;
		offset2=sections[sortedArr[0]].offsetHeight;
		sections[i].style.top=offset1+offset2+"px";
		sections[i].style.left=sections[sortedArr[0]].offsetLeft+"px";
		sortedArr[0]=i;
		i++;
	}
}
//鼠标滚动到底部时，加载一批图片
function loadDynamic(sections,len,colnums){
	//视口高度
	var viewHeight=document.documentElement.clientHeight||document.body.clientHeight;  
	//滚动高度
	var scroll=document.documentElement.scrollTop||document.body.scrollTop;
	//最后一个图像距顶的位置
	var lastImgPos=sections[len-1].offsetTop;
	//动态加载的图像数据
	var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};
	//最后一个图像出现在视口坐标中时加载图像
	if(viewHeight+scroll>lastImgPos){
		var section,img,parent=document.getElementsByClassName("wrapper")[0];
		for(var i=0;i<imgData.data.length;i++){
			section=document.createElement("section");
			section.className="imgContainer";
			img=document.createElement("img");
			img.src="img/"+imgData.data[i].src;
			section.appendChild(img);
			parent.appendChild(section);
		}
		sections=document.getElementsByTagName("section");
		len=sections.length;
		imgLocation(sections,len,colnums);
	}
}