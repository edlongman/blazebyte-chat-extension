shouts=[];
localStorage.setItem('shouts','[]');
Shoutbox={
	reload:function(){
		shouts=JSON.parse(localStorage.getItem('shouts'))
		var messid=(shouts.length==0)?0:shouts[0].id;
		Shoutbox.checkShouts(messid);
		timer=setTimeout('Shoutbox.reload()',reloadTime);
	},
	checkShouts:function(lm){
		var x=new XMLHttpRequest;
		x.open("POST","http://blazebyte.org/shoutbox/shoutbox.php?msg="+encode.url(mess));
		x.onreadystatechange=function(){
			if(x.readyState==4){
				
			}
		}
		x.send('action=count');
	},
	output_shouts:function(got_shouts){
		shouts=got_shouts.concat(shouts);
		while(shouts.length>15)shouts.pop();
		stringified=JSON.stringify(shouts);
		localStorage.setItem('shouts',stringified);
		chrome.extension.sendRequest(got_shouts);
		if(localStorage.getItem('iconState')!='stop'){
			flashIcon(true);
			tryChime();
			//animateFlip(0,false);
			localStorage.setItem('iconState','alert');
		};
	}
}
Shoutbox.reload();
canvas=document.createElement('canvas');
canvas.width='18';
canvas.height='18';
canvasContext = canvas.getContext('2d');
img=document.createElement('img');
iconsrc="img/logo.png"
iconredsrc="img/logored.png"
img.src=iconsrc;
flashIcon=function(isOrigIcon){
	if (isOrigIcon){
		img.src=iconredsrc;
	}
	else{
		img.src=iconsrc;
	}
	if(localStorage.getItem('iconState')!='stop'){
		StopFlash=false;
		iconTime = setTimeout("flashIcon("+(!isOrigIcon)+")", 1000);
		localStorage.setItem('iconState','alert');
		chrome.browserAction.setIcon({path:img.src});
	}
	else{
		chrome.browserAction.setIcon({path:iconsrc});
		//animateFlip(0,true);
	}
}
chime=new Audio();
chime.src="ting.mp3";
function tryChime(){
	if(localStorage.getItem('chime')=='true'){
		if(chrome)chime.load();
		chime.play();
	}
}