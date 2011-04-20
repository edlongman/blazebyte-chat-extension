if(!amplify.store('blazebyte').run){
	//first run or someone deleted the data
	amplify.store('blazebyte',{run:true,loggedIn:false});
}
popup={width:200,height:390};

