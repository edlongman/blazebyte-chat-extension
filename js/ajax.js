shouts=[];
localStorage.setItem('shouts','[]');
Shoutbox.reload=function(){
	shouts=JSON.parse(localStorage.getItem('shouts'))
	var messid=(shouts.length==0)?0:shouts[0].id
	Shoutbox.getShouts(messid);
	timer=setTimeout('Shoutbox.reload()',reloadTime);
}
Shoutbox.getShouts=function(lm){
	var head = document.head;
    var script = document.createElement("script");
	var url="http://blazebyte.org/shoutbox/shoutbox.php?lu="+lm+'&_='+(new Date()).getTime();
	script.src=url;
	script.onload=function(){
		head.removeChild(script);
	}
	head.appendChild(script);
}
Shoutbox.output_shouts=function(got_shouts){
	shouts=got_shouts.concat(shouts);
	while(shouts.length>15)shouts.pop();
	stringified=JSON.stringify(shouts);
	localStorage.setItem('shouts',stringified);
	chrome.extension.sendRequest(got_shouts);
	if(localStorage.setItem('iconState')!='stop'){
		flashIcon(true);
		animateFlip(0,false);
		localStorage.setItem('iconState','alert');
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
	}
	else{
		animateFlip(0,true);
	}
}
function ease(x) {
  return (1-Math.sin(Math.PI/2+x*Math.PI))/2;
}
 
function animateFlip(rotation,stop){
	if(stop){
		img.src=iconsrc;
		drawIconAtRotation(0);
		clearTimeout(spinTime);
		return;
	}
	rotation += 1/20;
	drawIconAtRotation(rotation);  
	if(rotation <= 1){
		spinTime=setTimeout("animateFlip("+rotation+")", 500);
	}
	else{
		rotation = 0;
		spinTime=setTimeout("animateFlip("+rotation+")", 500);
	}
}
function drawIconAtRotation(rotation) {
	canvasContext.save();
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	canvasContext.translate(Math.ceil(canvas.width/2),Math.ceil(canvas.height/2));
	canvasContext.rotate(2*Math.PI*ease(rotation));
	canvasContext.drawImage(img,-Math.ceil(canvas.width/2),-Math.ceil(canvas.height/2));
	canvasContext.restore();
	chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, 18, 18)});
}