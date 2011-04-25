var emptyBeforeWrite=false;
function writeAll(){
	shouts=JSON.parse(localStorage.getItem('shouts'));
	for(var i=shouts.length-1;i>=0;i--){
		writeShout(shouts[i]);
	}
}
function write(newShouts){
	if(emptyBeforeWrite==true){
		emptyBeforeWrite=false;
		shoutbox_box.innerHTML='';
		writeAll();
		return;
	}
	shouts=JSON.parse(localStorage.getItem('shouts'));
	for(var i=newShouts.length-1;i>=0;i--){
		writeShout(newShouts[i]);
	}
}
function writeShout(shout_details){
	shoutbox_box=document.getElementById('shouts');
	switch(shout_details.group){
		case 'Administrator':
			shout_details.group = 'admin';
			break;
		case 'Moderator':
			shout_details.group = 'mod';
			break;
		case 'Honorary Developer':
			shout_details.group = 'hdev';
			break;
		case 'Developer':
			shout_details.group = 'dev';
			break;
		case 'Editor':
			shout_details.group = 'editor';
			break;
		case '':
			shout_details.group = 'member';
			break;
		default:
			shout_details.group = 'member';
			break;
	}
	shoutbox_box.innerHTML+='\
        <li class="' + shout_details.group + '">\
          <header>\
            <h6>' + shout_details.member + ' <span class="right">(' + shout_details.group + ')</span></h6>\
            <br class="clearfix" />\
          </header>\
          <p>' + shout_details.message + '</p>\
          <footer>\
            <em class="right">' + shout_details.date + '</em>\
          </footer>\
          <br class="clearfix" />\
        </li>';
	if(shoutbox_box.children.length>max_messages){
		shoutbox_box.removeChild(shoutbox_box.children[0]);
	}
	shoutbox_box.scrollTop=shoutbox_box.scrollHeight;
}
if(opera){
	opera.extension.onmessage=function(evt){write(JSON.parse(evt.data))};
}
if(chrome){
	chrome.extension.onRequest.addListener(write);
}
function post(mess){
	x=new XMLHttpRequest;
	x.open("GET","http://blazebyte.org/shoutbox/shoutbox.php?msg="+encode.url(mess));
	x.onreadystatechange=function(){
		if(x.readyState==4){
			emptyBeforeWrite=true;
			localStorage.setItem('shouts','[]')
		}
	}
	x.send(null);
}
encode={
	character: function(c) {
		return '%' + c.charCodeAt(0).toString(16);
	},

	url: function(s) {
		return encodeURIComponent( s ).replace( /\%20/g, '+' ).replace( /[!'()*~]/g, encode.character );
	}
}
