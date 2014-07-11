var midimg=0;
var Ecoverflow=document.getElementById('coverflow');
var step=280;
var visiblenumber=7;
var unitopacity=1.0/visiblenumber;
var animateDuration=500;
var goleft=function (time){
	console.log(midimg);
	$(Ecoverflow).animate({left:'-='+step+'px'},time);
	for(i=0;i<N;i++){
		$(Eimg[i]).css('z-index',9999-Math.abs(midimg+1-i));
		if (i<midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity},time);
		}else if(i==midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity,left:'-='+step+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, -0.5, 0, 1, 0, 0) scale(1)'});
		}else if(i==midimg+1){
			$(Eimg[i]).animate({opacity:'1',left:'-='+step+'px','z-index':'9999',},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		}else {
			$(Eimg[i]).animate({opacity:'+='+unitopacity,'z-index':'+=1'},time);
		}
	}
}


var goright=function (time){
	console.log(midimg);
	$(Ecoverflow).animate({left:'+='+step+'px'},time);
	for(i=0;i<N;i++){
		$(Eimg[i]).css('z-index',9999-Math.abs(midimg-1-i));
		if (i>midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity},time);
		}else if(i==midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity,left:'+='+step+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0.5, 0, 1, 0, 0) scale(1)'});
		}else if(i==midimg-1){
			$(Eimg[i]).animate({opacity:'1',left:'+='+step+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		}else {
			$(Eimg[i]).animate({opacity:'+='+unitopacity},time);
		}
	}
}

var move=function(){
	var id=this.id.substr(14);
	console.log(id);
	if (id>midimg){
		var d=animateDuration/(id-midimg);
		while (midimg<id) {
			goleft(d);
			midimg++;
		}
	}else if(id<midimg){
		var d=animateDuration/(midimg-id);
		while (midimg>id) {
			goright(d);
			midimg--;
		}
	}
}

function docoverflow(){
	Eimg=$('#coverflow img');
	N=Eimg.length;
	console.log(Eimg);
	for(i=0;i<N;i++){
		if(i)$(Eimg[i]).css('left',-step*(i-1)+'px');
		else $(Eimg[i]).css('left','0px');
		$(Eimg[i]).bind({
			click:move,
		});
		if(i)$(Eimg[i]).css({'-webkit-transform':'matrix(1, 0.5, 0, 1, 0, 0) scale(1)'});
		else $(Eimg[i]).css({'-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		$(Eimg[i]).css('z-index',9999-i);
		//console.log(Eimg[i].onclick);
	}
}