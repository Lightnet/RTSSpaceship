var weaponname:String = "None";

var projectileprefab:Transform;
var prefabholderprojectile:Transform;
var bcontrolplayer:boolean = false;
var projectilespeed = 200;
var weaponIdx:int = 0;
var bfire:boolean = false;
var autofire:boolean = false;

var firerate = 0.5;
var firenext = 0;
//need to assgin a spaceship unit
var bcontroltest:boolean = false;

var bbeam:boolean = false;
var beaminfo;
var target:Transform;

function Start(){
	prefabholderprojectile = Instantiate(projectileprefab,
										transform.Find("spawnpoint").transform.position, 
										Quaternion.identity);
	if(prefabholderprojectile !=null){
		prefabholderprojectile.transform.gameObject.SetActiveRecursively(false);
		prefabholderprojectile.parent = transform;
		var projectileinfo = prefabholderprojectile.transform.GetComponent(JRTSSpaceshipProjectile);
		projectileinfo.unitobj = transform.root.transform;		
	}
	
	if(bbeam){
		//gameObject.AddComponent(Rigidbody);
		rigidbody.useGravity = false;
		beaminfo = transform.GetComponent(JRTSSpaceshipWeapBeam);	
	}
}

function Update(){
	if(bbeam){

	}else{
		if(prefabholderprojectile !=null){
			if(prefabholderprojectile.transform.gameObject.active == true){//this will disable on spawn or lanuching check
				prefabholderprojectile.transform.gameObject.SetActiveRecursively(false);		
			}
		}else{//if projectile is null respawn it
			RespawnProjectile();
		}
	}
}

function RespawnProjectile(){//create a new projectiles since there life time destory events
	if(prefabholderprojectile == null){
		prefabholderprojectile = Instantiate(projectileprefab,
										transform.Find("spawnpoint").transform.position, 
										Quaternion.identity);
		if(prefabholderprojectile !=null){
			prefabholderprojectile.transform.gameObject.SetActiveRecursively(false);
			prefabholderprojectile.parent = transform;
			var projectileinfo = prefabholderprojectile.transform.GetComponent(JRTSSpaceshipProjectile);
			projectileinfo.unitobj = transform.root.transform;		
		}
	}
}

function FixedUpdate(){
	
	if(bcontroltest){
		if(bbeam){
			if((Input.GetMouseButtonDown(0) ==true)&&Time.time > firenext){
				if(beaminfo !=null){
					beaminfo.fire();
				}
			}
		}else{		
			if((Input.GetMouseButtonDown(0) ==true)&&Time.time > firenext){
				firenext = Time.time + firerate;
				spawnprojectile();
				//print("spawn projectiles...");
			}
		}
	}
	
	if(bcontrolplayer){
		if((bfire ==true)&&(Time.time > firenext)){
			firenext = Time.time + firerate;
			spawnprojectile();
			//print("spawn projectiles...");
		}
	}
}

function spawnprojectile(){
	if(prefabholderprojectile != null){
		var Bullet = Instantiate(prefabholderprojectile,
										transform.Find("spawnpoint").transform.position, 
										transform.rotation);
	
		Bullet.rigidbody.useGravity =false;
		Bullet.rigidbody.AddForce(transform.forward * projectilespeed);
	}else{
		RespawnProjectile();
	}
}


function StartFire(){}

function StopFire(){}

function HoldFire(){}

function ReleaseFire(){}



