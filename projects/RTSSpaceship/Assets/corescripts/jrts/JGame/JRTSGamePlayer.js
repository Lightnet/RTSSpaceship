/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


static var currentplayer:String = "player";

static var bplayercontrol:boolean = true;
static var bcommandcontrol:boolean = false;
//static var bcommanderview:boolean = false;
//static var bplayerview:boolean = false;
//static var bstationview:boolean = false;

var _bplayercontrol:boolean = false;
var _bcommandcontrol:boolean = false;
var boverride:boolean = false;

function Update () {
	if(boverride == true){
		bplayercontrol = _bplayercontrol;
		bcommandcontrol = _bcommandcontrol;
	}else{
		_bplayercontrol = bplayercontrol;
		_bcommandcontrol = bcommandcontrol;
	}
}


function OnGUI(){
	//GUI.Label(new Rect(0,20,500,20) ,("bplayercontrol:"+ bplayercontrol + " =" + "bcommandcontrol:" + bcommandcontrol ));
}

static function ResetCommandCam(){
	var CommandCam = FindObjectOfType(JRTSSpaceshipCameraControl);
	if(CommandCam !=null){
		CommandCam.ResetCam();
		//print("found cam");
	}else{
		//print("not found cam");
	}
}

static function GetCurrentPlayerName(){

}