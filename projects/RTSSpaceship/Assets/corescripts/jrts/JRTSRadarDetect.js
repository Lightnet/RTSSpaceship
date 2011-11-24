/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var target:Transform;
var teamid:int;
var busedroot:boolean = true;
//var teamunit:JRTSSpaceshipUnit;

function Start(){
/*  //it doesn't really get the id team right since it spawn with the after it created
	var teamunit = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	if(teamunit !=null){
		teamid = teamunit.rtsdata.teamid;
		
	}else{
	
	}
*/
	//print("TEAM SET:"+teamid);
}

function OnTriggerEnter (other : Collider) {
	//print(other.transform.name);
	//print("detected");
	//Destroy(other.gameObject);
	if((target == null)&&(other.transform.root.transform != transform.root.transform)){
		var objshiphull = other.transform.GetComponent(JRTSSpaceshipHullTrigger);
		if(objshiphull != null){
			var shipinfo = other.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
			//make sure the detect only ships
			if(shipinfo !=null){
				var teamunit;
				if(busedroot){
					teamunit = transform.root.transform.GetComponent(JRTSSpaceshipUnit);//make sure it right team id
					//print("root");
				}else{
					var projectileunitinfo = transform.root.GetComponent(JRTSProjectileUnit);
					if(projectileunitinfo !=null){//this is for project unit
						teamunit = projectileunitinfo.unit.transform.GetComponent(JRTSSpaceshipUnit);
						//print("projectileunitinfo");
					}
					//print("not root");
				}
				//print("shipinfo.teamid:"+shipinfo.teamid);
				//print("teamunit.teamid:"+teamunit.teamid);
				if((shipinfo.teamid != teamunit.teamid)){					
					//print("TEAM:"+ team.rtsdata.teamid + " OTHER TEAM:"+ teamid);
					target = other.transform.root.transform;
				}
			}
		}
	}
}

function OnTriggerStay (other : Collider) {
	//if (other.attachedRigidbody) {
	//other.attachedRigidbody.AddForce(Vector3.up * 10);
	//}
	//print("stay");
}

function OnTriggerExit (other : Collider) {
//Destroy(other.gameObject);
	if(target !=null){
		if(target.root.transform == other.transform.root.transform){
			target =null;
		}
	}
}

function Update () {

}