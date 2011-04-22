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
}
Shoutbox.reload();
