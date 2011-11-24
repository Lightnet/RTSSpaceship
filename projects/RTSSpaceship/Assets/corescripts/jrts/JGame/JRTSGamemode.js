var gamemode:String = "rts";
var viewmode:String = "rts_ship";


function Start(){
	JRTSGameConfig.gamemode = gamemode;
	JRTSGameConfig.viewmode = viewmode;
}

function Update () {

	if(JRTSGamePlayer.bplayercontrol){
		//JRTSGameConfig.gamemode = gamemode;
		JRTSGameConfig.viewmode = "rts_ship";	
	}
	
	if(JRTSGamePlayer.bcommandcontrol){
		//JRTSGameConfig.gamemode = gamemode;
		JRTSGameConfig.viewmode = "rts_command";	
	}
	
	//print(JRTSGameConfig.viewmode);	
}