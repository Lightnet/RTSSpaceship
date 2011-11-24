var objectdetect:Transform;
var objdetectcontroller;
var objpitch:Transform;
var objyaw:Transform;
var objrot:Transform;
var weaponholder:Transform;
var target:Transform;

var weaponhandler:Transform;
var weaponhandle:Transform;
var weaponcontroller;


function Start(){
	if(weaponhandler){
		weaponhandle = Instantiate(weaponhandler);
		if(weaponhandle !=null){
			weaponhandle.transform.parent = weaponholder;
			weaponhandle.transform.position = weaponholder.transform.position;
			weaponhandle.transform.rotation = weaponholder.transform.rotation;
			weaponcontroller = weaponhandle.transform.GetComponent(jRTSGroundUnitTurretWeaponHandle);
			if(weaponcontroller !=null){
				weaponcontroller.objectunit = transform;
				weaponcontroller.rotobj = objpitch;
			}
			//weaponcontroller = weaponhandle.transform.GetComponent(jRTSGroundUnitWeaponHandle);
		}
	}
	
	if(objectdetect !=null){
		objdetectcontroller = objectdetect.transform.GetComponent(jRTSGroundUnitDetects);
	}
}


function Update () {

	if(target !=null){
		var rotation = Quaternion.LookRotation(target.transform.position - objpitch.transform.position);
		objpitch.transform.rotation = rotation;
	}
	
	if(objdetectcontroller.target !=null){
		target = objdetectcontroller.target;
	}else{
		target = null;
	}
	
	
	if(target !=null){
		weaponcontroller.bfire = true;
	}else{
		weaponcontroller.bfire = false;
	}
}
