$(document).ready(function(){
	if(localStorage.getItem("chime")=="false"){
		$("#chime").removeAttr('checked');
	}
	$("#chime").click(save);
	
	function save(){
		localStorage.setItem('chime',$("#chime").is(':checked'));
	}
})
