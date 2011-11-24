/*
Information: this deal with ship docking check
*/
var spaceship:Transform;
var bexit:boolean = true;
var bentry:boolean = true;

function OnTriggerEnter(other : Collider){
	//print("Trigger !");
	if(other.transform.root.transform !=transform.root.transform){
		var carriership = transform.root.transform.GetComponent(JRTSSpaceshipCarrier);
		var ship = other.transform.root.GetComponent(JRTSSpaceshipUnit);
		var shiphull = other.transform.GetComponent(JRTSSpaceshipHullTrigger);
		print(other.transform.name);
		if((ship != null)&&(shiphull !=null)){
			if((ship.blaunched == false )&&(carriership.holdshipcaps > carriership.dockships.length)&&(ship.shipsizeint < carriership.shipsizeint )){
				print("docking ship....");
				ship.blaunched = true;
				other.transform.root.transform.rigidbody.velocity= Vector3.zero;
				other.transform.root.transform.gameObject.SetActiveRecursively(false);
				carriership.dockships.Push(other.transform.root.transform);
			}else{
				//print("ship full...");
			}
		}else{
			//print("error");
		}
	}
}

function OnTriggerExit (other : Collider) {
	var ship = other.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	var shiphull = other.transform.GetComponent(JRTSSpaceshipHullTrigger);
	if((ship != null)&&(shiphull !=null)){
		ship.blaunched = false;
	}
}
/*
function Update () {

}
*/