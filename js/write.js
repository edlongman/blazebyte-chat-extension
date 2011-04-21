function writeAll(){
	shouts=JSON.parse(localStorage.getItem('shouts'));
	for(var i=shouts.length-1;i>=0;i--){
		writeShout(shouts[i]);
	}
}
function write(newShouts){
	shouts=JSON.parse(localStorage.getItem('shouts'));
	for(var i=newShouts.length-1;i>=0;i--){
		writeShout(newShouts[i]);
	}
}
function writeShout(shout_details){
	shoutbox_box=document.getElementById('shouts');
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
		shoutbox_box.children[0].removeNode();
	}
}