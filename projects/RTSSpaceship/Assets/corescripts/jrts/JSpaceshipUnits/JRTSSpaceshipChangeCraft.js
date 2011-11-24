/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var ships:JRTSSpaceshipUnit[];
var numberships: int = 0;
var scrollViewVector : Vector2 = Vector2.zero;

function Start(){
	CheckShipList();
	if(ships.length > 0){
		JRTSGamePlayer.currentplayer = ships[0].playername;
	}
}

/*
function Update(){
	if(ships !=null){
		if(ships.length != numberships){
		
		
		}
	}
}
*/

function OnGUI(){
	if(numberships !=ships.length){
		CheckShipList();		

	}

	var itemheight = ships.length *20;
	GUI.Box(Rect(Screen.width - 135,40,135,180),"Control Ship");
	GUI.Label(Rect(Screen.width - 135,40+20,135,180),JRTSGamePlayer.currentplayer);
	
	scrollViewVector = GUI.BeginScrollView (Rect (Screen.width - 135, 40+20+20, 135, 180), scrollViewVector, Rect (0, 0, 100, itemheight));
	var buttoncount = 0;
	for(ship in ships){
		if(JRTSGamePlayer.currentplayer != ship.playername){
			if(GUI.Button(Rect(0,20*buttoncount ,100,20),ship.playername)){
				JRTSGamePlayer.currentplayer = ship.playername;
			}
			buttoncount += 1;
		}
	}	
	GUI.EndScrollView();
}

function CheckShipList(){
	ships = FindObjectsOfType(JRTSSpaceshipUnit) as JRTSSpaceshipUnit[];
	numberships = ships.length;
}