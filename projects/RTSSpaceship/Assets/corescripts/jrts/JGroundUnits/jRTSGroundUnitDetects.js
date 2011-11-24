var target:Transform;
var teamid:int;
var objunit:Transform;

function Start(){
	if(objunit !=null){
		var unitobj = objunit.transform.GetComponent(JRTSUnit);
		teamid = unitobj.rtsdata.teamid;
	}
}

function OnTriggerStay (other : Collider) {
	//print("trigger..."+other.transform.name);
	if(target ==null){
		if((other.transform !=null)&&(target ==null)&&(other.transform != transform.root.transform)){
			var junit = other.transform.GetComponent(JRTSUnit);
			if((junit !=null)){
				if(junit.rtsdata.teamid != teamid){
					target = other.transform;
				}else{
					target = other.transform;
				}
			}
		}
	}
}

function OnTriggerExit(other : Collider){
	if(other.transform == target){
		target=null;
	}
}


function Update () {
}