# Pager
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

	el				==>	按钮容器
	count			==>	列表总数目
	pageNumbers		==>	每页显示数目
	showQuikly		==>	是否显示首页和最后一页
	activeFirst		==> 实例化是否首先调用第一页的数量

***
## 方法

	evon			==>	该方法传入一个回调函数，每次页面切换，会调用该回调函数，并且像回调中传入跳转页的页数

***
## Attention

  元素选择器采用document.querySelector()方法，兼容性也受限document.querySelector
