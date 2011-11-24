/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var turretname:String = "None";
var bcontrol:boolean = false;
var objectdetect:Transform;
var bindependent:boolean = false;
var b2dfixedrotate:boolean = true;
var objdetectcontroller;
var objpitch:Transform;
var pichtypedir:String = "";
var objyaw:Transform;
var yawtypedir:String = "";
var yaw_fixedrot:float = 0;
var objrot:Transform;
var weaponholder:Transform;
var target:Transform;

var weaponhandler:Transform;
var weaponhandle:Transform;
var weaponcontroller;
var mainship:Transform;
var handle:Transform;

var manualfire:boolean = false;
var bautofire:boolean = true;
var turnspeed:float = 60;

function Start(){
	if(weaponhandler){
		weaponhandle = Instantiate(weaponhandler);
		if(weaponhandle !=null){
			weaponhandle.transform.parent = weaponholder;
			weaponhandle.transform.position = weaponholder.transform.position;
			weaponhandle.transform.rotation = weaponholder.transform.rotation;
			weaponcontroller = weaponhandle.transform.GetComponent(jRTSSpaceUnitTurretWeaponHandle);
			if(weaponcontroller !=null){
				weaponcontroller.objectunit = transform;
				weaponcontroller.rotobj = objpitch;
				weaponcontroller.SetMainShip(mainship);
			}
		}
	}
	
	if(objectdetect !=null){
		objdetectcontroller = objectdetect.transform.GetComponent(JRTSRadiusDetect);
	}
}


function LateUpdate () {

	//objyaw.transform.Rotate(turnspeed,0,0);
	
	if(objdetectcontroller !=null){
		//if(objdetectcontroller.target !=null){
			target = objdetectcontroller.target;
		//}else{
			//target = null;
		//}
		//objyaw.transform.Rotate(turnspeed * Time.deltaTime,0,0);
	}	

	
	if(bindependent){
		if(target !=null ){
			//need to fixed the flip
			//print("update control rotate");
			var targetDirection : Vector3 = objpitch.InverseTransformPoint(target.transform.position);
			targetDirection.y = 0;
			targetDirection = objpitch.TransformPoint(targetDirection);
			objpitch.LookAt(targetDirection, objpitch.up);
	
	
			var targetRelative = objyaw.transform.InverseTransformPoint(target.transform.position);

			//y section
			//print(targetRelative.x);
    		//if (targetRelative.x > 0){     
       			//transform.Rotate(0,turnspeed * Time.deltaTime,0);
			//}
			//else{
       			//transform.Rotate(0,turnspeed * Time.deltaTime*-1,0);
    		//}

			//x section
			//print(targetRelative.x);
			if (targetRelative.y < 0 - yaw_fixedrot){
       			objyaw.transform.Rotate(turnspeed * Time.deltaTime,0,0);
       			//objyaw.transform.Rotate(turnspeed,0,0);
       			//print("update...");
			}else if (targetRelative.y > 0 + yaw_fixedrot){
       			objyaw.transform.Rotate(turnspeed * Time.deltaTime*-1,0,0);
       			//objyaw.transform.Rotate(-turnspeed,0,0);
       			//print("update...");
    		}else{
    			//objyaw.transform.Rotate(turnspeed * Time.deltaTime*-1,0,0);	
    		}
	
			//==============
			//other
			//==============

			//first you need direction to target (now you are using transform.position in angle calculation)
			//Vector3 relative_pos = target_transform.position - transform.position;

			//float angle = Mathf.Atan2(relative_pos.y, relative_pos.x) * Mathf.Rad2Deg;


			//you want to change only rotation around Z axis 
			//transform.eulerAngles.z = Mathf.LerpAngle(transform.eulerAngles.z, angle, Time.deltaTime * 1.0f);
	
			//var relative_pos = objdetectcontroller.target.transform.position - objyaw.transform.position;
	
			//transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, angle, 0), Time.deltaTime * 1.0F);
			
			//targetDirection = objyaw.InverseTransformPoint(objdetectcontroller.target.transform.position);
			//targetDirection.x = 0;
			//targetDirection = objyaw.TransformPoint(targetDirection);
			//objyaw.LookAt(targetDirection, objyaw.up);	

			if(target !=null){
				weaponcontroller.bfire = true;
			}else{
				weaponcontroller.bfire = false;
			}
									
		}
	}else{
		if(target !=null){
			var rotation = Quaternion.LookRotation(target.transform.position - objpitch.transform.position);
			objpitch.transform.rotation = rotation;
		}
	}
	//check if the contoller handler is there
}

function SetMainShip(obj:Transform){
	mainship = obj;
}