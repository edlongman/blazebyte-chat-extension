if(!localStorage.getItem('run')){
	//first run or someone deleted the data
	localStorage.setItem('run',true);
}
shouts=localStorage.getItem('shouts');
popup={width:200,height:390};