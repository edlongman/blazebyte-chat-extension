$(document).ready(function(){
	localStorage.setItem('iconState','stop');
	logincheck();
});
function logincheck(){
	if(localStorage.getItem('loggedin')=="true"){
		init();
	}
	else{
		$(".shoutbox-content").html("You must be logged in to ues the shoutbox.<br/><a href='http://blazebyte.org/community/ucp.php?mode=login' target='blank'>Click here</a> to sign in or register")
		$("#shout-msg").hide();
	}
}
function init(){
	$('#shout-msg').keyup(function(e) {
		//alert(e.keyCode);
		if(e.keyCode == 13) {
			var shoutMessage = $("#shout-msg").val();
	        if (shoutMessage) {
	            $.post("http://blazebyte.org/shoutbox/shout.php", { message: shoutMessage });
	            $("#shout-msg").val("");
	        }
		}
	});
	refreshshouts();
	$(".shoutbox-content").scrollTop($(".shoutbox-content")[0].scrollHeight);
	setInterval(refreshshouts,500);
}
function refreshshouts(){
	$("last-shout-date").html(localStorage.getItem('lastdate'));
	var scrollDiff=$(".shoutbox-content")[0].scrollHeight-$('.shoutbox-content').scrollTop();
	$(".shoutbox-content").html(localStorage.getItem('shouts'));
	
	if(scrollDiff<=250){
		$(".shoutbox-content").scrollTop($(".shoutbox-content")[0].scrollHeight);
	}
}
$(window).on('unload', function(){
	localStorage.setItem('iconState','normal');
});


