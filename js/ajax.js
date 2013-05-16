shoutboxHTML="";
localStorage.setItem('shouts','');
localStorage.setItem('loggedin',false);
localStorage.setItem('iconState','normal')
$(document).ready(function(){
	//test to see if they are logged in
	logincheck();
});
function logincheck(){
	$.get("http://blazebyte.org/community/ucp.php?mode=login",function (data) {
		//must have been one of two above
		cachedata=data;
		if(data.indexOf("<h2>Login</h2>")==-1){
			init();
		}
		else{
			setTimeout(logincheck,30000)
		}
	});
}
function init(){
	localStorage.setItem('loggedin',true);
    // Load latest post date
    $.get('http://blazebyte.org/shoutbox/load-date.php',function(data){lastShoutDate=data;
		localStorage.setItem('lastdate',lastShoutDate);});
    // Load latest shouts
    $.get('http://blazebyte.org/shoutbox/load-shouts.php', function(data) {
    	shoutboxHTML=data;
		localStorage.setItem('shouts',shoutboxHTML);
    });
    $.post('http://blazebyte.org/shoutbox/init.php', function(data) {
        shoutNumInit = data;
    });
	setInterval(pullShouts, 1000);
}
// Check if there is a new number of posts
shoutNumInit = 0;
function pullShouts() {
    $.post('http://blazebyte.org/shoutbox/pull-shouts.php', function(data) {
        shoutNumPull = data;
        shoutNumInitSend = shoutNumInit;
        if (shoutNumPull > shoutNumInit) {
            shoutNumInit = shoutNumPull;
            // Add the shouts from shoutNumInit to shoutNumPull
            $.post('http://blazebyte.org/shoutbox/get-shouts.php', { sInit: shoutNumInitSend, sPull: shoutNumPull }, function(data) {
                // Add these shouts
                shoutboxHTML+=data;
				localStorage.setItem('shouts',shoutboxHTML);
            });
    		$.get('http://blazebyte.org/shoutbox/load-date.php',function(data){lastShoutDate=data});
			if(localStorage.getItem('iconState')=='normal'){
				flashIcon(true);
				tryChime();
				//animateFlip(0,false);
				localStorage.setItem('iconState','alert');
			}
            // Update latest post date
		    $.get('http://blazebyte.org/shoutbox/load-date.php',function(data){lastShoutDate=data;
				localStorage.setItem('lastdate',lastShoutDate);});
        }
    });
}





canvas=document.createElement('canvas');
canvas.width='18';
canvas.height='18';
canvasContext = canvas.getContext('2d');
img=document.createElement('img');
iconsrc="img/logo.png"
iconredsrc="img/logored.png"
img.src=iconsrc;
isOrigIcon=true
function flashIcon(){
	if (isOrigIcon){
		img.src=iconredsrc;
	}
	else{
		img.src=iconsrc;
	}
	if(localStorage.getItem('iconState')!='stop'){
		StopFlash=false;
		isOrigIcon=!isOrigIcon;
		iconTime = setTimeout(flashIcon, 1000);
		localStorage.setItem('iconState','alert');
		chrome.browserAction.setIcon({path:img.src});
	}
	else{
		isOrigIcon=true;
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
