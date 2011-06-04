if(!localStorage.getItem('run')){
	//first run or someone deleted the data
	localStorage.setItem('run',true);
}
Shoutbox={};
shouts=JSON.parse(localStorage.getItem('shouts'));
popup={width:200,height:390};
reloadTime=3500
max_messages=15;