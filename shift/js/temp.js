drawBLock: function(bx,by,colobj){
		var ctx = this.ctx;
		
		var drawRectangle = function(x1, y1, x2, y2, x3, y3, color){
			ctx.save();
			ctx.beginPath();
    		ctx.fillStyle = color;
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);    
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
		var x1 = bx, x2 = x1 + this.blockwidth, y1 = by, y2 = y1 + this.blockwidth;
		var cx = (x1 + x2) / 2;
		var cy = (y1 + y2) / 2;
		drawRectangle(x1, y1, cx, cy, x2, y1, num2color[colobj['top']]);
		drawRectangle(x2, y1, cx, cy, x2, y2, num2color[colobj['left']]);
		drawRectangle(x2, y2, cx, cy, x1, y2, num2color[colobj['right']]);
		drawRectangle(x1, y2, cx, cy, x1, y1, num2color[colobj['bottom']]);
	},

var t = new Image();
t.src = 'res/pic/block1.gif';
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
t.onload = function(){
	ctx.drawImage(t, 0, 0);
}

function f(event){
	console.info(event.pageX);
}

$('body').click(f);


	$('<div>').css('width','300').css('height','300').css('background','red');
	$('body').append('<div>');
		setTimeout(function(){
			moverow.call(Game, num, off);
			off += noff;
			if (!stop){
				if (Math.abs(off) >= Math.abs(offsete)){
					stop = true;
					setTimeout(function(){
						moverow.call(Game, num, offsete);
					}, fs);
				}
				else {
					setTimeout(arguments.callee, fs);
				}
			}
			
		}, fs);

//被观察对象
var Subject = {
};    
$(Subject).bind("evtHandler",function(event,sName){
    console.log("i'm "+sName);
})

//观察者
var Observer = {
    count : 0
};
//订阅事件
Observer.regist = function(){
    $(Subject).bind("evtHandler.Observer",function(event,sName){
                    Observer.count++;    //当订阅的事件被触发时,进行逻辑处理
                    console.log(sName +"'s count: "+Observer.count);
                    })
} 
Observer.regist();

//触发事件
$(Subject).trigger("evtHandler",["num1"]);


var obj={};
           $(obj).bind('MyEvent',function(event,a,b){
           alert(a+b);
     });
  
     $(obj).bind('MyEvent',function(event,a,b){
           alert('第二条！');
     });
  
     $('#btn01').click(function(){
           $(obj).trigger('MyEvent',['aaa','bbb']);     
     });