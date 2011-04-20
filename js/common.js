if(!amplify.store('run')){
	//first run or someone deleted the data
	amplify.store('run',true);
}
Shoutbox={};
shouts=amplify.store('shouts');
popup={width:200,height:390};

