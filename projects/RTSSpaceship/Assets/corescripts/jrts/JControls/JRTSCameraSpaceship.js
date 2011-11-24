/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var target : Transform;
var distance = 3.0;
var height = 3.0;
var damping = 5.0;
var smoothRotation = true;
var rotationDamping = 10.0;

var bcontrolview:boolean = false;

var bupdateship:boolean = false;
var bcheckship:boolean = true;

var playername:String = "";

function Update () {
	if (JRTSGamePlayer.bplayercontrol == false){
		return;
	}
	
	var oldplayername = JRTSGamePlayer.currentplayer;
	
	if( oldplayername != playername){
		var ships = FindObjectsOfType(JRTSSpaceshipUnit) as JRTSSpaceshipUnit[];
		for (ship in ships){
			if(ship.playername == oldplayername){
				target = ship.transform.root.transform;
				break;
			}
		}
		//print("update....");
		playername = JRTSGamePlayer.currentplayer;
	}

	if(target!=null){
		var wantedPosition = target.TransformPoint(0, height, -distance);
		transform.position = Vector3.Lerp (transform.position, wantedPosition, Time.deltaTime * damping);
	}

	if(target!=null){
		if (smoothRotation){
			var wantedRotation = Quaternion.LookRotation(target.position - transform.position, target.up);
			transform.rotation = Quaternion.Slerp (transform.rotation, wantedRotation, Time.deltaTime * rotationDamping);
		}
		else transform.LookAt (target, target.up);
	}
}