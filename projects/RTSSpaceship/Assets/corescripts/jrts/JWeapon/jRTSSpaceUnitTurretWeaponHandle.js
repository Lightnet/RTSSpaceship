var turretname:String = "None";

var projectileprefab:Transform;
var prefabholderprojectile:Transform;
var spawnpoint:Transform;
var objectunit:Transform;
var firetime:float = 0;
var firetimecaps:float = 2;
var bfire:boolean = false;
var bautofire:boolean = true;
var manualfire:boolean = false;

var projectilespeed:float = 200;

var pitchobj:Transform;
var yawobj:Transform;
var rotobj:Transform;

//var weaponattack:float = 0;
var attack:float = 0;
var mainship:Transform;
var turretinfo;

var rts_unit:JRTSSpaceshipUnit;

function SetMainShip(obj:Transform){
	mainship = obj;
}

function Start(){
	rts_unit = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	
	ReBuildProjectile();
	
	//controler unit for
	if(objectunit !=null){
		turretinfo = objectunit.transform.GetComponent(JRTSStationTurret);	
	}	
}

function LateUpdate()
{
	if(turretinfo !=null){
		bautofire = turretinfo.bautofire;	
		
		if(turretinfo.manualfire == true){
			manualfire = turretinfo.manualfire;
			turretinfo.manualfire = false;
		}
		ReBuildProjectile();
	}

	if(((Time.time > firetime)&&(bfire == true)&&(bautofire == true))||(Time.time > firetime)&&(manualfire == true)){
		firetime = Time.time + firetimecaps;
		if(prefabholderprojectile !=null){
			if(spawnpoint !=null){
				//if prefab is disappear due to loading and exit map, gate, ship bay, and teleport.
				if(prefabholderprojectile == null){
					ReBuildProjectile();				
				}
						
				var objproectile = Instantiate(prefabholderprojectile,
														spawnpoint.transform.position,
														spawnpoint.transform.rotation);
				
				var groundprojecitle = objproectile.transform.GetComponent(JRTSSpaceshipProjectile);
				var unitobject = objectunit.transform.GetComponent(JRTSSpaceshipUnit);
				if((groundprojecitle !=null)&&(unitobject !=null)){
					groundprojecitle.weaponattack = attack;
				}				
				objproectile.rigidbody.useGravity=false;
				//objproectile.rigidbody.AddForce(rotobj.transform.forward * projectilespeed);
				objproectile.rigidbody.AddForce(transform.forward * projectilespeed);
			}
		}
		manualfire = false;
	}
}

function ReBuildProjectile(){
	if(prefabholderprojectile == null){
		prefabholderprojectile = Instantiate(projectileprefab,spawnpoint.transform.position,spawnpoint.transform.rotation);
		if(prefabholderprojectile !=null){
			var projinfo:JRTSSpaceshipProjectile = prefabholderprojectile.transform.GetComponent(JRTSSpaceshipProjectile);
			projinfo.teamid = rts_unit.teamid;	
			//print("team id set..."+ rts_unit.teamid);
		}
			
		prefabholderprojectile.transform.gameObject.SetActiveRecursively(false);
		prefabholderprojectile.parent = transform;
	}else{
		//print("error");
	}
}