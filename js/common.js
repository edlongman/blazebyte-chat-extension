if(!amplify.store('run')){
	//first run or someone deleted the data
	amplify.store('run',true);
}
Shoutbox={};
shouts=amplify.store('shouts');
popup={width:200,height:390};
reloadTime=3500
max_messages=15;

