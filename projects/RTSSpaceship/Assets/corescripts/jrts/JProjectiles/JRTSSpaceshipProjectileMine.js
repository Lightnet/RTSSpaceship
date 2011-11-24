var teamid:int;
var unitobj:Transform;
var weaponattack:float = 0;
var attack:float = 0;
//var weapondamge:float = 0;
var damage:float = 0;
var speed:float = 500;
var Anglefollow:float = 10;

var bfollow:boolean = false;
var bdelay:boolean = false;
var turnspeed:float = 100;
var target:Transform;

var collisiondetect:Transform;
var objdetect;
var bdeplpy:boolean = true;
var deploytime:float = 0;
var deploytimenext:float = 5;
var rangedetect:float = 2;


function SetDeploy(){
	bdeplpy = true;
	deploytime = deploytimenext + Time.time;
}

function Start(){
	if(unitobj !=null){
		var teaminfo = unitobj.transform.GetComponent(JRTSSpaceshipUnit);
		if(teaminfo !=null){
			teamid = teaminfo.teamid;
		}else{
			print("error team asign!");
		
		}
	}
	
	if(rigidbody !=null){	
		rigidbody.AddRelativeForce(transform.forward * speed * Time.deltaTime);
	}
	
	if(bdeplpy){
		deploytime = deploytimenext + Time.time;
	}
	
	objdetect = collisiondetect.transform.GetComponent(JRTSRadiusDetect);
	
}

function Update(){


	//if(objdetect !=null){
		//target = objdetect.target;	
	//}

	if(bfollow){
		if(target !=null){
			var targetpoint = target.transform.position;
			var rotatetarget = Quaternion.LookRotation( targetpoint - transform.position);
			var setdirection:Vector3 = rotatetarget.eulerAngles;
			var currentdirection:Vector3 = transform.rotation.eulerAngles;
	
			var angley:float = 0;
			//var angley1 = 360 - setdirection.y + currentdirection.y;
			//var angley2 = currentdirection.y - setdirection.y;
			if(setdirection.y > currentdirection.y)
			{
				angley1 = (360 - setdirection.y) + currentdirection.y;
				angley2 =  setdirection.y - currentdirection.y;
				//print("hello?");
				if( (angley2 < 180)&&(angley2 > Anglefollow)){
					turn = turnspeed;
				}else if((angley1 < 180)&&(angley1 > Anglefollow)){
					turn = -turnspeed;
				}else{
					turn = 0;
				}
			}else{
				angley1 = (360 - currentdirection.y) + setdirection.y;
				angley2 =  currentdirection.y - setdirection.y;
				if ((angley2 < 180)&&(angley2 > Anglefollow)){
					turn = -turnspeed;
				}else if((angley1 < 180)&&(angley1 > Anglefollow)){
					turn = turnspeed;
				}else{
					turn = 0;
				}
			}
			
			if(rigidbody !=null){
				rigidbody.AddRelativeTorque(Vector3.up * turn * Time.deltaTime);
				rigidbody.AddRelativeForce(transform.forward * speed * Time.deltaTime);
			}		
		}		
	}
	
	if(bdeplpy){
		if(deploytime > Time.time){
			rigidbody.AddRelativeForce(transform.forward * speed * Time.deltaTime);
		}else{
			rigidbody.velocity = Vector3.zero;
			bdeplpy = false;
		}
	}
}

function OnTriggerEnter(other : Collider)
{
	var shiphull = other.transform.GetComponent(JRTSSpaceshipHullTrigger);
	if((unitobj != other.transform.root.transform)&&(shiphull != null)){
		//print(collision.transform.name);
		//print("hit");
		var objunit = other.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
		if(objunit !=null){
			damage = weaponattack + attack;
			if(objunit.teamid == teamid){
				//damage = weaponattack + attack;
				//objunit.rtsdata.health -= damage;
				//Destroy(gameObject);
			}else{
				objunit.healthpoints -= damage;
				Destroy(gameObject);
				//print("hit");
			}
			//print("hit unit" + other.transform.root.transform.name);
			//Destroy(gameObject);
		}else{
			//print("error");
		}
		//print("hit");
	}	
}
