if(is_initial==undefined){
	is_initial=true;
	shouts=[];
}
Shoutbox.reload=function(){
	var messid=(shouts.length==0)?0:shouts[shouts.length-1].id
	Shoutbox.getShouts(messid);
}
Shoutbox.getShouts=function(lm){
	var head = document.head;
    var script = document.createElement("script");
	var url="http://blazebyte.org/shoutbox/shoutbox.php?lu="+lm+'&_='+now();
	script.onload=function(){
		head.removeChild(script);
	}
	head.appendChild(script);
}
Shoutbox.output_shouts=function(got_shouts){
	amplify.store('shouts',shouts.concat(got_shouts));
	shouts=amplify.store('shouts');
	chrome.extension.sendRequest(got_shouts);
	if(is_initial){
		timer=setInterval('Shoutbox.reload()',reloadTime);
	}
	is_initial=false;
}