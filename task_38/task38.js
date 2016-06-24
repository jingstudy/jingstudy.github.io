//判断行列与其内容是否相符
var rowNum=parseInt(table.rowNum, 10);
var colNum=parseInt(table.colNum, 10);
var real_col_num=table.thContent;
var real_row_num=table.trContent;
var sortCol=table.sortCol;
var upHandle=table.upHandle;
var downHandle=table.downHandle;

if (colNum!=real_col_num.length || real_row_num.length!=(rowNum-1)) {
	alert("表的行列数与实际不符");
	return;
}
//对选中的列排序，flag表示排序规则，0升序，1降序
function sortTable(span,flag,sortHandle){
	var table=document.getElementById("tab");
	var tr=table.getElementsByTagName("tr");
	var arr=Array.prototype.slice.call(tr,0);
	var id=span.parentNode.id;
	if (flag==0)     //up符号排序规则
		return function(){  
			arr.sort(function(tr1,tr2){
				var td1=tr1.getElementsByTagName("td")[id];
				var v1=parseFloat(td1.textContent);
				var td2=tr2.getElementsByTagName("td")[id];
				var v2=parseFloat(td2.textContent);	
				//自定义排序规则
				if(typeof sortHandle=="function"&& sortHandle.length==2){
					return sortHandle(v1,v2);
				} 
				//默认方法：升序
				if(v1<v2) return -1;
				if(v1>v2) return 1;
				else return 0;
			});
			for (var i = 0; i < arr.length; i++) {
				table.tBodies[0].appendChild(arr[i]);
			}
		};
	else if(flag==1)    //down符号排序规则
		return function(){	
			arr.sort(function(tr1,tr2){
				var td1=tr1.getElementsByTagName("td")[id];
				var v1=parseFloat(td1.textContent);
				var td2=tr2.getElementsByTagName("td")[id];
				var v2=parseFloat(td2.textContent);
				//自定义排序规则
				if(typeof sortHandle=="function"&&sortHandle.length==2){
					return sortHandle(v1,v2);
				} 
				//默认方法：降序
				if (v1>v2) return -1;
				if (v1<v2) return 1;
				else return 0;
			});
			for (var i = 0; i < arr.length; i++) {
				table.tBodies[0].appendChild(arr[i]);
			}
		};
}
//创建表头
function createTh(rtable){
	var thead=document.createElement("thead");
	var th,span_asc,span_desc,sort=0;
	for (var i = 0; i < real_col_num.length; i++) {
		th=document.createElement("th");
		th.className="th";
		th.id=i;
		th.innerHTML=real_col_num[i];	
		if(i==sortCol[sort]){
			span_asc=document.createElement("span");
			span_asc.className="span_asc";
			span_asc.innerHTML="▴";
			span_asc.onclick=function(){sortTable(this,0,upHandle)();};
		
			span_desc=document.createElement("span");
			span_desc.className="span_desc";
			span_desc.innerHTML="▾";
			span_desc.onclick=function(){sortTable(this,1,downHandle)();};

			th.appendChild(span_asc);
			th.appendChild(span_desc);
			sort++;
		}
		thead.appendChild(th);
	}
	rtable.appendChild(thead);
}
//创建tr
function createTr(rtable){
	var tbody=document.createElement("tbody");
	var tr,td;
	for (var i = 0; i < real_row_num.length; i++) {
		tr=document.createElement("tr");
		for (var j = 0; j < real_row_num[i].length; j++) {
			td=document.createElement("td");
			td.className="td";
			td.innerHTML=real_row_num[i][j];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	rtable.appendChild(tbody);
}
function createTable () {
	 // 创建表
	 var rtable=document.createElement("table");
	 rtable.id="tab";
	 var caption=document.createElement("caption");
	 caption.className="caption";
	 caption.innerHTML="点击三角符号进行排序<br/>排序规则可在config.js中自行配置";
	 rtable.appendChild(caption);
	 createTh(rtable);
	 createTr(rtable); 
	 document.body.appendChild(rtable);
}
createTable();