

var isDown;
var doc = document.documentElement || document.body;
var DragingDiv;
var ol,or,ot,ob,ow,oh;
var widthfloor=100;
var heightfloor=100;

var composingDocOnMousemove=function(e){
	if(!_oncomposing) return;
	if(isDown){
	e = e || window.event || Event;
		console.log('x:'+e.pageX+' y:'+e.pageY);
  	if (doc.style.cursor=='move'){
   		DragingDiv.style.left = e.pageX+ox+'px';
   		DragingDiv.style.top = e.pageY+oy+'px';
  	}else{
  		if ((ob-e.pageY>heightfloor)&&(doc.style.cursor=='n-resize'||doc.style.cursor=='ne-resize'||doc.style.cursor=='nw-resize')){
			DragingDiv.style.height=(ob-e.pageY)+'px';
  			DragingDiv.style.top=e.pageY+'px';
  		}
  		if ((e.pageY-ot>heightfloor)&&(doc.style.cursor=='s-resize'||doc.style.cursor=='se-resize'||doc.style.cursor=='sw-resize')){
			DragingDiv.style.height=(e.pageY-oh-ot)+'px';
  		}
  		if ((or-e.pageX>widthfloor)&&(doc.style.cursor=='w-resize'||doc.style.cursor=='nw-resize'||doc.style.cursor=='sw-resize')){
  			DragingDiv.style.width=(or-e.pageX)+'px';
  			DragingDiv.style.left=e.pageX+'px';
  		}
  		if ((e.pageX-ol>widthfloor)&&(doc.style.cursor=='e-resize'||doc.style.cursor=='ne-resize'||doc.style.cursor=='se-resize')){
  			DragingDiv.style.width=(e.pageX-ow-ol)+'px';
  		}
  	}
  }
}
var composingDocOnMouseup=function(){
	if(!_oncomposing) return;
	if (isDown){
		isDown = false;
  		DragingDiv.style.cursor='default';
	  	DragingDiv=null;
  		doc.style.cursor='default';
	}
	
}
var composingDragingdivOnMouseover=function(e){
	if(!_oncomposing) {
		this.style.cursor='default';
		return;
	}
	if (!isDown){
   		e = e || window.event || Event;
		var n=(Math.abs(e.pageY-this.offsetTop)<3);
		var w=(Math.abs(e.pageX-this.offsetLeft)<3);
		var s=(Math.abs(e.pageY-this.offsetTop-this.offsetHeight)<3);
		var e=(Math.abs(e.pageX-this.offsetLeft-this.offsetWidth)<3);
	//console.log(n+' '+s+' '+e+' '+w);
		if (n) {
			if (e) this.style.cursor='ne-resize';
			else if (w) this.style.cursor='nw-resize';
			else this.style.cursor='n-resize';
		}else if(s){
			if (e) this.style.cursor='se-resize';
			else if (w) this.style.cursor='sw-resize';
			else this.style.cursor='s-resize';
		}else if (e) this.style.cursor='e-resize';
		else if (w) this.style.cursor='w-resize';
		else this.style.cursor='default';
	}
}
var composingDragingdivOnMousedown=function(e){
	if(!_oncomposing) return;
 	  console.log(this);
   	e = e || window.event || Event;
   	isDown = true;
 	ox=this.offsetLeft-e.pageX;
 	oy=this.offsetTop-e.pageY;
   	ol=this.offsetLeft;
   	or=this.offsetLeft+parseInt($(this).css('width'));
   	ow=this.offsetWidth-parseInt($(this).css('width'));
   	ot=this.offsetTop;
   	ob=this.offsetTop+parseInt($(this).css('height'));
  	oh=this.offsetHeight-parseInt($(this).css('height'));
   	console.log(ot);
   	DragingDiv=this;
   	console.log(this.style.cursor);
   	if (this.style.cursor=='default') this.style.cursor='move';
   	doc.style.cursor=this.style.cursor;
}

var composingDragingdivOnMouseout=function(){
	this.style.cursor='default';
}

$('.standord-nav').prepend('<li><a id=compose_start href=javascript:oncomposing();>自定义布局</a></li>');
$('.standord-nav').prepend('<li><a id=compose_cancel style=visibility:hidden; href=javascript:cancelcomposing();>取消布局</a></li>');
$('.standord-nav').prepend('<li><a id=compose_save style=visibility:hidden; href=javascript:savecomposing();>保存布局</a></li>');


var backup;
var _oncomposing=false;

function oncomposing(){
	backup=document.body.innerHTML;
	_oncomposing=true;
	$('#compose_start').css('visibility','hidden');
	$('#compose_save, #compose_cancel').css('visibility','visible');
	$('.right_module,.center_module').css('position','absolute');
	$('.right_module,.center_module').css('-ms-user-select','none');
	$('.right_module,.center_module').bind({
		mousedown:composingDragingdivOnMousedown,
		mouseover:composingDragingdivOnMouseover,
	});
	$(document).bind({
		mousemove:composingDocOnMousemove,
		mouseup:composingDocOnMouseup
	});
}

function cancelcomposing(){
	_oncomposing=false;
	document.body.innerHTML=backup;
}

function savecomposing(){

	_oncomposing=false;
	$('#compose_start').css('visibility','visible');
	$('#compose_save, #compose_cancel').css('visibility','hidden');
	$('.right_module,.center_module').css('-ms-user-select','default');
}