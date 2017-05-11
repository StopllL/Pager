# Project Name
this is Pager

***
## 使用方法

	// html
	<script src='./Pager.js'></script>

	// js
	var pager = new Pager({
			el:'#dom',
			count:100,
			pageNumbers:10
		})
	pager.evon(function(data){
		console.log(data);	
	})

***
## 参数

	el			==>	按钮容器
	count			==>	列表总数目
	pageNumbers		==>	每页显示数目
	showQuikly		==>	是否显示首页和最后一页
	activeFirst		==>	实例化是否首先调用第一页的数量
	limitPageNumber		==>	超出多少出现省略号


***
## 方法

	evon			==>	该方法传入一个回调函数，每次页面切换，会调用该回调函数，并且像回调中传入跳转页的页数

***
## CSS命名空间

	// 前缀pager
	所有按钮均有pager-span类名
	首页：		pager-btn_first
	最后一页：	pager-btn_last
	上一页:		pager-btn_prev
	下一页:		pager-btn_next
	数字按钮：	pager-btn
	当前页数：	pager-active
	省略号:		pager-elipsis


***
## Attention

  元素选择器采用document.querySelector()方法，兼容性也受限document.querySelector
