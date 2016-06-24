var table={
	rowNum:'5',
	colNum:'5',
	sortCol:[1,2,3,4],  //配置要排序的列,0为第一列
	thContent:['姓名','语文','数学','英语','总分'],  
	trContent:[
		['小红',70,80,90,240],
		['小名',60,70,80,210],
		['小量',80,50,60,190],
		['小从',90,60,70,220]
	],
	//上三角符号的排序规则
/*	upHandle:function(v1,v2){
		if(v1<v2) return 1;
		if(v1>v2) return -1;
		else return 0;
	},	*/
	//下三角符号的排序规则
/*	downHandle:function(v1,v2){
		if(v1<v2) return -1;
		if(v1>v2) return 1;
		else return 0;
	} */
};