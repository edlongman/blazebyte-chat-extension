shouts=[];
Shoutbox.reload=function(){
	var messid=(shouts.length==0)?0:shouts[shouts.length-1].id
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
	localStorage.setItem('shouts',JSON.stringify(shouts.concat(got_shouts)));
	shouts=localStorage.getItem('shouts');
	chrome.extension.sendRequest(got_shouts);
}
Shoutbox.reload();
