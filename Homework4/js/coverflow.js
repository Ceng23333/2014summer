var midimg=0;
var gap=260;
var visiblenumber=9;
var unitopacity=1.0/visiblenumber;
var animateDuration=300;
var goleft=function (Eimg,id,initialmid,finalmid,time){
	console.log(id+' '+initialmid+' '+finalmid+' '+time);
	$(Eimg).animate({'opacity':1-Math.abs(finalmid-id)*unitopacity},animateDuration);

	if (id<finalmid) {
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, -0.2, 0, 1, 0, 0) scale(1)'});
	}
	else if(id==finalmid){
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
	}else{
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0.2, 0, 1, 0, 0) scale(1)'});
	}

	if(id>initialmid&&id<finalmid){
		$(Eimg).animate({left:'-='+2*gap+'px'},time);
	}
	if (id==initialmid||id==finalmid){
		$(Eimg).animate({left:'-='+gap+'px'},time);
	}
	/*
	for (j=initialmid;j<finalmid;j++){
		if (id<j) {
			$(Eimg).animate({opacity:'-='+unitopacity},time);
		}else if(id==j){
			$(Eimg).animate({opacity:'-='+unitopacity,left:'-='+gap+'px'},time);
			$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, -0.5, 0, 1, 0, 0) scale(1)'});
		}else if(id==j+1){
			$(Eimg).animate({opacity:'1',left:'-='+gap+'px','z-index':'9999',},time);
			$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		}else{
			$(Eimg).animate({opacity:'+='+unitopacity},time);
		}
	}
	/*
	for(i=0;i<N;i++){
		$(Eimg[i]).css('z-index',9999-Math.abs(midimg+1-i));
		if (i<midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity},time);
		}else if(i==midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity,left:'-='+gap+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, -0.5, 0, 1, 0, 0) scale(1)'});
		}else if(i==midimg+1){
			$(Eimg[i]).animate({opacity:'1',left:'-='+gap+'px','z-index':'9999',},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		}else {
			$(Eimg[i]).animate({opacity:'+='+unitopacity},time);
		}
	}*/
}


var goright=function (Eimg,id,initialmid,finalmid,time){
	$(Eimg).animate({'opacity':1-Math.abs(finalmid-id)*unitopacity},animateDuration);
	if (id<finalmid) {
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, -0.2, 0, 1, 0, 0) scale(1)'});
	}
	else if(id==finalmid){
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
	}else{
		$(Eimg).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0.2, 0, 1, 0, 0) scale(1)'});
	}

	if(id<initialmid&&id>finalmid){
		$(Eimg).animate({left:'+='+2*gap+'px'},time);
	}
	if (id==initialmid||id==finalmid){
		$(Eimg).animate({left:'+='+gap+'px'},time);
	}
	/*
	console.log(midimg);
	$(Ecoverflow).animate({left:'+='+gap+'px'},time);
	for(i=0;i<N;i++){
		$(Eimg[i]).css('z-index',9999-Math.abs(midimg-1-i));
		if (i>midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity},time);
		}else if(i==midimg){
			$(Eimg[i]).animate({opacity:'-='+unitopacity,left:'+='+gap+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0.5, 0, 1, 0, 0) scale(1)'});
		}else if(i==midimg-1){
			$(Eimg[i]).animate({opacity:'1',left:'+='+gap+'px'},time);
			$(Eimg[i]).css({'-webkit-transition':'all '+time+'ms','-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		}else {
			$(Eimg[i]).animate({opacity:'+='+unitopacity},time);
		}
	}*/
}

var move=function(){
	console.log(Ecoverflow);
	var id=parseInt(this.id.substr(14));
	console.log(id);
	if (id>midimg){
		var d=animateDuration/(id-midimg);
		for(i=0;i<N;i++) $(Eimg[i]).css('z-index',9999-Math.abs(id-i));
		$(Ecoverflow).animate({left:'-='+50*(id-midimg)+'px'},animateDuration);
		for(i=0;i<N;i++) goleft(Eimg[i],i,midimg,id,d);
		midimg=id;
	}else if(id<midimg){
		var d=animateDuration/(midimg-id);
		for(i=0;i<N;i++) $(Eimg[i]).css('z-index',9999-Math.abs(id-i));
		$(Ecoverflow).animate({left:'+='+50*(midimg-id)+'px'},animateDuration);
		for(i=0;i<N;i++) goright(Eimg[i],i,midimg,id,d);
		midimg=id;
	}
}

function docoverflow(){
	Eimg=$('#coverflow img');
	N=Eimg.length;
	Ecoverflow=document.getElementById('coverflow');
	//console.log(Eimg);
	midimg=0;
	for(i=0;i<N;i++){
		if(i)$(Eimg[i]).css('left',-gap*(i-1)+'px');
		else $(Eimg[i]).css('left','0px');
		$(Eimg[i]).bind({
			click:move,
		});
		if(i>midimg)$(Eimg[i]).css({'-webkit-transform':'matrix(1, 0.2, 0, 1, 0, 0) scale(1)'});
		else if(i==midimg)$(Eimg[i]).css({'-webkit-transform':'matrix(1, 0, 0, 1, 0, 0) scale(1.5)'});
		else $(Eimg[i]).css({'-webkit-transform':'matrix(1, -0.2, 0, 1, 0, 0) scale(1)'});

		$(Eimg[i]).css({'z-index':9999-i,'opacity':1-i*unitopacity});
		//console.log($(Eimg[i]).css('opacity'));
		//console.log(Eimg[i].onclick);
	}
}