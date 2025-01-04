// 使用立即执行函数
//防止变量污染，减少命名冲突
//因为里面的变量都是局部变量

//标准柱状图
(function(){
	// 基于准备好的div，初始化echarts图表
	var myCharts = echarts.init(document.querySelector(".bar .chart"));
	// 指定图表的配置项和数据
	var option={
		legend:{// 配置图例组件，一个echarts图表中可以存在多个图例组件
			type:'plain', //标准图例类型，scroll滚动图例类型，图例很多时用
			top:'1%', //设置图例相对容器位置，top/bottom/left/right
			selected:{
				'数量':true, //显示图例，false不显示图例，图例名称与series.name一致
			},
			textStyle:{//设置图例内容样式
				color:'#000000',  //所有图例的字体颜色
				backgroundColor:'#edf4ed', //所有图例的字体背景色
			},
			tooltip:{//图例提示框，默认不显示
				show:true,
				backgroundColor:'#edf4ed',	
				textStyle:{
					color:'#00b51d'
				},
			},
			data:[ //设置图例内容
				{
					name:'时长', //名称与series.name一致
					icon:'circcle', //图例的外框样式
					textStyle:{
						color:'black', //单独设置某一个图例的颜色
						backgroundColor:'#edf4ed', //单独设置某一个图例的字体背景色
					}
				}
			],
		},
		tooltip:{//提示框组件
			show:true, //是否显示，默认为true
			trigger:'item', //数据项图形触发提示框，axis，出现竖的虚线并触发提示框；none，无触发
			axisPointer:{ //坐标轴指示线配置项
				show:true,
				type:'shadow', //阴影指示线；line，直线指示线；none，无；
				axis:'auto',
			},
			padding:5,
			backgroundColor:'#ffffff',
			textStyle:{
				color:'#00b51d',
			}
		},
		grid:{ //直角坐标系内绘图网格
			show:false,
			top:80, //相对位置，top/bottom/left/right
			containLabel:false,//是否包含坐标轴的刻度标签
			tooltip:{
				show:true,
				trigger:'item', //触发类型
				textStyle:{
					color:'#00b51d',//提示框文字颜色
				}
			}
		},
		xAxis:{
			show:true,
			position:'bottom', //x轴位置，top
			offset:0,  //x轴相对于坐标轴的偏移
			type:'category' ,//类目轴；value数值轴，time时间轴，log对数轴
			name:'时长', //轴名称
			nameLocation:'end', //轴名称相对位置，start左，middle/center中，end右
			nameTextStyle:{ //轴名称样式
				color:'black',
				padding:[5,0,0,-5],//上右下左
			},
			nameGap:15, //轴名称与轴线距离
			nameRotate:270, //坐标轴名字旋转，角度值
			axisLine:{ //坐标轴轴线
				show:true,
				symbol:['none','arrow'], //坐标轴箭头，此为左无右有，none无，arrow有
				symbolSize:[8,8], //箭头大小，前一个数字表示高度，后一个数字表示宽度
				symbolOffset:[0,7], //箭头位置（偏移），[前一个箭头的位置，后一个箭头的位置]，如果只有一个数字则表示两个箭头同样偏移
				lineStyle:{//轴线样式
					color:'black',
					width:1, //轴线线宽
					type:'solid',//线的类型，solid实线，dashed虚线，dotted很密集的虚线
				},
			},
			axisTick:{ //坐标轴刻度
				show:true,
				inside:true, //坐标轴刻度是否朝内
				length:3,
				lineStyle:{
					color:'yellow',
					width:1, //刻度线线宽
					type:'solid', //实线
				},
			},
			axisLabel:{//坐标轴标签
				show:true,
				inside:false,//坐标轴标签是否朝内
				rotate:0, //旋转角度，-90到90度
				margin:5, //标签与轴线之间的距离
				color:'black',
			},
			splitLine:{//设置grid区域中的分隔线
				show:false,//是否显示分隔线，默认类目轴不显示，数值轴显示
				lineStyle:{
					color:'red',
					width:1,
					type:'soild',
				},
			},
			splitArea:{//设置网格区域
				show:false, //默认为false
			},
			data:['0-0.5h','0.6-1h','1.1-1.5h','1.6-2.0h','2.1-2.5h','2.5h以上'],
		},
		yAxis:{
			show:true,
			position:'left',
			offset:0,
			type:'value',//数值轴
			name:'数量',
			nameLocation:'end',//轴名称相对坐标轴原点的位置，start下，middle/center中，end上
			nameTextStyle:{ //轴名称样式
				color:'black',
				padding:[5,0,5,0],//上右下左
			},
			nameGap:15,//轴名称与轴线之间的距离
			nameRotate:0,//轴名称旋转，角度值
			axisLine:{//轴线
				show:true,
				//-------轴箭头-------->
				symbol:['none','arrow'],
				symbolSize:[8,8],
				symbolOffset:[0,7],//箭头偏移位置
				lineStyle:{
					color:'black',
					width:1,
					type:'solid',
				},
			},
			axisTick:{//轴刻度
				show:true,
				inside:true,//刻度朝内
				length:3,//刻度长度
				lineStyle:{
					width:1,//线宽
					type:'soild',
				},
			},
			axisLabel:{//轴标签
				show:true,
				inside:false,
				rotate:0,//旋转角度，-90到90
				margin:8,//标签与轴的距离
				color:'black',
			},
			splitLine:{//grid区域的分隔线
				show:true,
				lineStyle:{
					color:'#666',
					width:1,
					type:'dashed',
				},
			},
			splitArea:{ //设置格区域
				show:true,
			},
		},
		series:[{// 配置系列列表，每个系列通过type控制图表类型
			name:'时长',
			type:'bar',//柱状图，line折线图，pie扇形图
			legendHoverLink:true,//设置系列是否启用图例hover时的联动高亮
			label:{ //设置图形上的文本标签
				show:true,
				position:'insideTop',
				rotate:0,
				color:'#eee',
			},
			itemStyle:{//图形样式
				color:'#ffd3b6',//设置柱形的颜色
				barBorderRadius:[18,18,0,0],//柱体圆角半径，单位px，[左上，右上，右下，左下]，一个数字代表统一指定
			},
			barWidth:'20',//柱形宽度
			barCategoryGap:'20%', //柱形的间距
			data:[131,453,351,642,251,144],
		}]
	};
	// 使用刚指定的配置项和数据显示图表
	myCharts.setOption(option);
})();
//条形图
(function(){
	var myCharts = echarts.init(document.querySelector('.line .chart'));
	var option={
		// title:{
		// 	text:'世界人口总量',
		// 	subtext:'数据来源于网络',
		// },
		tooltip:{
			trigger:'axis',
		},
		legend:{
			data:['2023年','2024年'],
		},
		toolbox:{
			show:true,
			feature:{
				datazom:{show:true},
				dataView:{show:true,readOnly:false},
				magicType:{show:true,type:['line','bar']},
				restore:{show:true},
				savaAsImage:{show:true},
			},
		},
		xAxis:[{
			type:'value',
			boundaryGap:[0,0.01],//坐标轴两边留白策略
		}],
		yAxis:[
			{
				type:'category',
				data:['爱情','动作','恐怖','动画','奇幻','总人数'],
				axisLabel:{
					show:true,
					margin:2,
				},
			},
		],
		series:[
			{
				name:'2023年',
				type:'bar',
				data:[18352,53456,26547,45654,67843,109384],
				itemStyle:{//图形样式
					color:'#9fdabf',//设置柱形的颜色
					// barBorderRadius:[18,18,0,0],//柱体圆角半径，单位px，[左上，右上，右下，左下]，一个数字代表统一指定
				},
			},
			{
				name:'2024年',
				type:'bar',
				data:[19352,56756,28747,47754,68943,119384],
				itemStyle:{//图形样式
					color:'#90cbfb',//设置柱形的颜色
					barBorderRadius:[18,18,0,0],//柱体圆角半径，单位px，[左上，右上，右下，左下]，一个数字代表统一指定
				},
			},
		],
	};
	myCharts.setOption(option);
})();
//南丁格尔图
(function(){
	var myCharts = echarts.init(document.querySelector('.map2'));
	var option={
		title:{
			text:'评分前百电影分类占比',
			textStyle: {
				fontSize: 30,
				fontStyle: "italic",
				color:"rgba(94, 94, 94, 1.0)"
			},
		},
		legend:{
			top:'bottom',
		},
		toolbox:{
			itemSize:25,
			itemGap:28,
			show:true,
			feature:{
				mark:true,
				dataView:{show:true,readOnly:false},
				restore:{show:true},
				saveAsImage:{show:true},
			},
			iconStyle: {
			  // color: "rgba(16, 233, 230, 1)"
			}
		},
		series:[
			{
				name:'Nightingale Chart',
				type:'pie',
				radius:[50,250],//半径，[内半径，外半径]
				center:['50%','50%'],//圆心坐标，[横坐标，纵坐标]
				roseType:'area',//南丁格尔图，所有扇区圆心角相同，仅通过半径展现数据大小；
								//'radius,扇区圆心角展现数据的百分比，半径展现数据的大小'
				itemStyle:{//图形样式
					borderRadius:8, //用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值
				},
				data: [
					{ 
						value: 40, 
						name: '喜剧' ,
						itemStyle: {
							color: "#a5dee5"
						},
					},
					{ 
						value: 38,
						name: '爱情',
						itemStyle: {
							color: "#e0f9b5"
						}
					},
					{ 
						value: 32, 
						name: '动作',
						itemStyle: {
							color: "#fefdca"
						}
					},
					{ 
						value: 30,
						name: '犯罪',
						itemStyle: {
							color: "#ffcfdf"
						}
					},
					{ 
						value: 28, 
						name: '战争',
						itemStyle: {
							color: "#a8e6cf"
						}
					 },
					{ 
						value: 26,
						name: '历史',
						itemStyle: {
							color: "#ffd3b6"
						}
					},
					{ 
						value: 22,
						name: '音乐',
						itemStyle: {
							color: "#ffaaa5"
						}
					},
					{ 
						value: 18,
						name: '恐怖',
						itemStyle: {
							color: "#c3bef0"
						}
					}
				]
			}
		]
	};
	myCharts.setOption(option);
})();
//堆积柱状图
(function(){
	var myCharts = echarts.init(document.querySelector(".pie .chart"));
	var option={
		// backgroundColor:"red",
		tooltip:{
			trigger:'axis',//触发类型，坐标轴触发
			axisPointer:{ //设置坐标轴指示器
				type:'shadow', //阴影指示器，line直线指示器，none无，cross十字准星指示器
			}
		},
		legend:{
			data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
		},
		toolbox:{ //工具栏，有导出图片，数据视图，动态类型切换，数据区域缩放，重置
			show:true,
			orient:'vertical',//工具栏布局朝向，竖着；horizontal，横着
			x:'right',
			y:'center',
			feature:{//各工具配置项，还可自定义工具按钮，自定义工具名字只能以my开头
				datazom:{show:true},//数据区域缩放
				DataView:{//数据视图工具，展现当前图表所用的数据
					show:true, 
					readOnly:false,//是否不可编辑
				},
				magicType:{//动态类型切换
					show:true,
					type:['line','bar','stack','tiled'],//启用的可切换动态类型
				},
				restore:{show:true},//配置项还原
				savaAsImage:{show:true},//保存为图片
			}
		},
		xAxis:[
			{
				type:'category',//类目轴
				data:['周一','周二','周三','周四','周五','周六','周日']
			}
		],
		yAxis:[
			{
				type:'value',
			}
		],
		series:[
			{
				name:'直接访问',
				type:'bar',
				data:[320,332,301,334,390,330,320],
				itemStyle:{
					color:'#a5dee5'
				}
			},
			{
				name:'邮件营销',
				type:'bar',
				stack:'广告',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[220,132,101,134,90,230,210],
				itemStyle:{
					color:'#aaaaff'
				}
			},
			{
				name:'联盟广告',
				type:'bar',
				stack:'广告',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[220, 182, 191, 234, 290, 330, 310],
				itemStyle:{
					color:'#ffaa00'
				}
			},
			{
				name:'视频广告',
				type:'bar',
				stack:'广告',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[150, 232, 201, 154, 190, 330, 410],
				itemStyle:{
					color:'#ffff00'
				}
			},
			{
				name:'搜索引擎',
				type:'bar',
				data:[862, 1018, 964, 1026, 1679, 1600, 1570],
				markLine:{//图表标线
					lineStyle:{//标线样式
						type:'soild',
					},
					data: [[{ type: 'min' }, { type: 'max' }]]
				},
				itemStyle:{
					color:'#ffaaff'
				}
			},
			{
				name:'谷歌',
				type:'bar',
				stack:'搜索引擎',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[120, 132, 101, 134, 290, 230, 220],
				itemStyle:{
					color:'#55ffff'
				}
			},
			{
				name:'必应',
				type:'bar',
				stack:'搜索引擎',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[60, 72, 71, 74, 190, 130, 110],
				itemStyle:{
					color:'#55ff7f'
				}
			},
			{
				name:'其他',
				type:'bar',
				stack:'搜索引擎',//设置堆积效果，同一个类目轴上系列配置相同的stack可以堆叠放置
				data:[62, 82, 91, 84, 109, 110, 120],
				itemStyle:{
					color:'#aaaa7f'
				}
			},
		]
	};
	myCharts.setOption(option);
})();
//堆叠折线图
(function(){
	var myCharts = echarts.init(document.querySelector(".stack .chart"));
	option = {
	  tooltip: {
	    trigger: 'axis'
	  },
	  legend: {
	    data: ['悬疑', '爱情', '动作', '音乐', '喜剧'],
	
	  },
	  grid: {
	    left: '3%',
	    right: '4%',
	    bottom: '3%',
	    containLabel: true
	  },
	  toolbox: {
	    feature: {
	      saveAsImage: {}
	    }
	  },
	  xAxis: {
	    type: 'category',
	    boundaryGap: false,
	    data: ['1960', '1970', '1980', '1990', '2000', '2010', '2020年后']
	  },
	  yAxis: {
	    type: 'value'
	  },
	  series: [
	    {
	      name: '悬疑',
	      type: 'line',
	      stack: 'Total',
	      data: [120, 132, 101, 134, 90, 230, 210],
		  itemStyle:{
		  	color:'#fbafaf'
		  }
	    },
	    {
	      name: '爱情',
	      type: 'line',
	      stack: 'Total',
	      data: [220, 182, 191, 234, 290, 330, 310],
		  itemStyle:{
		  	color:'#a5dee5'
		  }
	    },
	    {
	      name: '动作',
	      type: 'line',
	      stack: 'Total',
	      data: [150, 232, 201, 154, 190, 330, 410],
		  itemStyle:{
		  	color:'#62d2a2'
		  }
	    },
	    {
	      name: '音乐',
	      type: 'line',
	      stack: 'Total',
	      data: [320, 332, 301, 334, 390, 330, 320],
		  itemStyle:{
		  	color:'#b693fe'
		  }
	    },
	    {
	      name: '喜剧',
	      type: 'line',
	      stack: 'Total',
	      data: [820, 932, 901, 934, 1290, 1330, 1320],
		  itemStyle:{
		  	color:'#ffaa64'
		  }
	    }
	  ]
	};
	myCharts.setOption(option);
})();
//面积图
(function(){
	var myCharts = echarts.init(document.querySelector(".xuri .chart"));
			option = {
			   xAxis: {
				 type: 'category',
				 boundaryGap: false,
				 data: ['1960前', '1970', '1980', '1990', '2000', '2010', '2024后']
			   },
			   yAxis: {
				 type: 'value'
			   },
			   series: [
				 {
				   data: [82, 52, 91, 94, 189, 133, 130],
				   type: 'line',
				   areaStyle: {
					   color:'#c5e3f6',
				   },
				   lineStyle: {
						color: '#adc7d7',  // 线条颜色
						width: 2,      // 线条宽度
						type: 'solid'  // 线条类型，这里是虚线，还可以是'solid'（实线）等其他类型
					},
					itemStyle: {
						color: '#c5e3f6'  // 设置数据标记点的颜色为绿色
					  }
				 }
			   ]
			};
	// 使用刚指定的配置项和数据显示图表
	myCharts.setOption(option);
})();
//纹理饼图
(function(){
	var myCharts = echarts.init(document.querySelector(".wlpie .chart"));
	// 指定图表的配置项和数据
 	const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4nJTdWZMs31oW8JVZ2b0P4EFAEBFRVBAVUMEQHLgxAr8JH8TvxBUXhhroAQ4yKDMOyOCMzLL37qrKNJ5i/Sqef7IPhlkX3V2duXIN7zwuP3T80PG58bnxp8efHt8xvmNcxmX81vitkSs//8/4P+Pj+Dj+cPzheBtv4xjHuI7r4751fvaxP77Llb9fxsv4/Pj84/s88zpeH9/n921sz/FyX97738Z/e4z7+fnJlb+/cnzl+JbxLY/n/3+v27iN/zj+4/iD8Qfj/Xg//vz48+OvjL/yHCXr+u3x2+O/jP/y+D3zyj5kjn9q/Knxbrx7PJP5fer6H/NzH/fH/R/Gh8e6vmp81fid8Tvjy8eXP+aQdWctmceXjS97jGQ9eWf2Lc/lZ77Pnlh79iK/Z68zbsbLM7kyz8v85HeX/3vv/xr/67GujJt7847sR9aXueeenFO+M1bek/9lvllL5nefn9ybtWacPJv/5R2eyfuzb/lf3pvvcn/Gz5V9ybszv+xJfppLxsj4vzd+7/Fsxs5zGct9OY+84+vH1z/OM88tY3nsX74Hky6w6R35O+v8N+PfjP89/vfjmZx/9ifnmHsCF5lLxt0ARW769fHr45vHN4+vGV/zGD4/M7nfH7//AOh8MnkbmkG+YnzF49lsWMaxgRk8f2dyOexMJC/P5WByX29M3pNJZoJ5PhtoHhk/m2vTs8g/6cr7csDZhGxYDjHPf934usezmXfeYb55l3n/z/E/H+/JfHL/nxl/5rGGvvJcxs28cp/fIdjH+XEfwLdW+5O5AN58nzGynwHM3x2/+/guh/vvx79/PO+T+5f52ecn6+txM05+z5llP7KWjJ97nEHm4/78z97m+/wf0DuP/MwVWMj6IEr+zs/8nfd99fjqx7oyr15zxv7a8bWP/33j+MbnOWbu2aecWe7N2L85fnP80vilx3i58nzOKPfmfSHgOZtcn4KHzD1wmnH/+/jvD5IWOMg6sqbMC3HMmJkTYgB+trw0vwSQ88K86JvGNz1fkv9/5fzkyuD/dfzXx2AZJJuCYmXyqFz+n3shEEDI4vOMjUbBcCYbnYlmzF8ev/yk7qGoGSeLyRVq4kBzMJlj3oGC/Lnx5x4IkvfnHb8yfuXBrUKNc4AZ8y+Ov/i4N4cQQP/V8asPgMwc8lzmk00N0P/Z8Wcf68k6AV+AGOXNe/P/XBkr80aR867ch+IhGIAwe4VSOvTsR8YLoOC4OHF+hyB5PuP/wfzkPPN91gpAM3ae+4bxDY95ALR8l7HzTL53HnkPSQFCQhSIkN/z3iCzueSe7FU4f8bN/HOWvzZ+7THPPGcfv9QFUQKHWUP2GNckseAEYxIrMPM2PznPnBFOFUTJmdgLhCXzCTyAzcw5a8re/IXxF8aWiWawPJif2NpfG3/tj00//w8lyz2ZXAA01P2vj7/+fC6LyViZTF6STUb5scB892F+8ne+zyIyZp5zmEQUzwRB8n3uyQbmXfk7YxNdsvAsNocRSpXFX+cHEoaaYK9h1Rkr9wXBQtWClNYCkMPV8t6Mb88QCdzD+3MFSIgtuQ+ldRBNmfMexAVByn3WRWQFsLmCxAgYBM14uc9+5Z0ZN+/L/3IfUSTvIEZlrMwXIuQTagshQ0yyZgiV7zLXB4Wd689+BLgC/Pn+a+bHlfECIwD5T0IQRDfEKsQBh0DpiY+4SBAUUmfsHqMJXdbufLLmzCEwknlm/BDQiIcZK98FB7YMmIMIAORFqEsG/rbxbZ9Bjsj0ZEkHF8CC8TZmTB0gBxBgzDPEs4xLPEMJ8nd+jqkbADQbMYqqOPheLMAiy6NmAbw8Azkzh4yf+x1+DiD3ABBAmZ+QM/POuNgxypSfeTabHMAM0AFG3CGIT57OO1D8bX7ye0Tb/zT+02N+gDWISlchP+f/eW/rDgAdl869CMvPj59/is/5Pv/P/Tl41DM/iX84b84DAcvcMxf7cr4gIA6Wd3u+n8n7A2N5R/S+Rh5X5hrCFQklYi7YwD3GfB+ClHsRv+aUY4pXniNmQebMJfpL1Al7nDPO/uTe7AcuvuUwsvGU7rwkC8mNeSgDZcBgM1mbuPNXx199Lo5o9HvzE7GEUu/FWUgfcItZS32wURR2TDZKIc4VwMx9mRNFrA+ZPpGfqK4Dw0r9H7cARADsZX5yD30qz9n4UCBULO/OnPJdng8gUsqtD/Jn7BCjAEnvEe5nrs2drJmI08QhY+RAcVP7HXEqZ5k55ScgzpzPAGo8wJx7ELlWes8XRZuuhGNmrY0g0X+yZgQsBCPry7wyRuAlz+b3IEevLfc10cw+5NwZODJHhBOXZjRC9MAGQ1DE7zb+5F32mM4c4r5hKcHGTO43xm885dzIf6FuuTmbnIlk8Pyen0QV4lE2wGS9tK0UgBzFshBUj2ybSWKluFr+HyDGbWxYPrn3L42/9ADkzCuHi2pQJgEWxMs7UKVmx0Q7yu5ZIc5mZ0zWIFwAsoU45LnH5haAh9P2HLJmFDBA4gDz7jxLz8iYiAFdJfcgaAHEUUYDYkb2wVmw0KDuEZP/xvgbjzngim1sQQTy/zyfNQUB8zvOnzHzO0AHxPmO0SPPkxrGlA7sTRBilKRBlwT4dDNGHLqtfW9dJPcG4SGe742JcPk799NjibZBysw590Sq+A/jP/zRuf7M8TNHWK6NyeTzz7yIiReAs/4Ew/ISgG3jyH9N3TK5bCbZ1cIjq6IgGScyqo2OzBslL5PP95k8ysPMByjbokUuN06Qnww9puJMKc1cmWYRBPIxAAQMZHpIBBBzj/ubxeOUKBoRjmg4pnjqvag1KyAEZtHJ/1j07GNbxSAPRPmURQfyeTa6V/aLPpdxvS8AGDEnv1OWIQtCgEjlvSFcgJmeERgJEOberCdjUpatERHc/4SPPc2aQpwCN20ObwJif0gHY+qC4aR55j+P//y02EV9iOEgCIxYNQEHv1sQIl8GA3MT+Rz74sugJOXvUHVAA+Cxv5f65P5YiYJUmUTu+cXxi4/7caEcVCham4HpRZHtQ7nyXMQYh4/iAc42H2fDsNscCGWX9QsLpSQy9wFOSJSDzE+c5F4fiMhYYW10rQBM3sl6BVkcMv8Hi1gr6M0FKKJNEIhXfjoTv0P4Ma1gLcY2RTbumOIxscwaWuZnbs4YqLhx2jIJCe2j3xEfZ+X3fIiciAZiy+KHezOCBE7pXYGfPJNzDbATt0MQ6bSRLCLeRccL3LLYBQ7b0pUPKaFN7ls2gKhkgTlwrJMMmpvzPfEAh6H4ZaKAnhmv5dpcYasmlCvIEYDJ86wMWGgWE+zPYnJfFm9zg/10p3Cg/GQ755gkWvBHWAfWahOymfk976DzQCgHywfAhJg1EA3Z1JnLc7E4OXT2+Mwrc8l6AUg4YsbgrEKpiaZZJ92CHpT34KSQLs8TW5mYc7ZMvcQcogqLHCRsYG3Oac4Qr7li3mXvRzkncbIWgSCQ/Wh/CCKS3yMt0EVahMOFoxPTQ7MXgZP4SgK/WU/+l7Gyx6xTvzB+4TMOT0YoBoCeH3H4L4+/PPd4LowoxdpDnMr3AR7iACU0/w9w2vRYOmI3pv2fryw4ZjRULFidiQAi1CwHnXdEF2JezNjZODJsDj2L5/EkGrFmsHQQoSwe9yM/89LyezBA2Afe/ewHz7iDAfQU0wBc3gXw7CtxYpRJllwOkQFDi6D0F0QnY2fPchZtXm5FGKAC8Oyh3+0Dp1vvU84BBwX0OF3ezRSMY/JLtVPNueKO1oPyQ146U8bLnv7d8XefImFEe5a+Ptt2ho4JS9ETcAC6ICSzZxmPHhoJBEIQzSES7k03+Zvjbz4dw5tDWeuTxecleVnk+EyEFzUfIRC5z6YGMH5i/MRj4DwTACZ6ZPKxgrk337UzMtia55lgyZHZpNyfhQVZAHTYaTaIPGvBORiUGuXjpYbgPPHEw7aAMXFnDIcSxKQvEK9wEvvBg24v+RoAImAxJqplrQDBfZ7haARUMY8Cesonebn1EDpC7mFdZJIngkJ0ijXRSRgJAA7Ry/ujC9pbAEUMR4GbYzCe4KoZPxQ50sXPjp99ErM8n/uENeXif3Lezijri6iE+turrI0ekufyfKQVIU2tvNsnktCYlitcnE/uiSBijQBHbsqE83e4QQA5k8uiyPn5O98HCSKejbJGcNxgnTmUvBDVzMRiYstB2yDmU3pNgCLfZxzABOBR8bynKXNbL/I8LoCqOXSABRgccIe8oGj9PVm7Y84gJ0oJwNs87X/IjzEBSB+a+88fa7DHfuas2oPNYNIED/LhmubbPoNQ7ZxlzipcnrKafQpSEi+dc54TQdDGAcQD8QxyhbBlfIhMvMqYCFD8ERAEl3Wu9gfncJa+yzvzjvwMTCGcrFUIEySml9mTwLpzJXV8JraNk4clg7wd5SaUnQgUthOTL1kuC4sM+ffH3386doIEbREK0FP8bU7eE6TKxo+KyyIbtphg0mNaJwBhiyt0iTbF4hgAZ60wGIDTcUmUcP9v4MGFKKio40OBm387jPZ8u5q7ZJ7hihRu4koDMRs/KxqTBwraiAyhOtSl9Y1RYRjtvW8nWn7P+UVsFb8FKJma2/Qt0FBoCoIG2IJodKCvnp++MhecLO8OPOFQ7Qjt/UPAIQ4kCZWPhSpzi56RNSC4iCFTdnM3e4hYZBziojHDgR6WVVjFrAr7OPbahBpMj1wHSDMIn0DEKpSBe5/H3ETaLAwAAJersZ3YwWzbugRAhWCAoIGirSXEFs64UKw2fXJwAdxwViERkBrC+dmijfVAuvafZN28yx2OQvwL1TMesZRoxOqCuBCbBOw1kuU5oTU46igvNL3D+Z39BainvcXR7bG1AqZ2wOb+IAOunL8TecEhFwLK5BsYCWIcMxA2RNSY3stlQBSEjE3kAmNBDPogAtk6GrG4fWH5PrpcJKT4g8YU8zOvnHuej5XrYSDgqs8XOYAsIlcmHbGK9SQbL04qVLDd+zapD8XGtnMsfzss1JCYglucTXwsTwAOO0TVW7kms44Kgmxd42xVa+81EYEYxGTKOhLK+K3jW5+H5YBZcVj0UPJ1BskxPULmvCMAIwYIBzN343sGktujXDnYyPIcgEeFtYeKNidDwOhFCE4TmBbRiDVNqNo65X7SRv6HqOZdxEdidWAFsHqO7opDsmCaV5vVW1HHEXBYZ5jvWPYo4i1Kuc+5ZP8i/rUe/BXzM6b4LgBzy8FmIsQjmJjvoliLlA0bpvl3/IsNY9GhAyynWCrUmX0ZEKOAJt9iQNvWW6cgT7sH9QXwzWHMA4fAjcJK3cv0CJDWGcLC/o/L5SAD2GPK7S4GjOyhYM38ZJ3q9TjosO+ImdZBrLHmzK+95rjHu/nJ+JkvYoUQGM9+UWYDlKHwuByLXs4/a2k5HKLw3fDo455twr1XXBjkzj24tvMkdoKvtQIOWUeZk5sQgosW/wF+m9elQ+R92VfIiCs7+/z+veN7h7yj85X3hvNBzI15z8fANom3uCnwWrE5LbOjnq0PtLgxpghFTIJ8jRgdvwQh3cdB2LqOOXIA2rB8iHmoL1EAkuBCbN+5NxS4xcAWN75U4hZkQViiq5lz5zcQT/YKzwZMCAlgb5GyOWIAhLEi90iksldt+uWoFI+WexM/x/T8hfGF532jdKdlRhTn2VDbEIUOSmzjSkRP8VgkECJS3slMzkJFsuCsxKWYnz0L1uyP31k2nfsxA0I9u8yYNxeuPMrAkCBOevU5CJOj1LW1QkRMausQDjGmcgS7AX3rEc3OKJ2AcJRDBhWjeOUwIGr0nIQEeHeAL9/FF5LfowNBqmyWzci9kSc5nyBkNifUNgfZukiHRojFaetRe9ojR4d9n5Om+go1znyiT9ifDr8fFaYCSCjfbXpEkdu6tleyEbMvyp51hTPkXTk/xgf+hOwX0Sdydp6JNEBcvlfyGs6ad2QcMn/Wln3NPvRFLI31CPccM6QHoeVgbK7OqdkGBRzhbIQ5yg/S0Ry+b1Hf/WCW5TJnGSTCZTPPIL6Ih74EcxLJtpZHeWVNyGSxQ1QxvwdgLDQD0l1MXhgAIOUlbucSjpNDzntzqGzg2WSbHaqOwjSrJ9JJcEH1+sp7v3Z+cm/ky8jrvLDEGGIbBE+ITMaP3vH/ujK/iKMMAvYic+GTCWWCkFl3dIjsX/ZJqHXvH90PZyCadkwULhLEzPrze+bCh8F6h/pLPrJmhIVpOjpRgCnnkP2Kv0n4CcBhts/cRN7KIxoVuQzw2/IIuBFZ11JhSnuFrYz6XxO8fYb5Uw/aNE9Mzr4GRrMPmV/vY+fnnK+IviSgh7OUl7bt553842ABvY3P/cK1zxQw3+feYGk2lH08GxUKe5vBdygXr7aQA5vivb87PyaeQ8z8Yo4LcmUuQaQcqMBLF6sMapHNIrtTsDuHQnh1EClrjZVETBnHkkvkbpxXch3GFLk6DsnaiYhMj4C99bS8M8DJux9qf5S/AqUMcrecf51JaLeZRpqDNmbWkjnkmZwLYkhmt0cBOgYAAC9C4FLJbJxyZPys6cwNniLK/AibQfVzT87OHmQumRujyNliOSqtltgv4BGic2AH/jgl6SzCabIfgRup1OcrcNKWzOULxxeOTIqJD+smauSlnceAled3CiuZTbg70SnjZLKZUAOXQ80GRV7PpHAbG5q5KB6B/bJ/Z2GoNLnUfL0nzwMA3nOe+lFFD1rhh8ijbO0MCMQPnzwb8eW35gcnxoEdqjB3yN1efIcrOzHv/zvj73wGwYP0ofzXmduf7E1ONtGoiNQov8FRIea4r/Ah4kOnBizT8x2gaKuSZ5uqI5AQFlWPqJf1Zj/ogt89vvvpJwHIzv9fjn/5NGqIt4OYnYqAuziHveLESBPgU2gMyyIntKjxIMb3jO95qhF9RTeJgu9s/uH4h2MTT9VY39YhsvJSBQ7uM53VJSMxGxSEyKLDKXIQQb4sNsohCgCYY2bLgfzc+LnPABGq3mm55MoskB4zSiQh3lAY6T6sOOJ16FP8CjZVSD+gWiu7DoXL+FkPyxEDBdZP8TeWIE6II08jgJV1K3AQRAtwsKb1FSpoL7MXneyUM0h6cERGok2C+Th0xycieoml98qDl1wGea3JvhJ9Whci9uAeTQz3GTIvWrnFXoCZAEMR0+vM7GxfVlsgGVaOihAQpUFkd765fnt+Rum9iBYrV2APhwKTOQvvZfJ/VDVh6chLYPCXz4+w7bbEZFGRPXMIYvM5BVHD+8zjziZCmDgTKZIQMgATjE7Iu9x4B456o4wy+MiHvLjtHW7Ztq1xqA/rFNMgx5x15/+8s+FwdC/h9vspn3ypHOdwNsYHolSIhtCdyyfyNFC4c0RwEx+lkXJPxLlQZVcMGFlbRLGc4U+Nn3r8nWcYPgA8n0krwB0HNmZcEird+olnES0h76rBSErK2TGABD5iXDlfHVbT4lSLaHxfbZamI4OfvJcEQEyW399wsFY0RvYxBPDfjX/3eLdiHIFfkkC+l26+5eWRr5WqsdEsSkxuGTwA38oyvYQMK/8aJxgVOJf/ZQJ5X6whKL9Mr1DQPBvq144gAMxXI3bMwVFIWatQEvkWMgABM08pqjhOCV70FTKrTyt5EBHbF9aQtYaq5Xdlb4id7RuQSLTOSFPiYuYsF7tDz/2U5EXEwumYSSEDx+OlIm+ZO8PVONN4o/fKJ7GfXY+KpQ/XJEYiQN6ZDyuYQFLZknn2IdNPK5Y9ybuEqKPg9rSteayibf4lopIIcm6tw/IbjUoJpzt5f74PzLG4eTZ48NBfvnh88Yg9mFkzFCoPvMyibt8+vv0JPNnAX5sfZWMCEJRegAl5bK6/n86XyS4FNDoM1pXjlLU3Suwj/6vewbLG0CC7DXKRV1k+1spgs6ntvLxXYGAjx61CotdTQGKbxVlRcCjf3WYNsUtVIFlmDS46HP1urxB5It698q4RM15pvpV2nnIoElntSebQwMZKdZ9JbArWIQCsVwgdDsTRpqAFokhXJG1ACs66dUYY3CppKwQ63No+ZB6h6iGobSBQfSZhUaSAjCW6u8OWFL7Ic7IjWUZFhUAyXJxuyJjwONtsciI4U1VxzCSmsCEULi+OrOvAIrvlf3SL/J7/Z9KR7eT2oo6ZWCZkI1l2iGyQ41I1o4ga7aWl/LcTiY27c+Gxd95fYuJ15lY3xQFQch9GJVKdr469MkeiCOJBRwNIKPVe0bH8IvQqoqlYIwCIg62VHWisnAnO0ab4FvtwDwjZHBQVb7HG/+UFXWa+D+7W/q8x9bR2LN4qTdkn96q1xuhxzPgre5zvE+aEiNhPXL+d0ow3RM/AGx8PC5bqiwqKZLyElUTPpf896l1NV0LWGOTscHj78keEai42LwvGBeAygGjbYCeW6pAkmaj+F2QJIKIMt8rNltWHOnbYdIdftCJG5hWGQMe4VcEAVI+iJ1SE+ARoZOG1ck6ZZrlizWpuJkboqBKao3K+KaAtnvF3NLJ3gN0oUyURyjyEQixV10vqcXOIDspzNaAelYuR8aM4ywX3jgAQDhenLF3vmNEQKHlblDr4r5X0nBORuH0VgHmr8PS9UnGXqlbDKtbEBueAGHSfnNePjB95io2892Kpwo0k4oEBYjclnSSRuYchCFxVIiri8XUWUtxMKMoVhSobiENkojKz7qdEI2a066zM0Qp1B761hxqwcxoSbQAYBEXNlIohqrUItlfU7lkB52dwj6IJKJ0AzGxQ/pffYygIYFH0hHJIi73NIhThtgwGYd+cb3QFOhmEaKXUd29Vs1jGniqPrXhmPtnbvIMHvJ2xmYcgPUQE9yeqIAjbLGSRucYQESLIl0AaGFXd5bVK7RCTAOxRKbzNFekqrUsgkk0Exyn3ZZQu2DnsYAjCdTBoU3vEVB0C3DJ7BCmzR1Hwc49o6PzeYnkyHHMerHebGkhZVEIGApwBigBNgJNpca0iDUsFmxFpcAy2abI4ESZiWA4r2MkSFtaWyTHJqbeVg81CWgnLPT8zfuaB1Z5vEYGtnek2m0Ocg0yAPWvOe4hN9xmYSdYmtigGd1TYCN8Bxa6TlnJfLFlC29ub3HoO7z/qS9zIc3lf5qgMT4CYzpT7xR21OIFqU4z9nvNTa4BCHRE4z8XMCgiJd94jlKU94MbE3eztvQpmnI0YlP6OwrWXo4rzna1tbT5vcXU51VFrZR6nwP0yn6zdvNoS2/k2pAQcP6LYWrn3W0dyZkPVbg03UbCaU434ZCMFB46KncmEk2ylaAOPboA91KsdNOuMmkVV1cOSrJI5CAnPfZErHTwuRrx4qVKdAZqsJxRZiipkC5K0XR5lxqEcsAgA1qkWG2VDjsosZJrMnmRzybtZi0JoQjToQ526u86QmyBEixzjZHrN+Sjgx/x8rWr7+6kEZ1shlxlxLNRiOWU9dilYvigUnNhExIIgqHxzyb2S3ljcWKT2Kgh41IclDWASTwHuOYQocwg8of6MBMep1nP7q7ytAx4RHCZ/RA2X2WJy7Wy9KOj57mXWg83hntkmlthe761SPjPG3xp/6ymudMhFI0iAIYsLMIrn59HPM+pzcead/R04iNCYbOJ3ju98IlpTEok8GTPxVWohxWrXCiMPPL2kK0QyGVsD0UVlFv6K35+fo4pwN7e9V3mjDkdv8+teCV75PnN6UrW5120WbTGoK9IcVaerAx+XSuSCMD0Ov4YySJEAGBQAGuDdK3/E86PiqFp/NY9zxAEEb+OJ/+2V6iyfhr6poF32J4QTF6W/EP0YEoj395nB+qkI9NxHj1mO4ziiiIcqmgwTHodg25WZxRwUa8M+y3narACLkjUwPCJWkC/AlMn92/FvnwAZkWqfvSGEmDiMrgdss/YKOoMMEd/iu+kYm31WjYxIhENE78gaOY0crE2CyDLdKG+o66hARPrRWoFwHYbPKrRXzd7MQ1gFpZ6ZfT0lJ71UFX0iEaWTeKQSS/ZB1RklYHH7dhCqLZV5hlO3iZvFDZEg2rQT73bKYfmUU8699i6E0rnRe6wLUDdSICK3GbJ/VEqz9wVpW08yLxmXED7fd9gSQ46Sse4LUuCegd2HdVNlbLZgbCcvZz7DPV5mT4ew+WxuRBPNU1z0FdgpMC/PRs7PpFBiWVstwuRnAFwuexdVa4r0WoXYhKHn+SS75NnMka8kawmCkE9j1kaJAD2HGeX8XjnqexVRhvydDEUJFVYCwOgdkpvkZGgZEFafPWSl6QogioLjCAwmqCMdB0HKs5yciiS0WbRFUiV1lNoEtBx4kJT17qiSrfeq1Usno8dyvrJW5r6Y//Mz1jLvigguJCWNbMTIEaVulWY9psi8nEom7VULmI6HEDAmIHqcs+Cc7nevegiiSRAi8LAllofVAvW02aFGOiY128oElFXpqu5ZSIAvAEpR7TALAYjYWMuvoWQmp+I6gLNwGwYh8v9wJCHjkDJzy3uSH2JOe6X2EvkE5/FSB2DIoh2+7cAhDI5hn8Rf8XNE91mnZzhzWSoDLnuauSlSsFVLCH/ztOdn9yRReI8fqg9UPgu9hCWs/TLM44jW7ZSbDtD77/alALxrlYENoGfdEVVVHXHvMkM52qGaNWV/6KeCFfmJckW3MMa9aoQF2XD9PBODUgj2bUYwN9em78m+3KtCKI7Gscj5invR2x56V4tEko/WmQfOix7KHxFMF6oMFiBmq77MyoQZR962jWS75tCBEA6HmNLy4dkh6LBxD+yT/J9NiogWRAAUWWzmzfrCgCC77pie+8vMpeb/QM0hpsqL3aIhcwhgsLa9q9rFrlDMAAAlGsIEkN9OjWA6totoq2pj1uDwrIXZ8la56i1m4OB7VTRpcYUoKeo17wohVHEFsCbBytyEhAjtz7l94/yM6VH/WK3aFJvIGeUZ566wQwgzBZtYs82clIwZRKCTIN7C9XnGA5Pd3gKyZ25BHqkNgW2GDZECKjiqjpJ3glfK/Zjqyy8AACAASURBVKMAOVkwE88kYv4DJHmBh6NQezABcXkpRTZyP/2hq6IwvaJyS5W6BAyUrVFKbyMGIGpZGxsXWpKCdZCGOJIxZPeR1zOnAIL3Z/NDlb1TxK55S5kdM8Igz6GIiSjoCuHyqXN42inIsKNLnJ1+dAj7wkzOJMp6x9zeynBzdPL6UQGet4rIdTkL4qWqLQGYRAHnuYg8RNisuU3te0Xz4kiuACSFnpl4makIRDeAG51XOjTCafwQhYjJjDrOn9RBCiFO6mKGQxALX6oDV57Luawz9ixEHjPI/yTqnY0KDzE1XMJGK/spySTUK1ahbLqFGehajRFDIXAAOkzXkm35EFCgagL7yOiUWgp+KAlLBOpnEag/QELFZZGNiuECWMrusw4BJo5EDs9lVjKRapp3Cy3PFaeitE0UHSBwut2qEF0bFhCGo6owHpVv0SzePUelnnZ2ZiNFvqPQchy28ksE0yeErJ3ns7YO97jPfB0F5a5VJaStQq48G0IZAqvREZ2h80W2+oyqd7VXlZO9+lzeK2OQGNqioQBF59ghMGD0WqWL2uDTCCFqQXlbOvHWYgGdQ4BcfkKayMIqmxwznkaAG1No+wTIri4OIV7utl1njMiduqrus/qi+qu87BHfurasCOA2MzOtblWJ0IH3Zq+VsQgob1WBBEfJHEQyZ956eoQKoa5EylGVJ9tbfK8C4BAb1ZQ/3yZZYsco7/JShfLENsUvpDlpN7TMPuV9EUGYna9VLIFzcqsqJfcq3MdyFUqe9WsOyleGiPkfg0DOL3PIXtlPPRNzfzjSmNxGcCmx5lKV75mes+/hbqSSSzU8tae85QgNpyadsMVy9xB53Z8xjgrg5L/K79s5oSVUwCYEWxM3H6TJRvN4O7BMIrIcpbXNriaI5WKx2J+cbLoLpOzEmaPKyQRhvm5+GhjfV/viHLzAs6Wqp2DVLbYdVVII60V5iFhCbM4FHzyv5lRzyLNYMyoQ8FqlktZKBPpYLQu60ANRRgSu/+HQ2fsuLhEkyVmF0yczUUREAJ1ZeZmBipxiAj5vFWkNKQGvNXR4+z7z+9uMzSL0sdpm7BW633FY0eHkinOyZh7JmEyac8413BvncN+lcvezR3rJ5NkG/HaW5p3JFkT0JXNlrGQNdstuMJE5PCor/uT4yWebZbFQOAfPqiIHo+RdbGmdMT9YPJ0iByP/WcekvHCvUO4gCQU+mx19BxAplIzaq3XEhyJpf1R5T40kcZGzmfJS1VcaqFk3Wt/x3agqLWcnZSvKxylveq0PikcZbX/Ax2o6ZF8gLwsgEbDrFdNvlAHilyEes4IFyDqPZymvd+YQip88ftwr4+qXyOFKd2LOtjLIJCW7TcaMGrhIqLSIAlyL5dE68kyMG8ziekAKoCSWttNTUY9LVZgc5afKcyG6GQsnFckbGMreeB4Rvc/co8daJDKNUvLoDp+KQkXJUGfpn7gGgM/CyJ82h3xuMhEFlKXv6FVpvaEOXUdKEGHG7I5A1+p71554lGeUpxarBqTtIHS1ftQiTiOLT3OJo4ovYNdrlfm5Vb/wUfWGERdRzDznR1VadLijlOUutOy+l9liQKhEiNRt5qIsVV2eOJl7o09pMxFRN+OSFuKz6GDIiG0heC2iSJprb/lyCjzsTEni7qcCWruObvvTmjO5rrOxahDgtZr60HNJC8ts6MopzHqV58NZIHWH4Ehc28TKvFVN1tYdbtVYhb9D4bbcGwqkKAOzZpeJYfd3gAA292RyCUlRolMmGpkyz+uF3haxlkEFnI1TXNSosOu9qrDfK+ebteYM4MeMlCWSdLi72LHlVMHRAR+Vy9+UtOfQ72qTN+JEWURomssYx5ieI25qRhrROGezziA+CvCYfiwOWeZujTTDcdZKUc2ZCqPJFeQIEjPc8Fkc1WhozFJIiCHlX2rrdSaUcVR2mP9btfXOe/g82il6qX7uozojOzsEWEpul3ci7t6rmiji+blqnPqMWOiN7odhGCqq6w4vesJE2PazqRa1VD3ZtVoEiPKlmFlAAC6Oo1hR2teBEkQR1aMEIsuJFotkc4KIt+rZx0z7Ui3lsOZ8yO8IAssJ6mwuxIB7FVceFcq+VX4JUyTqt5yq0AOGtl4RrZiCiV6sQcZHxX3HtyPKl/9GMKS8HWJYy/AB1mSS0i2JkIp0B6jCgXI+nIuu9rSPqqSSKwRUSz0WtY6IjjnZWekJIwpbXFXeLYyf8QCXzX2irpu4gRfOXqkUuNxa8YNrVWdpqxyOjhg+nlwqt7dt5yxDNjWUKY64bGgWHPGH9zLijpIvvMUsGywU2KcN4EwKhQobF6x3n8UeVEoBQOe2xddZSvSnx08/zX1Erb1Crdu6RWw8qvJ6X8S7UXFJONCospn0rq6U0jnc9hPgt88BN+zKia2/tA+oo3RFVRPtOg5rqbRehyto1PxZjYzNojhmWL+iFPwPRFm5KOEWrGWsTL85P7gTAHPPPlMM7HsQR7g9naOtdxmLBVBWa34251VYhJ5obXvlBumPf5t12Ih0Lc4tVa2xg0Rxzqc1ETBTBD9UH422JnGqyRw0gIPPPaH0QRQlgbZT7aHu5gq5IIE8iiAfRZTs2BlioYwSh5iX6SKtO/gpdOJWPTUAIoRaTpUAjblWAYAWoQBoV1lp7rLObDV+IoGOLD5kYRmILFbZt6yfdZDS3BRvrcJ+zo2epzBe6xpLedjNHZKGOMk/l+IMSUZVhYEw4qQgYPQRXKT9MXRI7+6Qmqwrc+2YKgr7UqH1JIy2kO7VrQuB5BTmnGSibgnmespjWitc6GxRxKGJ9FsU5WxSJkPbJ5dRvng7LQbWi2Fi9RJ4R0nl+daMk3LskIklb7Pqn0UYN8Ci3zgLVQ7V/awYy6mOa+eGoDBtxhyVJ94sdqmiAy3nXypLEbDKUxHR3M4pCKBXefuFNN8kSi3VVhmlddj32ctxTJ3NuiKmxDye/Y4/BoIzV3Zy0a0qtRNDIHqH4Czl/HWxEvZZQ7LLqUUDC1Pnf0BMUQ/W2Rape9UhILm0U3SvDlNt4EAkPlS7ueYCzr+lhr1yeOz9WoXTcWS1eR9EXnwQSgtoNRgJlRb/YjMpkW3Zuc0cdYePurqwehmBFtiJPEy7xyxjQ47MM91jm6hgM1t5RwUYCF6qot9SQXMoRXOJ1yqoDZm9S8mhLlhGbg6QojreFcSNSJr3p8YSC91lNhnqvhmtV/ATNQcQIU1Wz/uDoHlGDbEQk+hyETmJX6KZIwJfqhfKUgUnco4Zq2srj6nI36u/S4gcseY204Ep68Ri++5Mx0QyMV+jIhvE6PUetN7XljO5MO41Phhbq8SPVA26RPddMbbMVUaEiPgQKLhgvg8iJueBbNpe6ISaLKdeDyI2sfeXqrroHnFYY5p/UUORm6Paf20zHx5Fykbv5c1dZo90B7ZXSAJ2eaZCz6p4p3wDG9nBcTzArC2ifEfZwyndQqWFeoxp1bnOGlzmANFRs3BmyUnZb9zvXmmq92pfMGYWYeYeZZo8LvoA4VF8gd4QEa2tY63v3Kp/ogvSZc91ugV89uRe1WQ4RSm0Obe9Um/XU52AoypK3iu0/FLdol5meSmmbYgXcZ1EwiRNx7rM/JnXai9xnwGW2QPrBctnzhG/T56POhDCkv/Hz0bMI/KGe2+dBglIuN6xKBYEh/ShOqEKTTEZgCt4j2UlL8u4UnAt7FZZc8a/V04C7GdybQfbVk3t+RBsJoqCAxDB9NNwj0Lb66zXhGpxmub/qssDNjK1fH26jJRioh/RNACY9QP+NjfmkIJADibKcO5lPMl72fmv1SVqVFMiFDnI13nr91ndEGFxpsy8e1VKIV6wxIm5a/9NOzhx4tbtzn4lBAiCoeznUk/OKHtBl42zsn0rxDtclZSikayigYIgIfL7aiXITREEaadsnucLJK6L+t000L/Okpv7KaeZGS4HoNI4uZIVpKM6G7gBe17I8dKf4xSKbTPOivOoGqt7dbUaVbzAoUTkuczsxSwyTWLOYoOo2ZdZ6fs2a+7eKyU1wKmZvOLRqCuDBtEs78kepnMR2TcUKRxYMKDDzEEyWQcQEhUMebeZKMX8nPcoDnGv4gg5mxxqgChUXBGCrKE9/kGsUfkegOKtqq7QFVSLPyrqAAJeq5lqn7+I11aKWdVIBAFGgPtWOewcn11TwDz1NBkVCd1EIYCbcdeZiCX2q03jOWucelTCGClB9AZOyGdF7xJ9sOEOgOFPugJ0mTxqEwUfR8n3nDotx7eVpx2QrVg1dRvlwKMPsUIcVUOrN/bz89OKqZDqvRqvQKQAt/CYIP0oC5GeEvG/HLMbEeBpqpk1q3qSTVYtxRWvdOYe5EKFwxmy6XQRrQZyGByQt1N2Ji7UFDRjZt7K1rQB5VLVBZsY2bcWN0b5AjrG7KhKMVvVtbrPfB2iSu89HXU95b7nHNR5zl5FBErvy470Vrg7BERov/mqRcAZSA/RTNZ8wJgIDBEdgmpxwCBF0jX44MAlXarF+8f7KHevX6K9WFNwcTlEkZRIaasQ2S8TQ0n7IEYpgedrmcGPONBLVUVXzKEnbhxKc9vuL9We+F5BbkeVj8kabC7DgySovDuUKesJBcexiI+UZUqlulpnv4rSlyoUJmiQxSdjcKDx+awVXJnnEjDX9bZYzCBSc1PU8VZde48Kce89w50vVbv2VmkInuuSOnuF7izV5o6pfikH8WuVfCLG6c+CczQyIU44HoOJrl4ofSN7x3BdKsFOiE0QrdNqR0Va53v6xih9jVGmrY5bIiG/1CXcQdjIOMXRRJ+QlwAgz1T+HOqxnHrytVx5qeIFcjWu1diHV5wIlL+FxbfXuv0i5qJQmAOju6Cg+X/WIzoAS5Y3T1+gH/DmbtWz5HxlLuHMORAUCyC/Vps0VCz7nXwKf2sms1c80XGqS7ZWmZ62TgE05uT7KcTG/0KhjUu36yoxXAAtvuEcLmbpfZaCEjaEKIoPI2G0lasT6l5mNUsVVaKPRTRnpGAcIQYtVfOXXoVQ8ud1eNNW9Y4vFZyqgei9cockjP2xLiIBtgAFv0ObUlEFB81ScOYKKIIXdeUJyHTeIPbs9hFYJItYIw6LS8ueHFkO4l7NfNrx2Y4/3EPpe+LTZSb79PNMfwIxcc188s6uE+ZS4DsiiCBCTXgolqlN29SZjd66z07K1hFUk8+ZcUgyNIxqBNRE6WO1sRCCflSo+1ItqxU7yJqVMso7ku+f7yJFcNi9q07E3omgnTnAKF3TmXe66+dmW72uv8sNQUnHiZ0XgtduhL2iixlzwNc+k7j4rqLX2bOIvo9kwX16MZm53qpMjwMd0/rQG3itTEFANE4V1TkMG2Hcm8VHQQ1l0g65FeCjQlxG6SntTFyrQDYqEmrAVOwwQ93vVYuJMuzQcce9gg/Z15syE5PkshA7sjeRa4MEEVeJN5CMj8BPABqO1bkgt+phvleYSwfnHVW7WEEHVUrcoxNw+y1uVWD7rSqdNMcn/vFRcB7TM3s+4XRaKawz9Cb+BCEj7bMC4ESy5VQlH+ETikRU4mtrUVEPFgiiqk0InNJVJBfcUM0BbgrnGZ0HR29OQid5+HmSD0KRzqayuhxV6cTft2pGMyqEPJPeK0eic0dQUGU/4zwTcpEJho1m4/K9g+NFJ5efORjx4F4VL6TLoox7FZlGwSBsxlY5RLuBjnSlXGP3HKH2pMPXb1ULV5EF+fEoGd3hqIhUyvUoEzRq33Fp2yyYcN7TKLt8RIofdERA957EhVrRd55b9ajv4MM2Dbfxg7SQ94biEkvyDNFqrzKiFOz29/T4bVEb5S3Pmn50/OjzbMf0+4SqQ8itkruyh7I/tUrYp9dewt6YbouO7Aj8Eev/2fhnTwS1F5vKH8spfoWzpMWRpTzOCh6vVSZTf7i2c1sUJBO1K3RizCxGWP5hNqER6XmvkpbrrLBI1mWZogQalz7Uirl1dfl/5kMWFlHDUczVvc3cFBJoERNyuNq3kTEYAG6ndmZ75eZDBtw384hOFbm7o1Xb8bZXXxNn0Hoaypi5JzgQUHRM03FKGWDZEyPVBoBj5q3jAube1knEiLQxygn5rlq+IZ5E7reqtGlvWzd4xkNNRNDi71MXJyMdmW+uERCxV04pRhR73HF9OMiDa4o7YZkASG5aK5lHCRy6ASdZy/Pa7+aFvMfZYIBJNiXuoFiCIFEc1qb2LuMiGTfxSMH+ILhWDajdW5WTvJ5K8bdOReGkE/zq/HQarzx8QEOeBWTZkzHt5l30YK/AyNYbGsiyVznwHCRRMpyrcxeO6gFyq068cmZaZMj7I+bo4aIuVzv2en9GVa/sVg4AFaXvZjlLpTKvlbI8TrkY4rtY+ayPyPNSJUGdsaxJBG0U4VlnX/yE0miO00lYdBbEpU3F4LjdBzGe9NXRBvTKEMKtAasVZ5iv6LTcArb5DjehW8TCEwrIg5rJ5meALolRzQlQHGV4ONBclyotg9PcqttT/BNxlIU9Cm22QJsPUAH0PmNt2t+R7wJEmaO8bRy0czyWSiRbqhBcECQi5ttspxBOwwx+q/bW5FwAqe2YtaPy+Zsc3Mr5Un1DMlaQIKZoRCP3hWB0f3MmYvrXUc1O21/VgN2AjqtJYjpmHn6LRCyLLF4sgMSlrHNU11pE6aiiFqOCDwNDXfTbGW7V+ZhVdZ39T8RV0X2YfI9KlSB6dzxXuzZ0wR1VaOMR6tKiVHONe8Xph6pFR9gqv6Mdb502itrEpyBF1qGbgHGz0E7YWasUvksPjyjzStUcM+dchOhWxd7G1CPoCyjJUUWfeVtbtOxCD3wvABtAyZNmXgzR+K7xXY+9ClBGJmeJwepbTs5asj+AcZ2h4UTUS5UURcWJGPmpmLRCaN6xV7h6CEd3p2pCNk4RsQiZvwOYsv3yTLi0e2KEaCPCKDNrxFBENM9HgXfmRGfcyMc5Zj+c61ZdqCKW//D44Scij2qkw0tONBoz07NDknCVNDwNt4lPKQhHt9NU1hXCohMAHfGBmN03+63Ka7LsYHfNYegFWidIXYyHNBge5ED9brNwcHpip9JGAAxCCJHIOzIWa8mlmk/yro5yMh5V36j9AUeFtzRnfJkN+j9lBetCCMJBslnZVMp2rnAG1jbyepBjTD9A9i4UnUgnmUrIP4+wNFciSw5qq1JD5/gml/0ihuGul2qdTWnusA9+DvpdW21EAkjTFV1A7FYhhUGBU5OTLvdGYoi4gvjxZSj3qWxPh+k0MT6Hg+AA0Z9ulbNOzO8sw+bu94rpssasLbAYeAPwy4zPCkw2gkhtvp+KZm853Hb6LKdca5+9wswvlaJKAUP5s+AAyqXacbn+1fhXzwWw1/v/Ucn0uEO+y1h7RbuOU2zRUaVmjlNCPrNkNlWRN/b6XkPWT8kLt4oC52IVCQfj/yE6LLNQRMy1EdFQLz6EIBsl31zkd8dYkb3vGKgOc79VLYAGprbkOXAZeuTrdhTm3oheajAbKwARcQZQCCJk+cl98c9k3YI+jypKIdyoQ2x03FJelSjVcVaexTmdxzodwc5FohgC0Nw2Yi1L31IxeaMyQXGviOEdWX1UzYCzmNXXk2DtMxYG0Fyr/OU4OakaKI9KFz3H8bQMDUn2+jCr2UT26AAA5yTrVFuCmgJJDrpXqLuN1H8PFeXlDkW0gaEqIl1ZsXLYocLMhR+rt0eoPUC/z3yZUKFwFuZi7ZM5FI/ZrCW1ntonEjEoogFxin6zVJ0s4e63yqBrEzokIk4SGeW0aOSzziy+5VRhZZl5523OpWO+VVWYLtzN8cfAgpv8zvyoMnlUR+Pc//fG33vsk/JP/GAtGQRZ/8H4B497VE3h4xJKYr0yWiEck/2lumKxZIUIZa8hEyNNno/aoB96V8Ics0B69LzNBNtygPrqbKQUzK0KEnQmn1AD/2sZswMS3c/MR9+hdB2n6N6tsr58z8wHWR1I29VtPMBvDytAXSq47T4D3CCFQscQ3aHQB3LFFCwknB8g7/tH4x89keA+m/dE9HTgiivQjToS+lr9H1G6vLtjylrcZSZu4uD3nAlzM4C359dqe2z+mXPm/7F6neT8td3OeLiN2gMvs8GQSuksoRA/80s/x4wbUUddrFGGjjbahDBFZMv3AV4iFOsf0ar3hmX19dSKfFS4f1eJz4eVMDCfgNv8rpkp6SZr/KPuznW19YEJ7ZitfLfKdrvP/tf6GP5h9fkmQ/PIjlP3IFYmDjbYT1xrf8LZ0nFUvI4awqhBX6w67W8AYNI9hWUojYnCvFSPD0GJOF1zTHFSS9Xw5bzL5oaoRDEUg/VW3XqJKS33diQBLiiRCDWGBIAz1C8iXMQa7RAQARSfE9E+7NW3cZQON6qe1XV2bArny1qie3mGSPOuWii8n80xlxnzlvkp/kYSUb3RWXW2qXivAGl+j7LcTtVr1TBD+AQzhpPn/YpTE68bVvg+iKG3Wf0k//vx8eNP+GtC9Cy88a5adl2qDRUHFIDxf5yGmfZaCfGA56XaFYxT+uaYXliIyBmIorfM7Z6Wf0OxyKMvVZytdaX+nU7zoZpzXmbyDMfYPquihMqFgp1NoNExtFVbKzyCR1tdMEgceV+X4DGV+Fs12wE4bUw4B9V1MKVAy/7f943ve/wvexngS37E2+zymu/yTlGwTWSWCnRsEY4+dZvFKFDQpXLm71UOCgKyTmaszCH7Go6Jw32YLZr7XDu27qUKcWfO8Z4jlPeKVD5OkckJ6YkhJYQuNcBwIiZ3iLvOBkpCg+wBUThGCOO2HuveTSxLJiPH+G2W8bxVoOBemXxk7FFKPS6BUrWMzOy4VyVEbHwrJrZU2MDlFJV7VGNHyHqZ+SYd/MjawQyb96r1pJRmvlfPlaPxOmtJZdMvlbcSDhnqxJKDSqngkgMxrwBkNhxCSrbCATyfuemi5dlL1c3qM6HQLpUKyq6vnOY6k7ZEucY8m3fGKNIWPmeCgPU6RzkIM4cOvIyyLoGOb4zoRtdqMWhMqxCRSMdeOlpHIBAH1QvuSNsG1Ca2MaJENBrTf4F4EZHCzeTq5zvF7oL0ObvsX4IshdezoLY+HS72GDNsmk0dZe6izL5TsKsdLRBKG6783gruKNMsha7Nl4C85UbmOVSkw9iXinTV75rdvFkwz/C1KloA0Mw1LR9QzXAM/SZuFQGcK8Ae5CD3Zo3hFjmccymiyMyoElGn5wdQAyytVCIgTWFxvb0yIYkhHIwoO+6UM+SJZnrPc1kfnaO5cTs927zsZ/ZEcGbrMAwfmWOcvwFEBDDEJjrH/ZSZOWbeBoDdTmnD5k0MF7KCGEFmTj/cITDJd2FNLGaXT1TMzzpCADlQ39WH74NU8mHWf94SmhAMCyay3YfyKfNvcmdZealYmnez4ctepWtaKVTUmojmICTos+/7WzpnUzv/i1x8mwXBiAUAcJRpsy0pDQgBnH8+/vlTZ2CMoLhFnAp1D8ATUe4zElXXrS60FwQSlbtXa2SGC4iV9WRcHnqyupZ0bT1pan6vnie82kyxmT8jhSjavCsi3l59B1H5pcKJnEETMpyGEzd96ekeDCvi05Qjepm9Jxk38u4xrUIdZ4ZoNLKJ1WtR/uzNJ5aSIhhYRB+06Vme+vXUh3BMf17+F4SibyD2ORchP6IunjqIQgF0Aa0PyMq3qofUm+gFnd9BXFqrukX+p286hTcy6nHqUKT8vWeaChBDsMeMk0PS/H+pqipNMehFL1UnC/KGKAQIxDTFwsKaQ3kmq95mW+BOLpPor0I5x+X1VGCCuMTaEqCOiJDI0Y+zl94oERYQd8hJ3p09zDu0YsgeS+HVw4UDVuelbmuBevsp3TcA7T2jYpIYWOgaiETm0S0osrYoylGwvVu0goiFnBOd7Dh54Vvvyt/CjRCFADpvvPllnOxDuDmxUl6PKjAtQpJc8qyCJDhyntM24qWaG4mT2yJGdGIUZZOcLwhPVhhEYdVZq1AXgLBw9vxsqF52WSjAhnwUtXu1zjLZvYL+cm9CHoIcER1E1Y4KQ2BuZaa9V5kYPhrijjB194ta7eR/+lL2J3vFrCmMBTLQwVCgY/b1yHy+YX5wqSiiOE3L2AiLDD/ycQ5dhRNzl6UY4JQslQNNCzXe6aN6i9C9dBnmBY/Huh3B5sTCN06xWZ9yrGV+2TfU+VaNi8KFENTOOD0bcHjy6VSjioEsFW7PtB8Aju7I16F7FR9bYI647xxx1BCHIESeyfyyJi0+PlYz18czoZzEJuYuwW1ejqKyuaM4Nk7yke/08JCfEWxnFqbEC30YVe6TaJW/Q2nT3CQHrmYry1VEmjzPs4xysXBkA1AkNWeFXWQOmux0pO1eXajyv2wexyDgzfdaOjRnJQa2k2qbCTevs2dHLC2UVhxnrWhWV+tpKH7WqVFRJyLl76w1oR6ZV8zKKDDRUZ9BRJB4RamnDwgFOZuz2yezfaJGsisEMFxCrSxEok36rf8wvUrfFb4jv4V0cpxitCBLuETWLlyJc5T+OiqNG5eBdJruUOyJ7GBllIi4Besv1UD//om+djKzHKYKIpr/N7UGrKwT6wxTjmMtaZp0hG4LoJmJecRwoF1XkE8cDfaqCEK3fl5OedZ5PocZKqMUv/lEuQw3sCE8zfuM+cFiUT4H1fW/+p29V8zAdAnUnnVGeMWt0lHXitjdT6U2O7/lqH4huGX+jpVJmDcxLT+DOOG2uWK1gZisf3wHvOLWFI6gDBLuDeFbbHPlHLKfRO1L9ZLhYHw7tegD+LEGMpPrdYkD4SDOtM3io8JBcETw+K66KjcsQ/BUrNEqgk/rWl2s1qpev3GCLZXw39wB5eCUsUnYGaeUgtIWwRImpkZVePncbYOnu2SBIkgBikoqAiJzyKrnKU+6V3h6Njs28tsshSoPRTg7jpgwgmxSEKg95rnyv/up4U13aMLJ1mpxADnzMwBGb+Koe61uWQwGt2rVnEYQHgAAIABJREFU4NAvFeaOMrb/wbMAhJJPZJUzn2hYuSoCB4WaZO7ExDaf4yDhBjoEj3ImdsyeKAExaghHW+V8B2nv1Z0s78k5QWCWNwjRdYFFGCv5ep8lThlCcn8HpJIcwJE14hZfHF98Wkl7r13O8BE5YfC96lQJQAu2KQzAhr1W0/uP1Rd7nTkW+U793Q/VbzwbGTEDVWmnHflSfNIoUy0PbHvlcyD64+0Vvv0ym6UkqQZwocrvZ3/xXOltksOG0J0slPem5lID7XGq2YWztCHAfRqRto5x5gztGb5XJY0Wa+RRAFB7Rg6nGym2fK0KmKGQomjFiB3V/qEDRDvezDwjl5vXXgGRmVP2XQ2sRw+/ORfldwDcUdXecab+/8vsdyJg8G02T4K0XTWeFa4rlxgXNwzxJRXEYDBmrF9zaKVft+rHQv8lenJwPtuD/+Dxg0eLJmTgZv/Ms+1NN/heSUBv1VEIF2kzJGR4X035xTcR4cIdOh3XhnT+Q0djYol0D5R9zPCGBsBsDiBrMWap+sOAxtXRpC1SjUqFbQdgx57dKhuOk48DdlRS2ChFlEEE9z6qsjpu0vMHcLhMiBTFnHlZBy/IsVYLBXuMSEBe81mrNYA8kbUia3EeumPeDQ7AAuQ2rjXnrPl1RACYX4+zVH7Hdda1aj0tc4r0gWiybB4zMc0e0HeEqoB5Ek50U3PL938Uc1aV15k6my0JI+Bp71RVWOn5tmGvM4VSOMf7+bl9oi/dpfr+hfWrJH6fkba8toDrqKC9S4Vv36tmE+Bi/iPXavhyqUIJsifpKc01UBROqHtVIe+Myv69n/U7qtfcwphv1Y+EDgQo3k5lRztqACLeq6V2cwhWszZCjFL+hYLcq6BBi0HrKSQFQpxjwzo4UHiPkkH0x1FRF8REelT2IPcheMT2RuCl+rJfKm/9qOoxwknMOe+PWnB2UsaXFo5DRcBZGKDad7e1TCsmpsWtj1XtXS4x8Web9YNwC8B8tjcHeMOymHQbOV6qureFAZyvnp+MEWsW5b/ZNapFsQ4yxHyJEy2zIWOHry+n8Jh31Wxe27EGgMjkH6rjb0cPRJzJ/yOWZZPFdiEqnJAtLu1VFqk5U3OrrRrtI0K3U/53ixnL7O+twiP9bFS9ZH4tnI6pGhJvlS3YnnbrEXaEcI5yzDqT7D3xqUW4dg5an+J/jWSjnH6IXocTdRgSPRhg97yCANmLJOkRG+lo0sJdeU8MPy2RZG7RkTYhIpx4owoJM8vZ1FEeXiyZLwDF77yILCysK98x1aJkxJ/oOWGPkWeNGQBVo0jVxHMG4V6leuhM3imAT90r1ieHtVX1wbdZyBhy7lWUjacXhVeutC1lMQroQ77PDDoKvzzpUbksDSQOuz3+gCY/ZQICru7LEocdz/k6o39jnctzCk/4H2/6KMcfitocaD9lMbajlriU99iDAGF+hjDoM5K+h/waopmJPKP6wIeAJWRHmHqsqaylgkBD6fM/wP2+Wt5dKrBWCSApv8zrEbmtu6O/Q+Rybi6xei0Cxrr2QCQco0WkvZLkTeJ99S0HcPwZo+z3XW6F6ZBt/FaVQXAgXtdYr6JcfahGlBRy1Ii4g5oAstsMX/YO44f77FX90BhExQ/VMprI1SH7KH0nEbHZx/qSn4kK4JOglBIF+Y7yXTv/IEjnit+r90dHNJgH6o9IiEGyB9nDKKk4R8+fmIw6khbaMNERtu2XgcRaB/A1BIBw5yjtxBViTPs9mnuQELSoHjPauQMyFUYXSxa4aO51r5bQxkVYxjQ751ke/31mlSJW7ZUPAmbfLpXgpzLPg6u2PNfs8lZZfKwzKErrJc36G8FYBZSlGVW5sNNhcZmIKaGKxKEW946qzUtBbMDBnTpk/5h5LKFEFNK9IkTpHOzma7WFywaTf/cZfNhij6ajiuCR45lcBQ9u1VK4bewKZLfpsfUV1sFr9ePwLEPFcXJwMrkiVrig7lEvpzYFdIlRKQXLKXVgqTpSAdRwhxZN8nzM5KxMHYIilbhFo9YZ20rHFwchVU90KSJIzGegQfUDFxH1IxLFJ3RU5PK1WjQwJmTOWZMSS8zFL9XbJlz4UdVEWHPLwCjbMXvOtR2Z+IViZHM6sy7YGeyLsy+iB5f/UdUR22w6yjxLHDhmUBpdAJdQGBnVu1fZ/7MZkTKt0+uoGlBERKIe1j2qUQu5tikXkSxmZFYWnOt6yq3vsbsYgD0MgBCDugibyvju72jg9tavVdaoHXNtWme5wy1xQxbIS6UUNPcgThPr7G3E4KNqigWI2vkYjs2XAWFJHgjRtVraxTEoXL2RNffnXa+z1bdxbqeUY3Pn74r5PgQWJ87ZqADDouo9IhO2arbEkZuLKXuLQ8k/tEvLQCwckEdoAoUvwAFIjmovQMGJ0vqxujGJJXqZbd7WqugnrADr42m3CWTeo7LE1ipJGoqT+TEU5Gc2HpVs03BTZWEIqDIg83/UtkP/PW9d9+rmCvmZPFlV+h6UkeIuL/ytSna2gaA5y72KNYwqXoE6dgTwcYqMdW/rIPupEMd66ibbe6BV31HF+VgExzTB8r7LnSEBdGqvd+V8OCw7E/Iymy2RIMZJfO/4P3uescMVWlSjq4RArlXxprl5E4SjGrz2Hm6Qoi/yV1euG1PROV/vqmmMK6IG9z0qqQr5x1O/OhPmCHTwJik1lUJ+VFTqpQLo6DQy765V/aP9L8ZcT62R31dPxFFBknvl6zcF9/5GmrVSUrseV98PaZdqfj/KpzKqV8c4haGPElMbOTzbiiYRtkWcvTzjrF89HhFklB7yVlXZOQP97Sxxxa5I2XPqc+3vEcI230oDEBkg56V9H03g2p/V2a0vVTS9jQ171TxgaGCg4ge8VFXJLTm5WHoULy+kyC6nwgKu8+JdWYi2YUSv1ifW6nfIB2ByQujzTFhsNmuZOd7MwZExlwrwI1bwxm6zPI64q6WKMzggF9HjfiqjQ5xRsfGowt1n8fBe/dkbSPvv4xTBulWCmGutlFiUrE2+n9JB2hrHywzJ29Pf3KUBqPej9Y7+ro0rALDFwlFdg/NOemJbv45qE/06+6LI7kPhcwnBx4nWGR19Jl7tl8KV2xkrLEWUdmCL0WNUVHCSu/I+TXfauqcc1iNYkQgjfATFIssJN2EZgvH5HWYza2p2clQP7LBTSNgiwa0aSLJamajmKaxgitHdqlBYOxCzuRxj9CaH3OJLA+lbVa9/q8JmrVSup74co7zX1mHM1heaC47ySCu257A7IrjnHOPC2+y4Kz+EpxjVZtF7qVKxo8p8juLGLWM3V20fSCNIK7bWdquGq/cqwNHv5mhtMc4ZSCOwhqznVkXu4rOIxQoBbUuVDysjCxdCINMQQY1V1KXcUuA1opj3xVKWnwJjP3VtlyrwBjkcuEDDLDSIJCfEpHWsxWGUf0Th2tn0VrVZseRWbLH8Dgo8KvkpiEfmXSpYz1z5Bz5W618y7Vq5H9lYouOlqn+0eARBjN9m32WmkfLj0NfWKvINCO+zJwiHV5A8xgt+CmsUcpFWFN5PiUdYAkztMDOvbdYH9v1bFekGpAI+z2IsxBDCsVTUAGo/psgt8FS0gTPXSkLU8e1U8X6U+Egse5mtpz9Wh+V8p0WdoFLnwyPPB3PM+Ky8OzBIb+aDah9HiKuaA81Bc6VE6t8ef/tLIsdjf4J5lNBr1ZS9VEzVqJbD91MXWzKn5ifN5iFIj3mZ+SNdqBpysM37SFraTh2X9qoePsqcx6mG/WrYwkq1VZrvPgvVdegLFt3ftWOKmBfWLFwcd4Ik4WRB5DaJj8qYjNMLYHCaGWuvCpIIUYASZ+/DPSozcEyR2P6IIm6unI/w/tsMtW/Rp7ki77T1B+Bi2g6Q/sb8GDucns/L+PeqYNNEsd/TomnGEc4OOWR6Etmk7+6zaIQI87wzyDaqoAMCmGzJ7IP9Vm9ZblHX6Tpft5k2vX3P+J7HvwQIdjjJdbamomgv1Zuvgw+vsyLIXuEbrUAB+FY4UbnLzPbL+NlsGwNYQ23FcnXcUyueRzX7eal+EsyKUlNfZquD6FrZZC2ixf3gCpCkjReezZg8u0uFcAOSAI9189CT3bVp8IwQmS7aZ6+UwdlPYTlL9R9HHBqYPjc/wuzzPK87pysx5VNWHenMQVgREu4PYaMbQpzknDRMdILavWpM8UWBi5yHfWBKZtHKuBLL1mqx0JJBGwpIIrlPvd3sdVvZwmXDvcNRSD4dAuTKeNGBrGODbX52zP+XutosGqU5m0nGRZ1QDM1wiBTtZESxWhHTollOc8zQQZKwXxRtqz4frWi2eBhgxs4vs5mmPPJQDg7B9gGg0p07DSgBPO7Qa0BQupVbO/HMqQ86+8xPommldE/+laa8rXMARkGB+yx1I/c9RhJAE2CPCJf/IyLto+Fr6j1QBJsFD6XP76g1ToM7CtcYlV/Op7PM/vWiC96qBTRdT3/APBcAvVQA6ygPOi6TvxPFIGuV7y779tvzQyTWEFSmKn/OW7Wiy/2BYxZNcLX9i/EvHjcFMMWyoETk+aWCxO5VhZx8R5TYKicYMnSZFu/ptNJ2ELG1S9YhtnDyoL4iLTsYbz8V3I741NG3GbNbKC8Vzg1RiUsN+O0N74iBswg5KoAQt2zK3KKf8JNrtRpos2lHCfiJMyj3f5+BkEG0eJDte+7PQV9nXV2xSA5d3FoARt5MW9QAi71pr3cIC7E7SMFznufbTyJ6mn+LDqEiyYeqo7tXzxbcRSyaErKjsgfbiteptGM2oP2J8RPPOZMKUtBO2aNwp2RXgpcQePAJfuzJw4pl0S0HM8VJZlFuphGFrGixe3lKr9VrOtjK5CpfmBc+G9BOmfzMJm7VbJKCfK+SQ+3dbk5ifqw/7bw7Kux8lAx/FldGmVrNF3KP6sorj4H+s1futrlDVqEsamIR47Dz5jit5AKWY0Y0nFvSBdjDMbRfyJxYEXEJwN3Boooj2JMu/raeKtKwIsqtZ8jpvvAQEhIiXvb9Wj0dEd3rqaA5LqshzrmJaivYR5V0amPF2SIY0TKSg7JEEvmcW9YWbqtfPSTtplHPwJpbVT5kOl2rGnhj15iOMHpImxEdsr/FTS2V9LKf8q5RubWScz5Whfi2g6+VlbeUQ2w5RXjaOHV3rYF1x4YHwHLYumE5MKKein+daJRq5ZTjjJfKIAFAvhgFJHANSTpKcAozx9E6rqgjEuxhN8RZq6ZVADbxYLh3/heCdKtegAnEy3sV5zAvFN+eKzD9Nrs4KU6R/xNN84yU67xTCaJIEVmzcCHPtXRgDe3kbEJAFEJEIBvdlyMY0hJ9g1ASou7V20MuyH32cxTVERGr3Q0hFFKTVfgPZ3y6A7Dv/EMcFCxragJzRcA29goZ0YdOuPK5QkYAMS+/VfOaMRUoCMfub+H55JDPIRLENIeBiqDi3fyGIaDLG1E+u+QLZRRHyf38Pzn8o+opuRSOyOa2d7pt9gre6fvNHE78RNmWqr5+qYLfzdlGhUdwZo7KCmwRTdDdUjnrRKXrqQuWvY6FLghPfIFMa1Wnbydj9gVM3KpdReeLXCpz0hm1tdI9GT/7A/mtVxG3j9W/0B5kb3VDhkyBJ97x352frIHFrvdS3KDU8/O1HRV7FMeJSuSsTSwp2ObHKhTnJZcZAk+UkpuQ3+UJ89SzUecdxIvcJ/NL7oKUxxyAYteh2nl3nEnEHhvcAXbELGIi0e2M2GMCuE1XW4oDC0chTm2zc1SodOaXPRF2rkhFl3G9zAC+jBFABUQsXq4cEn0n6zUf4gJzMCLFsYvLLacQEZwUwNxnDNqZi+6nFGPKvQDMc5QAyp85RZRr6aNN0K2sd7xaO4SZmFWFFwndeTt75fMvszSofWB8kROzVfeB7Eu+b/21OVpHJOuj8inkeNwLsDWIYRlZq7g0RxtT61755A4N90HBmWpRbRRRFUAAIOQkJYES3alJaBaYyesTkeeDYDlEmwRRdXsic/OxULTJx0vlh6NIXZsr81YBkN4T4M17g/Tp+cHno/vt2+xH0rnalHENe+QdjArhwREhwEv1bw9RMTaxaK3cF5wvRCVytnsSzZq9C1IyZNAhIA2xbplRAygqDqME0lKZhG3pw5naykTmJxJmz4SiKNK9V8V2YjkFOsgecU1lnEtlszorSNucnxk4RI0rgnWSaN75TpKoPsyWFMbTQOqTCGKRHCccP66lvLM9KeIA8yQKksU6oHGy3mgeE+BHOYhf+T6hA7z3uTcRwR3IhlI39yDShKJrzTWm1YMpNZltxK0WD1iteJNR9xYXsnmiCAK8mXuAPN8xV3peawbAYn5dBif3qx87qgJ+vksxs4yRd3RbCMiXdwQZW0xBESOaCCYMMid3I++Ns6wLebenv/0JCOFRkdlbZRwiLpyvuBHOIgcdMcpa+WfcA5Fb9AxR8BN3sva2Ch5Vr6prZDGIqNAuynyvXvp8P2rwBhFH1ftqI8wfQxCF2RwUUag9mx2KvlSBtdSPymQAxphikDgYukJ72AFUEEQK6T77hOTZvBe1zQG/m59sABs5rtAIhn2HorKT5ycLy6jGKyJEW+nv2KRbFXW7zeQnbD9/h8JDsnez8vo+PbxMta3D8QlwDHZPdd7fEKZ1Btbx8+zVr57JmyghPMOlET5qG2dmh/1LQgOEzPjNycKRAg9K4xBrmhi12IaTEJNZxt6qSJyKJkQ8AaD2gpUt7wtSK8uKSOGIbYgJkVC8UKhNi7vyQOIDEkK1VyoBwxBHuD29nKLaH/MKoN6rhpWguFDz11ksWursvx7/+olEUTqDCL85P8SbFDFoxRGG0wu6mNhlJlyxNAThoqPILc+9oQKfn59EHtMpztxsOZWTCZulEHsfo8E5Vixz5yUn57ZSCdlxyO7MyjpyrQ6rEpL0xMhe7jNshI+HjyJA2YF1wqxFOr9U1fOlktbyCSBnjF+fn342c0T4WjwiatFrstfZ2yBpTKIC+jLP/GxdE6GCtOLDzhfOAoGuVUrIz/sMdQ93V4I0Y6mN9lYduTInheK4Hhh27FNgx3zySYaqvWvDU+ChxeEx4/hyNp8qq7p1SIVJZ3N+bPzYk+KSzTlTKEj5O1gLWNTofQ5eCSgUKdUn8t5wDFUWWSqCsGRRYcgvs8S++CIxSBEJ76dyp9mcAFyax0hGus3WzZTVS+VGoJz5GeTWBIfVjeEClUzxO5yHXMuMvFV1ezn7uJ1icg4q84zFKJyjr3V2RHpfrddwc/NGFfN39DbmVsi+VxsGPQPt/8usIZUx+UZ4j4XasPqcc0ZyFtn3GGCUMs39GhXhtpdKn0V429GM26L2YtroGc4Gx1krRfiY6d/mYj+67yTOiuMqPUX89v/WBT/FPQYzL39By4uZLKyio9yqwECoS7A9LBzAZHNi4eGJXyr5iIjR1hF27/enrkMB2Ix/mW3eLMJm8yCL3WnHJOdPgMbBEikaoC/VdFKR5xw0IrDOzEjcK98F6VofQxE1ZMHZNJgBnKx4uAyWH+KiMrmAwrV6ECrwHaudQMml4r8+zBbW7ZTD9TXlRMGXaseA+kJi+k32s6OmiZ+4nYJ0ISBM1ZAAt6ckO2cE4nIqkieHR9UaXHuvGlr0FflFns+e4cRv1ZUAQWrDwqVaq2VN4ZTZzzYWcMRKFPwMggQwwo5i++5m6y2fsyYAxNeqnHiv5v/ErZcqZcpEqwTPvdp8wWghFZRISEkxv85Sp0ScLDJ6Un6mXtZSxQ/yPs35KcNk73ultgJClpQ2KpC/cZ0cSDgH0ap9LsQ8opXmMtZ9r0JzLkDJh9KlgYTGizFy0PweAID1JnOCCDngBJ8mbs2zLJN5Fy9x5hfrIA+6+eS71hdYhZzndsr0Q3BwEUhr33GmS33ocq+zk1jWmZ8sjzorkzSIi0slnonnY0DKz4Sut7k5iB591HhtDSPes/JlHSH2WnR8BkEiu2HN8shp/eTIPjiiE+V8VEjEWkF5bP1s23vlFGv0iLPgPjm8TDLAxR/B8oND5L2ZswLWbZKmfBNlIEA721q5DwJE7m4TH6Uy1JS4ZQNbOVagYK8kqrD8OJ2yDs37cw/KO6aZlzWP8iybksjRNZDbWtV6zVolauhWKphAOPcDStyDiExJH6cSq86TjJ/9CfLh5l04g7IvJ/2sv3nXKH+JCGshRx9mP8esS3HxbWb1EZ1wwo4a6OZJrWTb2xgqcr9uABlX5ReET8gMgwBR/4kgfqGkogrXajgCcMTkS2lsJQnAYp9tynytjq23amjJKIAFRywKIIpoJePule+dBBdhHpKfUMv2rhOrLLzNm/1sU3ZXV9Bon4hnbCp7vHXzxuf+UGOHkb3IXGKlGXP8NAIyL1zXO9bq6U5/I3rZF0omq1fGD/cKkcv4+iC+VtuK7Ft0qm7fDEEorlvVXxaHByABHwLU/VxQeaE0xlLULWu9VCVLoe/ZE4X3ggzaYLTYRa/t54i/iEFHVSyVrdlRBFKCRxUQ7+zTD7MnyKgU6C2yPguCUGr1pM4VPxoAULnck3vXGTzHyuVwEzFK/5AfsVZ81TaLjOWK/vIyq55cqyfGqMJqYZ2h6qH8WaDkq3b8tFwJmBr4RvXtDkLeqqRQABtSdHAkKtYiQFvDULE462QZ4mocgBK0iJr+T3mFsEcV5N6r8kgICGV1rTq/OAOkpFe2DyOcKyLHmMGFDBhLpdSGe2c/GSLsUVvRcMzXWSg747AMCXptK1bGwyU5kyFJzieSxKgUgcw788v97Rxsb3mej7UzkkSid6UtNIyZXwe5trPyXpHW5h9xXddiPpRN03ZsBhtVF4i8hzKgBFt1XgoLE07cVgTKGw6EOjFf4lB7BemJ+OyAsr3yu2PNuszSMN6FQtiMd1WM2vNd1OGYId0oWp6PDkaZI0r5HwqrjYDYJJQSoGW9UShRu/aBdFNUzra9mg85/M6CRN0RHUB0VIVEZxeACgJ1tLFwkKw9lr2Ym3WBauuSWLHXqpTZ5575EYf2qlqvEy6fkZJLkEhHMUYNkckcx7fZw+VapYfCEeSMQLR3s6X322yRMCrZaa3Go6IkOA6XWaL1MssMiUKQK2JtHZlhLpnHAxlNhM/ipXoDLhUVezkVZWu52HWr8vrtcBunJH7PORy1seRJHJXAc1Szz2ajUnyFYO+VOHWvkHCfc0g7UWXMMkVi0CAJsfBSTW/aqrZXNKp7Hay5MM8GKHMo2HlbyQRncsChrnuFz6N41tLZefSDEDTzgiw82hTtKLIhMLdqubbMzrUAjjGG2IuTcqo1BQZcTXjsNWRbKi3a2QRRg7Bv1T+Q7tW10dqj34aOFtUVPkRYx3QII3SRbkQIR0fjdARPMfSIhes0bjrPRjzaZwnHvChsj2UjD4SVZZIRbZh783C/vCnaVu2HhY6oQAJQVaTIAiPm2YCw5PfVihfwCYRk8+a89L4+qLOYQk95Vw1Y9sqHxp3equGKjSZvQw6e/Q6haTGpnWGsVGNaZ+hGKsOHnedQRRNTjlHhDuVgScqe32Y4NyvTvYIRc+D5PuIWxTviSMTXt2ohTQSSC2Ft5H4GEPtBciC7Oy/WoAAZCp15RAln8MEV5elIzKNr7BXzxZAj/4QulfFVYN9mnlHE7DaAiOJuiyUOhvtFT9MFN+v73vG9D2MK8S86kbN+hNgnSLCvDBL2IqF9m/WDMmAOHOshIn3X+K4v6WTJWHE4ZqOYTE04B81ioH1x/k8ncFFwUa8cSqhANhnVyULlYDTnEBDXlDHAqT0XIoCtLlUcm59GmSNmUmHRgM+hoqBHlTZtLowABXC+e3z3ZwpihPCoBSV4FODfKg9/q9KvrHXZBxRVFHQO/FKFKz6e2nhnv1QNkfuNg76bVfLJ/ETHNq4Q9fiH+GfsI6UcgHbhPRESt9kbcK8MTt9fqlMAis6a5T2ZU6xUITJEXdaxPKsEKeMBqUJFxyas2SONQ/P/6GLvnt2eT5d85K0S5BWXDrCwGmBpkd0jv7pYv9pEieJyVO0zx0CyP69tJ+CPiRw6BOEIeVZoNKuSkOcOZ0e125EISZpVO0T3Z42A9Zg59aHGgCv3qKZBzBCgF6AXweu9/DryE1ifGkFC9XOgvzU/uCCOxAG2zUIJsfq0uRowRWwRqt8BiQwe2csAdbzg9oMyus9UXQCI+76v/u/7KY0YnIhw9j19r3WYd9UTXQV6YjiR91aJdQgY7gTYO3xEVyocXFJafooPFFxKVJYchZAt9WGh6+uTCMJEalCF27BZQ2bymWBEsm8f3/6Qb4OBKBC781EBhfQSij4RRIBas0vOJzZyyiXHoX6AR+V9E+Hkw0dpbjPxXuU4z5aZtWrnAi5dtxwcq5lQ+WbjxIdWVMdMCLMX+T5z0htjTCsK3ws9gvd6mwUQeOdjVOnyRor5RdzIunJ+uC3dI9/HLxNRORYq85WY1gGQ7bClVOeMM45gxNspKvityjGh/h0WA+mEx9jz5rCsZhBH8ZB8H9ji3X+rTsyjonnbg358IrHNXjMKmFvW1DpcYEydsoeVNRwA283msghl0++VaKQWUnuSbX6eEZre1Rltwlu1MF4qbfdjdZftCiPb7FwVUYRdOt/FhJowAVaezHcrHPdO40ijvVSINdZP0WQY8DzrFkea0BHxTAFuAY32rUM24uHPHMJ1Iyfbi+hcAFcof+TdrEce/v1UApWIISlKICnzOCNHnJPvZsMa1rIxI6tldwY5iFMQIUCU7wMgAQxcXTT0vdp1v1U3qqXqAa/VMetS2ZR5J3H8qfBOpONo7FAYHDgIy5hBlCcCEpF58umqOAQxXslaFlMclF64VKp2vs87wboSpTmvWMA2KY5jWnP2qsMEmJqVAWoAxX/C691hI5cqwNxOHGOiyN0Mfp+BbAE0EwYMqFZXd29RsMWSY4ZdSwDT0utWzXZGdTzaqwZtI3P7Tq6zIJv9IoPzZgcgI4oCrgDJ0hR8AAAgAElEQVSdPhQB4mx6xLU8o7gCverRi2KKK+2Yo1fk/91li98pOmTWFcRV0t9zGSehRGpFZQxUVQ6G+KOvm58gbhcBzBpyPu24s/579Sm3TyxbxOa16n2xOOWda3X4BdSaE7WFLPcGRin7TLlgbVQVToRvmzW8QkCZdY8qyjDKSsZXIuLA7xBlMxGONg4XFy5wrcodvkNVKYw2RGHiUX082jrEpIbFEZuWU1EINnEimEkvVTO3xZk2R9+rERDHXluvyOA5lAB1AIyvxpgUywBZkFUxNiEW+UgDhuTXWW6HbA+wIn4mISqERHJTnhF31r4AXm0+AJ52DsZt1tUK9Q9AZW1BOFEPqGnishCQGAICKNbY8rgrCBYEZkkCLB+q0SdkIMLlrLVTC4dX8O6lavvSdUIkshaiZOah85b027yL6R+R/Th74gvxyX16v8ti7KINozI3+e5EBIg/c1HMEcBRtQge8CyalU4hNyAv8POck9C+hbZ2EJsE6uEe7cxph14rsy4i161q4XJKtXNoVOHl1kEAPiBj7sN5ACyuEur6vhqI3ioXHSsPFW35dpkFkhP2ncJ25sDhhwh0jbAAd4C4K3aMaVURDTyq5JD1CJBsh+qooL5cEa38nxk6yLjN4gcJibcG+5t5dPRqOEf8JIhDiz6toy1VOBzljigSgA2CAXgfnDvIjPK7GDpw39T34tPKFYTi2R7TOdh6Wusy5ir0X+S4fbxVSVxGDDAYgsVknp9BwqdYqMPnUk1H8jOAo4ZtwkUshlc6iBSq4aWhDDmIUY6cUN4G3vaHyMJTRe9SvT6kRgpdiJ7UjiMISzlsR95yKjyN6t2qFwgqnTWqWCKPGbfZqmAcLofS5RP9QS40mVkBZzqaBKMxIwkChEeFphBX/M1P0L6ZW+Wkd8Ao8TEUX39xxhWAn/PI/zrDz9pl9EEOjkV76ZwulXvObM7YQqfIO1N4GzLhckzfkFHeB9EcgK4zMpmvZkzL3lfNjxwlSBJEJsqfC5F7PyMRNWFU2P5eIfVi19QyEAv2NPPyUsNGZVTI2sQlgHmbtWAvVRR5zIJf+X+UeezZC0c5yrA6LdoAEMAiWyd5KWNl0yiLeae4phz8espX2Kv8/1pBiPfqpdiczdijCmijImu1WiD7MxhcZmCl/7PBv1ZZGWU3814Ixs6fw+e3IT55/1b58ZAaMqwzhq1rjqlE0pT5WlXWzZHJNucg1Dx7kDOQDEeSAFjiqyAwc3MbLTK/+F06Nk1eyLm2GUW7KXrui4iWZwL4gFtA6pjiUpuJO3gUbDFeMBLJ85cUlu9EYLdvikHimJ1tzZH+dvmBf/oD/3Svsv4v1QIa5RNpeVTIuQNrNi032CQ+zlqzNgI7fZ2l9LMoIsRRhekyfv6fw6MwLjPgDqJ1mUsybsQd+tDZqXWt3og2yP+vVX1RzBVK2slI5kd2zr7kZ8SXto5JJCM62fTW48QHdXgGH4uIYWunA5CfmZaD4NoI9L0iaEkDHJR0i7w74ky4j7rJWXMQl67ThTjoQkzv7WBl8KD8BwbkqTBARLxi0durTsE6q00mQjvEkHNV12OX5LnX6lGCyAnn6TGVjKK3IkZZW3J/mHTPLgupFgjTQ0yF+ZlUHs4mxPTYTjtyaesLWVi3MHDFX5IXRymUry3Gv02tPLZY8KWaw4tabQcfpZKoc5xaAVgwpVWuBquZMIjWl9qezjRI3teTcVQoeIeWHNUk/6iypqqu3Gb5fPfcq0oHc2/rZw5rVB4FBO0IBPuynFpRtFkUMGcvghhK79hvoSjEHDpJACscCTdqIsLLLsQl3ytPZByEE9G7z0QqBbWdh/3L+I9m/ZO7I3jhKC6IJ5ym92hMpyO/Wkf8jmllBKMZXzgMHdr+Z97hHqLRId9DimJWfVd9BOMZl8nF+tETa2rFNv0180N+zMZEBhY6QexR2t4GsmsD5M57hzDSXiVhsZm3XD2m0kcP4L/oFgL7qeXYpVo0KAxgo89BiUFwyU4oM+6V/ePsy/v5dK7VIKhFvrOTzFjnCoJ537MM/wSiWxXCWD5RbjVjRGnOgXcgKYL1MssvNVFxfvSQNnG3yZvBJmOHu1tL1htHJB2GKJ5ngqAhuICcAYeIntgoDuB11m/udtIIj4JynInEWVmt4rcA/yhTtzCcW2VLOuuca94ZpDyq8LZks423NBP9vfkZ0y4eypMH5DeoUEdxY4rNM1lkECzIIX4qv6uMwbatf4ZmJp3D3DFR15k9lkMJldF7417tkQEEz7NC2UcVpmZBckDHKVIYZ9IH/m1WfBxVTXBUaM1R7ZhRa0iNwjuIo1qZsfp0+STf53D83ZYy5Xdct1NVeghuv60j/pZGDj1eADuilOcjZ+ec5Znzawk6vFXGYb4LIgQ5Ohsx7+3sTn3m+XWcLyubXjQxdOQdyvVQ1ol9nJOKGgovEYIkSqMjsBH2USnhfF3Orosc5p0QMvdIPyc+bhkkN2C7+UdergKi0jIsH8fMh2izmZwAYd25X4WT7xvfN35o/NBzsymjrBAo71I5x/mZjTL5cJ2ESLDLu08D+bfZkhhnEscTKxs5/Ti1qiYu5cBbbGlzasdtHVXgDjIQPfeKUeoKKJ7LvnEqisViSs78ZbK1P4dIpRK7QEmRuKxfITSR4el0nHtdLSXijWDL16qcGZE636UFgHTlNul2qAbZnnHCPovMhXD8EfZLKBA9QT2yrCW+ofhO+Kyy1nw3yjKZ5wH6mCFEn5JmEEBKetak8LgQGUaJUf0kM//2+23Vku6R8RkgCwCi4G+zuneo0JixK1I7Q2myQVivwDCHzTFGDrcRqAkfxL16+x1VnIH/AsYHeKIoSd5aKr/dFWUuVhS+jqOiVrPZKo4vFXOlbExEScryffZBXKo34nZqv8ZJRmRsj/dStaOIk5ymDpeSzBbPCYgLjuq7yCgCMdYqBcukm3X8k/FPHvc0Z2qLVs4r+0PMwG3kYyRwkQOyfR4CKpugIABin6J8d9gOa1uHwjNXc/oeFf2AY7UOMaYVrkNX7lXrGDzRKZf6tANbhyxwEdgNsRT4iFi0MWDMyA5c7nHG2bB8GRbbTjC5EOTKvEx5/BwepSoUPpSarTqUTKLOazV+NPZeZT9H9QR3eCw9uYSboAAOHkUKEsdJpuYU5Nsr/gvQrjOoTlRskAMR0KKNydV7mD0p8BGFsjfisfaZ8itocpTJeUzzpLV2beC16gOPykkR8Kjwcodjk8Fx285zGLOmgKw5BpYQCGKpPRV6Evs/kXSvPP5bJc61AeFlNt5EFMOhtOU+KhKA+DkqSY4V76hoX6L7qCIgTM/2fZv5+mPqOtlPxBxhep3V+e9VsYZ43k1xWFbNgf6xfqImwVYV9rfIXOoM2SQ5BuQ+1FMQoW5N+8wdif7CW5pPFs6+TiRq6tnWJ4es0xL5V7gBebDbYrF83Wd5HJG9HWNFkTe2Chi3KrPpyjOceJyE5NyMoZLI185P/hfAgHxjyvm5P0CT/+cg877c1w63ZcYkKT/KUBG/ED+SQDzmWkC/VOQrYG/Kh0pnPcmvJrO7cnbZyx8eP/z8HnXOnCI5tEWtk9K6oEGocdbX1rtbVbgfFU4uesH6M0YI0ks1hRWaE13mmMGH+Tv/o+Dn+ex9JArGkNxP5FPogy6CyOGs+6nrMSMJfVFKBslFfYQtBx9KY+Bt1s0dVRWCCY/M1kUBgpkZLBRFSzbU/HPVUbRDA9Yqfm2TIRAkCFBHJ1LHaFRQGuVY+EmHqNMnsG2yfSvcRALvl4bKlyHjL8RDBGwQQCi0ah95dw4o71GtEHVdZzMbrBpyhGup2Jj18RdkHzW8BzQBlAABh6ZIhA71sJ+MEqJy+XKItZAR4eqIA01Uef8ZDyCo+C1m3sCAthRC/wHkx2rbB7HAStaUPQ0RRfURu3z08rjMTsj5HdHjG4suKu7PuAlx2WdZqTwr+7RzVEYVMGwOl1rArSYY51kD7SyzathvsWoejYqBCscQFgABIqIJ+OswD5tFtCDbvzv1FCcW8bJm0TaOgik7bKuCChRy8iq/Q28KsepSnwB2ADnraIel/PCIIQHmLuuJSvFkK4UqBETgY64Af9bQjT1ZmXIPA4S918XpVk1QM7+8Jx7mdqZStOkDPNtdMrTjkXDqzKfDSaQjK825VBxYy//2FwzodcIyieC0T0aQ4b26BrPMdfgHDhlOwbGqr0sXWmgih2ghwEz/zRHfqlGoqAg6lU9bJumBXW3nAV9JdqLty6hzvZ+N7Ed1+RnTrIdlZiLpm+GQvFzMkr8VZuhJ0Q0odT48oLLrpHS2ov6+uuYC6reqiG5c4dOcoWM6/lQkzIHRqShuoZAcnuEYcub3GTuW+QBE/o6YooWVf3F88Um5iRF5hvMu/9MYn1gnmBB3jPgkEoHZk5KOmCjyLSTHvtgD1h9m872qxXMMEkH5Wxo5eNTPgLdXCdfl1Fhzq2zIc66+uTcQLlUVk27ZaQeXqqVFLFPwvL3rXd/qVmWRRpnz11N/doams0GBuf+BIBKQ8onimoPv3h3CHFiDJLNrx3VURRQijQMAPAE4lcwjk5uMQgEoGSWxc6h5xY9TB6Pr7LMhFyPUVh5ym2S9n6NrnVmDmuDoxccqlHknDoxu0SVnOKyir1wqrN49eW+C9iAAArLN4t8xXQfZUGDhN4IlyegchHkmXIEi3QAEOSMi4PT25ahEJp/bLDd0NvWKZm2PNbH6dqpEgxOspx4ot1P1GgB2RgLIyEIm16VhZplFJnKWQmuYmCOWEvURguhdktxwGhIK4wZfl7g4puaMmXoLnNJLxdVlHdF/N0A3pic6lCzigdIp2GyolILQAu+O6lOen0EAPpMAQzzpsF1zFezwqPBxFDPJPxHTwtX4R1D9zuVgYcs7smEx1XF03as8jnkF+PhVKKNjJhCxNLEWxTfgndhz5GEVNSLuMGJQuOlxWVdMxahuh5IwYUsWoxTKt9irHRqul7NAvK7V9s6+db59X0uF17yrvvTWmb0A7AqAEyOJp7dqwNn6KSLDOYhTOJ91BiaizlK3hb0T3cc0GgTocb5LFf+ASCKBcT4WwxAPraXpNx3Ny8DgGcGVZ2VdsGxf9LUHYrNGMclyxaPm9/p0lGlvpsSjvCyAnp8sGgLhIqpkfMCtqgYLj0BHyHRUIxbUclTrMEp6/o7FJoDZoR3n0jwoXOYZZOc8pGPhPEG0VgD5hroKuXnlOY3rybitpKLQDuKlirqNKkjdVe9ReTL126kU0ahgS59Lhfkzae5VWNozn5s9GIk5RLDmEFu1cGj9JecHoHHXPBvxWp9zc7Cn2p3lPJm/cUCEbcwwGFzuWnXVwMFRSXd5n+INCO6YdQvCCdtHFl1PgcGlykLRXT9X/dzPF8PLZrHECJsPCZqLdE76ZUbdUvpCvb3wMsO4u76TDkhd4f1ehdn04gb0zL1v1UhlVLYcNsghxO/CI8sAAL1l77EYXatEDU7AC03ebbNxR4teZti9mK2O+OXoJOax3euetVf5yxCJHKD33arkzVGRxZfZR888WKzEh4lcyDti5eFtt4ctziAEkGSvFOsAmUjprhIjqsCaXfm+c+CFlhiLv6fFQ2kAuBjLUqf0OnOWyOxx3hGfVxNNAbApWJFnmfwRFs2BmPhZI/sdZ+7b10P048GUIvpW1QVFszIjrqfOo2u1BNtPKbjYrgPp71C4plYR3xSGaJHAO4XiBxCM171DUFgUDLKP6ZnFviMK7aco2s49AMTLDNHPO1BaBypfoSNMORSjqHcwXADFIUEmFhb7cJs5NpRVhAhw0+fk4o9qlZD9SHELrSf2Cshs4MfNXmbfkT4DYmQMDTEDi5WCrM73Vvk0kLWJCCKxnD7Sq9+qtwonLU62V8QwfTT3REduHYPImP0K4emuUMy19E+c6tynBVzpwnVOPXY9cCKT0HrL4pjhsuGw9z47D9koVq0OzMtCtpmR1x5xJj42agBNdvRO7wEcrFsUuDEdcrhHy8cdatDOro9VCPtDdbTlOyEbo8pjyshhr+z/onjzN0dggCkhHMLrUfvMPxalUTnyxKW2/HRuRlv5sudH9XGPXpYz+sL4wpNw9NjRmfKM3uZvVY8KBRdHRzpAWBAN9aSus7yoPST6ddxdX2qoXapEKeSUmUe8Eli4zvwQ79ZbH1VXrucySy5J4UW0giAxyHRIvCswrPAgDpnxskfhPlsV9D6H1jTS5/xUxdyCgZEt+2IXd7D5O4cU643QEZPwGVMmFRrPqiJsRSjApULM22JAzziqKJlDOSr5CRKNU+PNZpf3yiA0N0hCQVsqnFtA3VEhMKg9uVzBAGJirEejlFjBbdg5KrdWI0+WE7FfTIyhhJHts7dKAPHfcPjl3eRovqSMEf2LX6CrfYi9yvPRC4mRcjhYiBCAcD564aho6b3y/FtWZ4of5cC115KuWqR0liyPLnqimDRWUjoGUTnPxf+WebbB5l7F0hXQIIbdZvkqBfMun6gAqpq/cCa66bNK/qceGpP1cR4FiSTd4BAASgNEgHWvUi6XqnHKA0xU6tpZrfvgHkvFVbUC2r4AnOhSnVZtGCRsBGlrkHXgas1BfJf/s7xIvunI4DZjtjOMUo47EV/5PTpsI5wqHHzMqFuARPSJyJNoXQXrrG2v1m/NMRAgyJXckIyf72MdJK4gLBlXBl6AZZTfAOAxprxWNcjoft2Mps2kEpMCdF3VUEGQvrKGIMdbleyhzHcmJR0kltG+l8h2VMSw3/mPQtjpuO2byZj5XpMjuh6i/VDgxe60lYSyeqkc7VxhVRxXo0I2cogAB5BtVUiYfboPH4fZqroiZVUIOJnawehNiOJ/qBL+OBmKiGPxNbRRoP0pLbOzanmmHWu+62uduRg8yihv1p3YKqEnruhYMRNzYIZz6NmRPeSwVG2cLB3EYersALzmnvwa4opUCknskvDvcA/nJt4ta1QY2hkpwdN5HOfqM8I5Wg8DL+08HFVvIO9pfS+ENZYn4TaISNaoKSskpUcKRTlb9lr3OSogUa4JnQQhP6p2wMdqc86nI4lwU9dW3jKWhjpRPl2CCHtiInjZ83lpAwCicdsRZTOWShs1ltBulpkOgfj+8f3PJjcQTPN8udgCAek6HQvUFBaAdegF65LwDRxSaApO5zAiS8epmDnEeoSKx3zZgYRjpoaGkrGg5V3hDOuMGVIPeJv1d7fZSGafNXMDSO1jQeGFbGe/g2TM29rZrbNaZD64zeusd7tXcxrdip0HJF4qPflSNcuExXSY0jZ7lpMORALkHLdZACTfMSgEYWVf4loQgZGgQ5G2SpeGkO09X6r2wSi9BnLsp1bUY4qKnmlv/+us8rgF4IRXi+Zs55Ubv9RFrszG5CBhe9h65MVsSOR1cuUoGztsbX+BsAuFwxwqKi33ozPT7rMPhIIRYreuVYyBJWWtvuqtpyxVAfxSZXnynBgwhGKpiuMchK1X2fit8kUo3+TnIHIQJtELIpazFpwlBCv7oKJl+4JG9RT8x+MfP/Y/iUdr1bjFyUJMonTSjfK9tFXiCT8QK1E+QThV63FG55cz4JVuyxbRivmbzqe0Ex2NzsTAgxu8VssNyED3yXysK/sXzqtAtZKsuCdk7loC5/CTpfKD6Cw8+XxRjz0Sg0/ubu/uOlMgOyjwU5e8Y57idSb8BEF0bgJUXSfqqHBsnlpsDyBxpsl4hEiidnEKJUo7oeqoXPD7DCYEuJeq8eRdvPxCH1DLNjeTY3dJ/dWOjXEie8ELrjFlqL8SN2PqRhnnx8ePPy15ktfye/QF2XRn0ynkYJniDXcBigDyPsMxMr/sfUSc11lvLP8L9+FLkuLM4anq/K3Si4lDjAVLVU7R2JVfbK+4KwGIclpw6nY2Z+30lBBcIhgjQYpY95XvopNkbyVejUpB8F7WtPyfvoxrtf8qRgD3CGfZ2lymww8go6hEfrV5wt2FD4ypwFKsRzmQfmT8yGfScy0+Y4Ty4lzrLIomxbd9FCxmATJ9L3Ca/9vXvew40i1VAN6ZdtXfEmKEBBJPATogxIDH5Q2YwYgRSIBA5zGYcRHdVXYmWv7jK62TanANutplZ+7cl7iuWHFW9eBe0G7aQCZXhppUFQrFZpHsLGkltp6oXQ53mz7Mz37ObudlzFhNjmnVAML+Xo1mmthBewSQ75hrtCBNuCYkzYYWhaMltgtbCA2R8X+fPomccdIWcFJ+QAJP6DWCT3LV/LkeJHHvk2exWLbTzrc7irP5nNIJWjE0qQnfdij5R7XiExHLPohGxNKe3z+LrV/7ilUEhgQjFIHeN/aS/ZB1C1tm/p79+dJesa3DJ5XBaiTvoECgHgMaVP9AVWcw36rV817UlM1je5/a5TiMsc0zwbGX2ymMLS/85+EbetCRs3bCOnnZcf3cJ+OLNPedbPoIhBx4fpbM7qrKtkjVSEJaJRvlfXp/ZPK1RGCG7dVyrvNAIDe9UeQl2gEWdIgf0BLuXlxZcjHNpZXDDeJu4xEAfEioYSFfLZHXFFwhtFZ+oFiLL5h1Y0LmXvEb8i9NsiqRbI1W1ZR3Fj3rgS7qVl29siad2OVTMP0wyaQz8Fl1/e0/EsC5Fgtkv1D7iFD5Tual8yByNQqmXsGFfCASKA5jLo5lPJOX/79Nk0yZYSZKbpZN5MYkmMPE/hbNikPLTELwwPHCZNGSzMneqonnNer0KI4jWigJPO2Ws5hvxQaZXIPMeVT3ZzWKgaXKPfO9CAIO/h/OTzawMk0HW/iT2WIsAgzMRBqArc+cI1BkuNtRdp8ry4e5SERMZIow+TF9SzJOqFU+1X/NzzF1L4mOZSM4wNnA2P5FJzGd5xlw/Iq2tcnXDjDbv6NK7k+Lt0PeQEbCOYcQ2pqvKCjhgJi3HOIkVAVGFJgRQITFvfqg7EX3pAVe5jd+Yfyb7JdX+ww2fjZnNo6LZqLzf9ShVDF7lqqHmyc99kuTT9I/C/ltms53FnyrtmfUNJ+kT/utfjrUuRWUWutgDmtDZdiiqzogHYXsRAYAXs7hy/NHo2AAPwoASfUnIJFxI0d7FJuHMToUDfZsKEfm9b14nbaiqel52YsLLO/JipOItI+wJZTA+9A29RopszYn2ZD69+V9oEDlDZ2s3aq686ohYcSY3YQh3rVnteRGQQShm78zPznyAjH57FbwelWPfzQ/Xp0nQ1JIW8jB2Te5JpMSv1kOhvvc1V7D+tj4t+rvx/yISo+5kYnV+0Lixs2p044+UXN8BJKSHS2Ua+ObWCee5JWTEF1SoyH6Qyqw+WXdObQOcv7O/GEWkSTqz0mr5DNy37Z7HTQHBVjuc/qkZKF9f/2kB4naD1WBhJJICriFOVG12HkIh+cs3JoD7JmNIZuHr2SzqYk5CozZ8HUWgQPssAvrSug1LZFIJYEV4RLNmz2j+IqwiL8RQSYY1L5JRxCZUXn+OOkRtHIwmauYzQrVvG7Vrto+jLBnnm6Fhvb8BJmIGD7gey7+OR1rG0ZyTpMXjt6P6q/hFLJl79XExsnr5JtoRi/krRriiLkf1S99L8izaJMDzGEGaOvDLJrVEo9tjcjgUXUmJB5WQQ5lFjZq2+EA4TBWPpcNghEQCwdVHpMvf/s+vRhjtjhgH9WKmcZ9r2b8cjyQsd3p1QKvSpLZGOY29/2T9SevhY4vRiuvafvWFaAd7XOYu+jJQelDKdrZUtnnI3ASFcoYojnyTF2CHG31WRzLqKWYZwSCTZy/KY4SdMl8Oxwia/85P/axa4EJtXm4Tw9D0UnQH2N8+c/KVWU0r3BzhSxNCdpNa0zsL9MT8Dn0kmzre/XLaJwMu3Kv8sxV8WkmBUnQuYZMeJJgHjj/ZkObrPgKiUI07Wj3MtwKxpK/abhvgXMoI61sOGwhAg+qB22i3CcLKCPL54hplgMCjpODxr9iaphPEjibCCTF4eW/aB66FTCz8xiPYl4UVMhmiekXAeBQyQkRFqAaMvJdR0/72ThyDC3ImHOr8mIIq7XEYFZ2MrlpjDKP2l5A1+Z+CXc/p1OAQ50xZr2zB/KZ3CPvdwBjFR/BuvQIsXcVrhHsURIiXPbVHanYKqSsSaT+zkGbss8brgGEF8cmkagQkWWCIFpJh5ZIVw2isKelYku3ZxX9ZNFzr0xODoGD9b0azdu8+SzT7rOaSJowcf0G/8kLZTEwhGsFl+uoY8i/Eni5brSDsLUIYK6XxUP9+aMoMrPRzbGwubnJ5/DlquOwcZQKM5M0yM8Y5QLY5llXUadV+QFa6KgyafAWmlzehlOPjIPp1hCfVYDFzF/GkoiTw2c/PYqQYg3iN/Oaz2RzvnoCFiCy4Swd3n4OyR/Bpa8igd376RyGnLM6LnfuhV9ob31OtzAWz73LPzvef6/yyixQNAwzxibLxXDsJoQrMpRrXs2BVRV0WzFzcCw7SnNUGS8JZqMk2iajnQ2TicpnQTgkzlSj7QNbEeN3oG3oNudEjPLs4Y7SbxBw0SbOvMSGDnjuNrBsCbWzGNwjfIy1+1AILTuYbHn4I2ZKsuySgfmMQ9rZ63PQyEoR+D0Sc/wI69uS3wGL5kVX1HXd3VqhoRiR9PepHRKZ8uzGJu9Bw6ldcdihgTu024eDOa1eX2ROOJfJK/3AIpEFF+4WvNBIqJO+ZxUDCmRIjAs+3W0kMXfsFpm0LFAWHvVnBgPEJbxpQqLCMQ62NEan43M5ONnYufY5lYYJ/ebewqKrsuAc7Xw/18s98tksksSlcGbb1d6zAMi09YDIfUXVblXP0IA2YdFsPk5h7h3HXZw+z9esiQ2rF2CgJWg5+Qhzn/nQgizz6LBmjDi61qVXed9PdyzzphZDVtihgioG0cnhi4+SjduvfSD4BEk75vlODlK0dyMIaK7cg1QHVj2nTVsjeSOcOo+V+YjVoU0DlIT6DmH/jFUeqfNNwr18DcLLnLR2Ne57Ffvx9WgRydR7zEINyZcAACAASURBVCIhuQbSPaZBizrfZzWPzOHJps5nwKc1jDEgg9ZZyKZ7G/p8ScE8VOzVONAkCsnTSUGTnYV5n37hWSzUQLmfnIDst8xzvhsNh+IfkwvUZlDKYA3C2Ksg/8bBEU7mXV2C5JJAAZu3o1Sr8hR5L/fiX+Q6cWYbAJox3Ke/YDRk/p7nRDS3qi69I1MSm5kfScTWFkqk36uF3vVweCm//e367ZdjfxtWEqDJx6Xxf66foAnmke7km98jBAhac8v/yneQbAuhP6uFBPMo15D8JGBWdenNdf5x/ePrvaO6Yn1Od7OOYnVmv4GQ2DNf5R0NRDTBGk42IzgTJVIgG4wdnBtmMj2o/+dzNkM7y8KcJIyXaEhLWVAIhS9CrPwWNqjAAMzWUX3Gc50/W3/2+nwOQBaBAMjfs0k0K5UdfkypZhf807A0RPeUZ1owIURGSFLqX8yfHRyNEW3UZkYc+22alkpcZb5FE89LrQaTT6BAcRCnljl7TgFXmyDX2ow2b7K+3WTHJnqftso2sKRjxhQKnWyutvEjybHSi2LpWPZR/MlMWSFiTjz/JX/PWtGaomb5bN7n2ANJdkg8e5Ap1lqtk67QFKuaKf1qWdUrC5zsrGx6LpoHJpVy6gPTQBYtJ9H+Qg7Hb9ZvXv/P5NiwwnfQlrlPVHVOfSRyx6Rl7DmbUc+4otBd2iTMKfY20F1rHkUzFvaoJvo2CRSt8OBWxVkgF0yjx08qIGXTHSJhWpuFr6YxTp4rWm27lLGKCGUjAf4Jsd6LY8p1+RxZOyYRid4ED/HdmC8/plH+XvUU2bRyPSJzDqQxRkB2oMN4PHsfjrxyj1yDxmGWb5d6EeuU+ec0m0dzKbQulyVKlz3U2lfXgI5W2Zv3aifxeenfIlq4LgQdXwckg0cdKswL789RI706jhwpqCdEbpbNnAnE98vEuV965j2GkUTFoU3bycpzKt4AKv94fkjnHJZs2DjDDW0XahSeDmKWdEJRFEndGiyvPIsoRtu+yJUtJF6t/UKCDCv1Xs3rLQ5Sb4nJPBOnNO+R1vwth+3aDbbn0QbI2PRLZKsbX8bLrnY4dI/NGPMsWit/VG9H0StCEDH3NjU43Tsyn4sZ2IdjjV+aa3dC1vozv61Vrh2BsSZ6lWjo92LcFHUTfYxgjfa9vjoPRKjkWfN+Dqyc1140qVwHL5Wdv+LT5qV4ZS/8vISbE9qLkwcUypTNVuQUkyDqlHlEi0AEM8X+fX4a6iEG/xhSM33I+yX5k0mKxMu/Gj3yLYRj9TvcC9uVfzNGPkE2qyja/0xbZ1EpJqbvdyN+k0uD8cG6f0ieKyYeiUza5jDCG6FC6nDz780PKSpX1HkUmtlmJdn5JPIaESp53o/q5YFC57Mai26FpXoU0UbmN8ENGgV0Xk7ml2pqw3fND3O1k8aafO5TEmFtOlxvrKwD/kbey57LeuFA7leuJaTdkSoJy8xdF3pZv2/TnYsGcqhfez0bNOaODWJDbFVJBoGaicoXZSOpf9GIDDzvA/pxTPNQpAG135AT6lJ9BY1ymzpqJxxtvshQzCYLSdIBWmZSkoNQmeZ6uqKaqDVZXRsE5Kbj+3IEGZ/8gix629Jn9cnYito/h62LuDLGmJU2a+dC5CQkBSVJz2o1wCxoaM8qJ1p+hY+Q7H3npZi7MF8gKUqEMx+dr4oZk7EwX0FhVpVdZ1y5j8jf1QnOgcoaA5Lmel39iQgw9xZWVwVpo2dd1fh35JC/oOd519LzffkYjVQQ5YRIX2PadiTz/vfr778cLuZHThM8Ux4sG1+WOofJhObCHoIkziTZBNq4PYZA7SyurffqG/cxTN5setEglW8iItESSmH1UmQDk57bMAtmA4q03KasVDSji4skr47qK3IUjN39EFagQcIpvFclnPlaVRCWCc/CESSkYcaInIDJgR0+zwA5+71YzBteTsM34kCewAI7yEy3c0qaaRkOvo3HYuj69HxOMMRGP4bEu7VPhCLNQ6PIfYCrZ2M3QpiVQXv+7frb19zwAYwfFD/zkX9B0b8XBa7EHrPyXl3P+oUX7fo3B1GzU4Lk/ij6HnAHauecDlLtSCoG2qc+wKRo2JnJ6MouGiL2ZXyFt2FWfx8W9fyef9m8TJDYl8K1NjTU8aN4YzuXYcEygSaVZumSVQlPWW3XQ5fKpJGRVXN/FJSfFARqc8D02shm12KM403TiqZkXoW8hVszThxXFt2crILiQKkyrR5FcdTmUYMPBRtyT/kEWWY2fsLnDWKkOWmcjAlLJvPpHLqcVS3oMkfRFkK6SqmhFMDaaUDm72f1GzRmlaqETrfX7lwGlDDqU8KR8DQO37kGPKQuwJp+zRuVavZjQ2awmTB5jNuU5ZqUrofIDXG0ygsYbBYjdmckVTSQxFM2VzBPuX5jpbJhRLj8TW32UfUgEj/Mt61ofdjxuZYFh+OJposJQwsqRsL7+hhiPM4y2PRWKNDOZm8XIrhMehC+qQxsB3srvt783oR9a/A/zNOjuv4KfV7NXrivxqvR7mAjWEDU5SQUG8ETSdnfIehy/4bFN5qWv9MwFdYCoYhsLu9lwyVow1q4Fjj1/HXUaS9yjXsRbnR/+f45Lz+shVVczg6/0DfTW34IlovgFBK/Z4FSZqibD+nJwWNjKrV0euU72PWZWNJLWW4+y7ZdBRi7V+OcbJL00+iimyxAJpe/YKJcJ+OMk5v7R1uAqXNO2ZcJN7dtK9KVv3UX2DxXTLjcVwgWMDH3yPWZYTZgDn0z1VsE8fao8uYhBpFoJkmOsk1wVu9ygL5cQxlyw+xpJVvjWQVC8j/el1/i+9iEcld7Efh1py/oVofrWrdjLuDBaC4MN57TfmnSbh3EPqp921aMJYn6iZY5IDY1bSAhKYBCGxDc9hoTkR9GqJxVnahbmT3CTHyRNuRkJUOZhAsnjbPVZYk2AHWWxaPmqXp9GNidsP9i2Lh7wbHBv0kwtnA2pfJe98vnFdfzifIZJhZIBrhFNFokZjZ5/hbTZU2mOs/oGpEczEUwBlpUG2y+Qw60DL3CHg447SKJeVRdthqT79WvT5SHULKxaWXlB1tR1WQc+tXTMv52Vi0N295mshaP6th0r9Z2ua7y2865ZO6iyZt9P8KEsMv7f7n+8utveV9prCItMI9s+uQ6vI6hNMrmdPhoO34UMyjrp54/n8l1NHLK+knqmhfm1JocUZeAf1YHY3PAl35U99yXL8O2RtR2H4Kv+BSxIbPR2YtRy6SbxMtz6Hg+i/mcKs17KcbnqNrI+9Q2RMrKLpNYstg0V8MpYJb4EBkvPqdzUJuJdcvL6B/B7s4kCFXme8KOtJ9JE2oWXWKqZVG6OIewMF4quzUfv4aq34t65hiEs40g8vdetJ9vxUJpfLkfMN1ZNeC3YoZ/VAOhR6G1AfLAUZh7ka7GySrIwQhmrtEWiDOYWZmTLlZLIplJdlT58Bo8nJe8W4dlaQi1P9ANGVPM84wlzyRAkz0KcfGcKsrMlSATMzC+sc/RZFdcm9+ZrefUIt0b80Q9wsmAOGSDRQtw1khONqlFUksAbJZri2qJPYOgi1xAE3tlwiNp8lBrJlJ/EQuVe2SjSybl/vlbMFWZyOCHNInMgsYOzjNE80hM6sRr0gQosGeQyvIR70NS0RASZhkEAeRtfv/T9aevzQLh/G16rNMyaq2Zm/ci0sN4vldzTlI0zwcQmvs/q3KSY8lf8BwiQXJQWjxEciOFYBGsglrEjL1yokmgrinntZ7CyWx8CTrPtgqti0SvMV46JGe9lAtkbvO8eZYEbTKuCDaJWmFppmLGk/FmD2UsjfJgFiYnFdxfa117SE0KHy775f7n689fp+2/58dBgcVXj5yBkRrCmZrj8DvyHnAj3A5pzg6V63DItqrXZp7IA3Q0xos2Av1mmvCXYmOTJCJQ0TQ5YMYBGp4FQlLA/ODP0GqwPShPOZnQnpKSMU+ZHmsCCDHvuqtqDnDGGlNPkk4+RWTqs1jxW0DIQHsu9rVcSGf1AUKzZg6dHBWTirlL2AidMkFyr8xbnlMS9xgusM+iGo2JJBkLhXEWmfhZEPiMx9rwEW5TmpsopzWKucRy4Qf5/fu0XOjQfvuWtBlISWtXzwQuvxfrCz+GgNSe4aVBoqpIGjAL8JJ9SBcsFnOAbQ70l82Qz8oWZ+KzyUkUphl4OlOgSaJJOZvzvYjqZNaj1XrT7cWeDpbfGBtlmB5ehEriy0Gh8Thonf19VJnpVkRtEm5CpmxY0A0Q7C46Ao/v+m1+h43PVPJ8Z7G4fFb/lCv7C/gNzW1MWezcPxI6YxN0OKv77VH1InuxqahdoWFtOjmeHI4Omx6FoJUpN6dZHwfbfjP/cdhzQPSavBchH05me/DbtPYWtexq1+w5zZscmswvSlQJSiXj0A9bkdsBff6q9ebFTvz9+VkTToTPUvx0Vq+GVXXVkepdB57w7aMqyDzYR9H300gd+84BiG+ipgGUPZOtBtpCQrHaPEy1t2EwhCOzcNkcSO6Eh4/q206a8ak6+gT+rS2CzZfPJ7nH7o1Geh+CtWxModaML6YfHBopLPHWEvWtujIxy5BbdDKVL+ZQOjjKdmlFGj9zyxR7DtN+3uPEEzS0+F7Vecfwd31Wa+V2cm+XVndbARJB3Gk6nyV8JF5p5Jg5OeBr/MCPamcgJ+I+AiqumwMQDW2f5nPRTvcpAIOikGzuZ3HIYNV+RWL/P6/cMHbYGvZxSM/OB9ioojo2ZBx65tPbdKHNhvnn9c9fTVVy0sXAn0UVBFNDCqmLp7KFYuGm4kzmPW0aaI7cJ2YPbQEqQSryJ5gPsGQOgMrIv1p/9RW9yY865gAeZb5tVIEG2jafz8KoVOxIl9p2ibIOr4vDCz3jpmIa5O+0ntqUZ9XZ22xyKMK8No7N5HAQCBguWyPoA98vEA0gRrmDhqCArGzFuM6cxvKuvuUYxsPMZ54n88bnXUVMIbpHgOhHsyqRvNUPlC62egnHviZfDUA094+QfjWEehZrt1cmzYU7+QW6wWnNZmKOCGv6PDOooSGxc+UGco1Mhlh3ro+hZBVrvHbKJvmcEtN2KFFwkg6y0vehKoqjF0xXrh2NqHyT/0ArcSotTP4f32JN1jzjl2wUGetXtEjmgaQXwrxS+3Cks0lIcIJF+a3nyT0SZIjz2glaW+AxfTjkWHJv0vgYhHQ2Bx+HWfusNnFHlTZ3haUDrZSgw8K0QHcJpiVuU4bstRWKO8+VKsb4I0xqYxU93KeiUVdlkb01YMLGoPFV1BeJhHXdPBLuvKfORhAEYrqbgSK5eOVm/un8p9MmZ4aAS/DuqVfMh5JGCoTehkSYLd9JrVa7Dhg1dhsOX9Igk5VNBjiJ0bGjIE0kYQGZIUcxV6xq+Cmv4rqc4EyO1tVs0g5WiI5lg6kDEYBAMJANqRoziyUsuRWYUNhbCBhrX9vhTB+ajZTPPJHenNv+HcCRxD+HtqjD6fE9mizchvezVRsKG9n3/Stw4f6r2qwx4Vpz8hHbWe9gyFkNb2iVxvghcBNujaDK97Nx5Y8kapnE2k471AJCKEmzNvlss9K/F9PjbcpuaZlXLu/vzr87j2ptJnzbWJ629ag5p/W4lEZaNIeCZAIuO6sirrO/qyTNXj3OV5WXvg1FzrP4rry/VRP9Ve0BLP6jyJU7gYcMgq17FtGyA842XRWvb79nKwyR69sQW7EOblXqSdq2GbAVtepeBVEdILBG96JNeqsy34aXCzlHU9HSAgzPQi1vl7bSTMjW5ubwo/qhCz/77FmYt/Y32qHucDZhebsUYAkA9H5rSI78zlFoYdqgfTyBEPkp428UAnOSZpas/WpyKqx3FMbJITmqGOhZTUl6MRse8Ci+VhLTxP2oFgjPYtfo654X4mObvN8HdW8b0k9DWPYLs6MfiN4+PJJVDlxzdD2Kt2lVq+Ojekts1VTHIe1E33Hh+eq8061apn0Utc0VWtLPQdo37oqf4TNntW+Olv7l0rL6Wf3RV+GhfO+tWr11xLAji9DD5tR3HWbPZgPeiqShoUydQN3/j2Y5xwWI2ULZuOzlRmt3tPQsFpO9CLcJnHPQzsCOLx9OksgmvlfFnwMgvGfhcuoSGqZ61QivIitAofmoLk8eSvmkk3wUKcRW9QkkI2eT6nyr2nUm3lnI3NaIomYt0WR5P4v7tw83v6kX4yxO23XpPdKHuouNtipHNU/XnMVt6q/7mqJpX4s0YVGYsbdp0xAfjn2e6yOdEHDYC+znQJovSGkH8FaNTWHsjuql7po2NcZ4loAEcZfkui66J5G1aDT7Ln6dYE0+m311m9Zp1li5cx+k1lT5mwaeW7WBMI6O3D0LJbyKARMZHY3oXvdkfHsC2He90P+y/uUL/Jb3851c7Dkgxjg1bG8PkzBv/p5oFghF3g98xf0SKQhgrx+I3Q3URwIz69Zkcz1I6EElJKMWoX7Z5WuSi8yB+BPxO/bpzd79Oyy8tgj3KsLiE1y1Qsf09+qU5cDkXhbqyn1so4t8mfdksBuz5JXNZLOrAfe6T8s2IVG9T3JozIn2eQmG6LbL/gaJgXFywLNRFchlTgNsZVrabNhWWkiy59uEzCbO/CtfphGYUvHr8uxnsVbaD0jzWuNkzPlbnjX/PqqRkkNkT9kj96JRdXiV4sbfzFwx2TN/92tBiY20qglis1hw0F0EX+pRSNdgZnLDQNtFdDIpmQCbJy9wEuHL29C/gDe0T6R5qIztOdir5F9u1R1LeJNN2rUM+ptbsIwJSgBsQ2BgL07YW7V9kFW+xudFQRA7dCnpVtllYVohUvkNEZ7QMGVj/ez1Xt2trowkuRZe4EcRcmfz0uDGaZOQ6L6fcTajf7fiyzijsWjEY7isAqeRg+kDov13/mVt9MFY1WWLdWAOmURHdahiQm3DgAhTdgyHW9II+T3RSsBE/q9M+T4UtHuR5mU/5IBkz2QvMX/RUd3PYq342SuRhCYOk0gjyaM95BwykEQbLJbDQZpIQGYDYukmNTnLJlX4lXknWwrn1XXaJl/OINeC52I6ZEKCxG32CpntduqOavbJaYsWQHmUaxIIGSuclTyAvMqzkLRnlcu2/7ENZMXB1LdQmFcEjkTEGXAUFSjtlDlSgQkxnWsJpVqjXCPrpkWBMCctLYOc/2vnkHvm4GQjPYbjCpsku59k5+BnrnOgGqB4fTFtV/mXa/Yck3RVHxgt6vKMsT4kn0FUkiDU1fZWjUAz9nwe7Mmc5ntZ22i1JHE9Q66pkeo9jB9r4r/CqDKJYuxbZVnlRNYkDyXx8vdMSAaT72QjUXHZODmpqziXhE2ZSjG9sllBlxGB2Vj5bELJ4uvUMIeOZACLSH4BjMAD55k0Z2kyZNGMNRES9Sx5D6dWrp/7s5ctZibZWEWnct1MOBgN3BrJxVxrx9RiwjrxKdj4Ep1wSHkFVn6vtnAfRVnUdKl5RcIKY3cEK+ulDqR5ayVYz2KWyb2tQZMBbkWYLcnJF7gekIaaAMYCfObewdKB+RMkcH7RFAgCj2oXkVdaKag9uUbFGhhp7SLsko/J74jO1/i7sXSYr/f8MRuhua4iOfTPMKE2GuKvz2nCTvrKjmfj5QA0Gzsy63wuG/cYECAbULJJ+DEPmTFQ20wWk+Lgreqt7v8+3/UQ+V7uG5PPYef0kTarzEvkYpnE3CtJOjQ++oew3TmHFk2BFekIXkPFey9z0jUJDkX7To8ibHhMURHT7SsMOXXkhAEz80e1I9ing7G1UjFIIPIZ8p1stPxfARGzsNEIP6oJkuvfq3Q1388hIgRihqEaFShQKco0V6Muycy8FuKNgO38hHvmeVJwZ34I8Gi7XC/7js9GQP3B/IiIAlvCchHMr+f76/Ovz0bOClsqnmd2eI/2YO44VBo+HtUu4G2oPfkE2Tgk5l5lqyIn7P+jSi87GsGmp1pffazHtuZciUB4QJuImu4YuJoWC9tSi+TrsKlrYC/scleLKVEG1iDqRrIJJYpUqQknwYRJP4vny4ZvKAmfobVLz1knUjmqua88yFaduZ5Vq6/k+qM4sjr06nc/fZ2tGv8zT/N9As68NgbvGl20duZ0q0rMroOxFzyvwyGCmuARgSI6F03IbI0roGAPXCVjjsVAI77qo6hrfgAuWotxFobmUV2AzqK4kRsgZbRIsBEsoEndiw5/H9wQE6kn38bdK6NrrO20Nbjus7pKkXLu42XzCDR0aJjUhffpnAogn2fqhZRzIJGfRZbwqCb35hNagdl5zZeI4okuCm17FkVZWWTlxL02q5K024Ue55pfsUkbtb0VtEdgwVhu1Va5gaYOUB+E9vn87ZfpHNX+byMvBEVoCge8AzGiVHtVAR6DBMG1dk0cy7wLNPzr+tffCXHHzG9/PFbMq+T2UdQ4mm3m5vh3V5G12USPop1hJ69xSj3sY4qkbECfi+kiD+IhmDdvxbh3TmdaC8O8EGVQAMRpBX1+rxZunXDUu6LpQUmsTsRthSJ4Fl2P79nQahTkClogdLJKeBy+SmEVnyn/V+3HXHXYHUodhnNdYU1Ci+nARyRZ87ksOn8B8PM+FJy3wUw9i6G9w9DWYC/0r7Aos7yL59y/4f+dDOZgqw1/VLuCmFHxMQQNYg4zlxy8CIVs2tZo8iC0bKO3V5UTCxNbs4BmEVrklaACS+MYZpxXOiEOSX5ZlZlGhuBQvE+b5qitqCNmisqzOOfncCOdBZ9oJrtzsFZ5X4HWswr/YXkUyAASxpFyGBNQQOHvkGXx+TN65TmMsVvzexzUa2XcGjbJ+GBgNMbB1MS459BsBXlxgES7HK7HMN63ObQP8BG4MQ5wvpeNlihKV1Reo4quEYc8G0SoOs+UddMmr+uo42DmOpKJWUshe5ue5BfhWpXYs15aCTCzc59Ax1P4leuEtaXRuNk3MV2axtNLJyjdADpcm2f6i/UXX5/txKFajnALA5xCMec5WUBZSwJ0XZKubcIKEFgjFkj2dAIrNOlXYyWbWxljLqSRoRvInMfRFbeGaM0Ep1gqJ97mtsDi0Rygs8obqXY2OucXiDEDzhjiNIZ+lEPHls/G3gqbxN60YZOoVBX2s1ciRKIXpJBnEuXI99sx9RzaBt+n14bD0jUzZ7VEYO5k4YEFRbJy/2ws3aSuIXcmhLljY0e7A2BCwWbsWYtEggREBA9yH8TOnci0QUDq26ThQ5nj3FfyL4EL3WDXJAElIPuVcUTqt2CF9EZOfqWXhbVy4K137sf8y5jDdxDBEcGMJIR2PArSo3QA1KahOnzBVZiz/5if1/XyxUiFSBmljmw/6jj/T/13U7OsiRjlFONSapPkqMoyNjRnlQl3VoHKqsQRaZxr5dpXHL9IBNPGhKuvTv1yxtV+TL+yuEJ/W5EUdMiZuv1lfkhdURVSUFdbkryjQh0EUOLKNieUbtMoP8+GvLnNVxlyFP7ZxHlO3Z/W+DNMv0hZJuqjaFltzseUR0e70O6dx5Fjalu/C9zAwDN/R9G5RtDmmtg085kcDGNEOMjXkq+SIO2cDsi+KKNyAT6dnNnfrL/5nSCSwEDWnl+LGgiq92P6WRJ4umt1GUT3Otz+7fy3szFH9yEDQBDGXDqr+mur6qtsFlEPdp8TaoOwRy1EJlKyicMkurMV8vdRJGGQmGzthhNIzNmAuT67922YARuGoMYEBQ/QnUZCutIKc4rpQ+5msb9NdynSvWvJmXhZCJRAxmeh2crC6SR6c4gdRRDRvoaweCfSzioVflTZroOM70oGX4iTpLXe1qFxTs1zZTO3r9bhcWPk7/Bf5NH4GARtaxx+mjYMnsV1P4rr6qgWaua7kcKur5x5Fdq5yTUkd60HmDzn/q4vntMK/msz0xQdPj3rhy/Rm2MVzSbH9b0oZRROdZgym7IngXrvMO1ZAMKGyzcT5Mf0tWu0qI3Q4+/nQD4BWvG9iLc7KtSVaE1e0M++FZLZpF+lXEflcgg7m7wVPF4EyXXOaj9xfYazwKatPYSf3UON/ioiv2sNx4/iGXPtrUqsjWEv4OA+wNUG+52FDpezMEZmXkc3mdY26KPI+K4oXib71ddwX5pGTmWrqkn5pnvV0u/F3i8B+Uqeg/dy9Fqdkj5ts5EsXypoVHhLMYuCqXwvsuWjaq07knQ95ffqf9F5ExCC3vgml93sOh0ObA25FZrT4T0v9Qu3SzN6r47Pt916r5+t6is60nQMAM/GelyIJ3zHYerQs8814pnpxqSz6ISd8blnI1dXZcBXwd2vgQib+VE8vKyHFgye8V6E2i1cWng+qlqxx7cK2d1RqLZMzoLp7FUz32v/rDp4e/ezOk7tU0hGo2U8miepYuRb3xPWpY5zarRxprKEwvIeDltIVxGYV7x4DtiaxB+HDTcuFeowRlIk1NZYrKPqGDonc04iSEw9pgsNJGPeVYVrohU9KZ3QEsPPNbudAT8k94kdGwdXlRrUb0tH9jVoOTRBxqccuWlIzQ3tTAgRGJ1AzHizWHrlrYk4ZWFFvziuDnZ8GHAL/orNBKuVhG4ikkK/8Vnkdvh2scshu/Ne/I1tqIKsjY2eZxYF3aubceawpfEayljr2cRywsv2SieGV2GxPEvmAU1Q1kiV4V6EEJKK+zD19GFPBDCROOY1kzJRLPfA3XzvSI8oRz6cwSJfyw313Aj0nXQnEbOgtAaChm7HJZIjdAZ2sldRkMl/G6ocg0ezTwOwYc9qTtn1ACAX8gns3Vu1QNBX3HjPyap3gVfuy4FO9AligPnCJxHeVE57DnYJ0Z65/Lj0zeukZJ43YUx9GHMYk+GF3sUBkEVVI99aUkAkjrL5THQHZGYNaUH+H7g67aghauYx9xYWvr6yaTMHfLCEmfeqkmxpncNHAxGu8gp8HFrmrJ4shN8v0/iU0LZGe7HuZA7iSMsL8QetD8HMLO2S2p919V1TSuBAAUWupv1ZxZqH+YOq5rhKBD2L4xQ8itWF2QAACR1JREFU4WO6/6jx9npM0058uF29+FF8Th1+3KuIqW35daHYBEGIFsSJ1QU9+V73GVd/oRSzmU5u1RQfGgDaeFXjlWfR5svt6FCVwwToGcksYWhMq7jFYMHyt2yqbOBsqGhjEUGbJ/eIAFCvT6o2mV/mvuEsTJNciwQX0cn3InkhH+5VKx54fGvh3E+3qE5cIr1Qwnplt6fxRKFYAxx9fxMUwEWVPdi8Y6wSaYDbdA0jnAkbeyb7NOUWhE1yL/ZRBOPPDsc5RCCr2oWbs3vUpw5Q4sztlIkrR2rk1Bq0TZtNkw36rfr4ZbKy0ABvq0B0exGh8SUgQJlJ/ImMC+VMT5jwoGvYKKts1kwyztZtKESRc9tgHVbmoFlQpalnwTAaTmHjIpMWicpBxXFMuubaGOOFitnBTL0UjjVlDQQxfyHfjcR3sHN/mk00Rz7kHJYZwglSNwuPrlVy9TbEFlgx9yKNo/WZsp6nu+0KNPh7t8AQzgf9cBiAAdskyrpEe2U/fq/2D/wf2rohJB2O5gKEiilCOuOQH3Eg87efvYSjmbmtRe8STkKBwIJCnyJaNt050PB71W/nJyc2CSrseY/qn9GbfivSB5Qt21Te5YQz1zqkmmvSSqDQpKaQK0eMq6xxI3tSbuPrwed3EirPrYZlG7wQdg2S7lZdrFROrrGtt6ptEE1rSETX0uffaDINhLIxFUmpaTFX4DrMpfyfT+f/Z9HufA4P8s/KfOVStgKeQhCsovNxqDpSBrdGwwr971W6ytQi6Kwfn0MxXcNRPofmFEujA7kKSyb8b134jULCewFIj+murM7GenT1Zb80XvU5ZRlf+6Tj1B2f/l7M4Jmwf1j/8DvkYw4HlZ3km/DorYr12fbUKIkV3yeZ3kwKlY1MDCJ0DTEAnlVaJPfMZ8W/m53QhiSZsvGQ3/3slQWNtFH4ZSH05mB+dD1H4DmQy+rECZaz2FhWReAsPJ8u36HWt+oqrKIyY7HZInz2YnrJwQJbl6jriIxkX6N15YFoZjUPEQqEFeqijpYpwz0HSpT3sOwb+1lkdFr4oVzNobRWuU73ZfFSzGS+jb1742f8SMHzrEFYOPD5HLRunjEartcy308xleBLH4KYYDCBGWe3lH4dENgmWPxm7+BQiVoBwZmMZ1Htd/2vic2AotbA0u+X8t7cOw/zmBbK/VJfbuKuGgnYDq8wzUWNs+0bTdqvjDd2OOiHBjy0DgiK53SAc83GdYm6wKnZjIgpzAnGRknLvdg+RAtlxNXxO+SwVXJUub/e4zQkbmTCLoue/pNbEW1ogPmH87MmIsg6QOSgOjRjRpCXjaSiMSZSb3TFb7lXrkcg5Zq5DoDg9XBkffOsXsLU78MXnWfSIiFjDEICZD/3bL8BVSi4j+eGel5FXZV5y77k6/ATM68tnF/nIFGNHA7VYxkIR4ZUE7feigJI3J6d7j3oVCpV9R4nzAYWinPK8zk2o8PyHEqeLvm9T6lk0JdrGMOVUq7ROFnQSJX/q9wzmyuSU+RDkKDRrF8TNJKsm79Ibml3/Fk0/s3Igr1D9l6dzKNolG6FmmWzMztIT2vDOdUm2booceab2eyfX83wf0UzZONewZFZe4fN59+md2Hm2Gc/qsfj80JDui7sIGssENSmfEzRTFg/RXEOcJctQPkySx1Ya45IormWNT31+WiKrFsOITMKm33nmoT9r3X+SxSrG8Ob8JhAMEYcog5T3qqj0lktq46pFuQwyjtoi6CA/jbo24+itcSEJ1TXNeJdt657FOfwLOxTbNyrmlxjr+dAZHKZQ01kZ/K+FXN4fo+kMXFodeRlABU5oMzJjI8/lXEqG8iz5n2mTuals99oOPVMMaetpW1EEbXcT+29TX4WPxS7PY5nnoNfkb9nXLSGcWSe89kcpH4pNHoOk01MtBYiZ6Ec1phNKGzfhkD6OXSsmUPQFj6F6KfmOHymo0pr86zZ6JqIgtjn4CgnJjh019X6IuOgrfKs/E1czlnn/Se4vbuJYlLgRMqHs7gKkGwGEYNMdhY7E5cJy2eZD7ciCOOw0gokJieui3H83QKzzfkaaDgjtd+Kg5UqjYS8ag0Lin2F+bRdWpYhYqARIYuzGPozNuTDOL00HqUl9UX8KF4uf8u80ZyibHwNXYUjPAit/C2CaqtKt1VIXxD7z2pW03URWbtGvNL2NiiTGc3qz1hVMrZsegKhX42Pg1rWyXhNPXyeWx/1TrBqzpS5FpV7Ts0QKqK9GFEShpaj+jYk2LEYlN2KeAFv5vMEeQeb5LVyzwgE7P3nYPS+XI38p9sUm9RI2lsRaFlI4biOCmVSIWubjYJ26XLQK0zjLFrNoygtRYE+qwdfHuZZBVykjwSZbk5deJVF5RfQJB2N6rYBDirou9r7NSrbePlX+JrA/kXCIG0dbBoThD5zpIkORK+5c6iOag9mno9qddz8wUy3zhUZ91m8XrBmq1gkoYxFx7Q+o7FzHYLJgfwxvMBdjWrdcv3mpor0zvMliENgQitkPpoAHDpCFIw2gaBWxETwgdhnzgBHV9G1NlqB1rWvFOzl96xFBDxTyzVeaPYU1AsbNlOe0KRD0pik/J7N2FBmpsG9SNZMRmN7OtLTmJrGK7XZRNI1HPqshjL5ThxIGojf5JC5l016L/7Xrt0Q8YHoXQU+lKACO9En0eeyaBxrCAOT7CDlOyY/0orf8FZUqHIpzD7wmmfVqOf+7XP5Lv/sMbD/loJrfIJbleSSqjLONi8wH5P6NlWHW3XVynuZc/3dO5eEV8CcKqPYqgCKBfIzU/h5IeqmEfLZbjIaoUTTdR7MnCOrvlUp9LOIBFlG9hihthcBxWteNVWhIuU4snA5nfswYkTFy5au8VtsEIMTfuxNSQKJjPA9YGUyAdkoJvm9uF8b9NbS0cEgCX42CV2zfhYQsaUxYWBSRTG2IVCT7xB377EBtimC8jKxKuG66q1fMSswxHSjT3MoXG2cmC2F3/dBnzZA8ZfpAf9jmvavyjLnM3k+17bBCBRQn1W16ube5hdcyE82PQonIWKmnnmWICUUEbXBml1fsu2StNY2c6O3O18pBybXy3vd4Zbmgyxm9iERkZcBzGU1WVMl6C/tvbb1v/LJRHPk7mmuAAAAAElFTkSuQmCC'; 
	const basepattern=new Image();
	basepattern.src=base64Image;
	var option = {
	  tooltip: {},
	  series: [
	    {
	      name: 'pie',
	      type: 'pie',
	      selectedMode: 'single',
	      selectedOffset: 30,
	      clockwise: true,
	      label: {
	        fontSize: 18,
	        color: '#569056'
	      },
		  legend:{
			  // icon:base64Image
		  },
	      labelLine: {
	        lineStyle: {
	          color: '#569056'
	        }
	      },
		 
	      data: [
	        { value: 1048, name: '2000-2010年' },
	        { value: 735, name: '1990-2000年' },
	        { value: 580, name: '1990年前' },
	        { value: 484, name: '2010-2020年' },
	        { value: 300, name: '2020年后' }
	      ],
	      itemStyle: {
	        opacity: 0.7,
	        color: {
	         image: basepattern,
	          repeat: 'repeat'
	        },
	        borderWidth: 3,
	        borderColor: '#74c374',
			
	      }
	    }
	  ]
	};
	// 使用刚指定的配置项和数据显示图表
	myCharts.setOption(option);
})();
