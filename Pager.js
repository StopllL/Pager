/*
	project name:Pager(分页器)
	parameter: 	el 			=> dom元素的class或者id(必填)，
				count 		=> 分页数据总数(必填),
				pageNumbers	=> 每一页的数据数量(默认10),
				showQuikly	=> 是否添加首页和尾页
	dom选择器使用document.querySelector()
	事件添加使用addEventListener()
	按钮以span包裹，激活元素添加active类名
	实力化的evon方法传入一个回调函数，用以分页页数改变的调用函数，函数传入当前页数

	eg: var pagerObj = new Pager({el:'#box',count:100})
			pagerObj.evon(function(num){
				console.log(num);
			})	
*/
function Pager(opt){
	for(var i in opt){
		this[i] = opt[i]
	};
	// el和count为必填项
	if(!this.el) return;
	if(!this.count) return;
	this.pageNumbers = this.pageNumbers || 10;
	this.domArr = [];
	this.notPrev = true;
	this.notNext = false;
	this.countFirstPosition = 1;
	this.init();
}
Pager.prototype.init = function(){
	if(typeof this.el === 'string'){
		this.el = document.querySelector(this.el)
	}
	// this.el.innerHTML = this.createBtn();
	this.createBtn();
	this.addEvent();
}
// 计算按钮数量
Pager.prototype.computeBtnNumber = function(){
	var btnNumber = 0;
	btnNumber = Math.ceil(parseInt(this.count)/parseInt(this.pageNumbers));
	return btnNumber
}
// 创建按钮
Pager.prototype.createBtn = function(){
	var domStr = '',
		btnNumber = this.computeBtnNumber(),
		i = 0;
	for(;i<btnNumber;i++){
		this.domArr[this.domArr.length] = this.createEl('span','pager-btn pager-span',(i+1))
		this.oldEl = this.domArr[0];
		if(i === 0){
			this.domArr[0] = this.createEl('span','pager-btn pager-span active',(i+1))
		}
	}
	this.domArr.unshift(this.createEl('span','pager-span pager-btn_prev','上一页'))
	this.domArr[this.domArr.length] = this.createEl('span','pager-span pager-btn_next','下一页');
	if(this.showQuikly){
		this.countFirstPosition ++;
		this.domArr.unshift(this.createEl('span','pager-btn_first pager-span','首页'))
		this.domArr[this.domArr.length] = this.createEl('span','pager-span pager-btn_last','尾页');
	}
	for(var i = 0;i<this.domArr.length;i++){
		this.el.appendChild(this.domArr[i]);
	}
}
Pager.prototype.createEl = function(el,cn,msg){
	var dom = document.createElement(el);
	dom.className = cn;
	dom.innerHTML = msg;
	return dom;
}
// 添加事件
Pager.prototype.addEvent = function(){
	this.el.addEventListener('click',function(e){
		e = e || window.event;
		if(this.isTargetNmuberBtn(e.target,'pager-btn')){
			this.removeClass(this.oldEl,'active');
			this.addClass(e.target,'active');
			var msg = parseInt(e.target.innerHTML);
			this.judgeNextAndPrev(e.target);
			this.dispatch(msg)
			this.oldEl = e.target;
			return;
		}
		if(this.isTargetNmuberBtn(e.target,'pager-btn_first')){
			this.dispatch(1);
			this.notPrev = true;
			return;
		}
		if(this.isTargetNmuberBtn(e.target,'pager-btn_last')){
			this.dispatch(this.computeBtnNumber());
			this.notNext = false;
			return;
		}
		if(this.isTargetNmuberBtn(e.target,'pager-btn_prev') && !this.notPrev){
			var num = parseInt(this.oldEl.innerHTML) - 2 + this.countFirstPosition;
			this.removeClass(this.oldEl,'active');
			this.oldEl = this.domArr[num];
			this.addClass(this.oldEl,'active');
			this.judgeNextAndPrev(this.oldEl);
			return;
		}
		if(this.isTargetNmuberBtn(e.target,'pager-btn_next') && !this.notNext){
			var num = parseInt(this.oldEl.innerHTML) + this.countFirstPosition;
			this.removeClass(this.oldEl,'active');
			this.oldEl = this.domArr[num];
			this.addClass(this.oldEl,'active');
			this.judgeNextAndPrev(this.oldEl);
			return;
		}

	}.bind(this));
}
Pager.prototype.judgeNextAndPrev = function(node){
	var num = parseInt(node.innerHTML);
	if(num === 1){
		this.notPrev = true;
		this.notNext = false;
		return false;
	}
	if(num === this.computeBtnNumber()){
		this.notNext = true;
		this.notPrev = false;
		return false;
	}
	this.notNext = false;
	this.notPrev = false;
}
Pager.prototype.isTargetNmuberBtn = function(node,cn){
	var className = node.className,
		arr = [],
		i = 0;
	if(node.nodeName.toLowerCase() !== 'span'){
		return false
	}
	arr = className.split(' ');
	for(;i<arr.length;i++){
		if(arr[i] === cn){
			return true;
		}
	}
	return false
}
Pager.prototype.removeClass = function(node,cn){
	if(!node) return;
	var arr = node.className.split(' '),
		newArr = [],
		i = 0;
	for(;i<arr.length;i++){
		if(arr[i] !== cn){
			newArr[newArr.length] = arr[i];
		}
	}
	node.className = newArr.join(' ');
	return newArr.join(' ');
}
Pager.prototype.addClass = function(node,cn){
	node.className = node.className + ' ' + cn;
}
// 事件分发
Pager.prototype.dispatch = function(msg){
	if(!this.dispatchFun) return;
	this.dispatchFun(msg);
}
// 添加事件回调
Pager.prototype.evon = function(func){
	if(!func || typeof func !== 'function') return;
	this.dispatchFun = func;
	this.dispatchFun(1);
}