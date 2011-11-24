var projectileprefab:Transform;
var prefabholderprojectile:Transform;
var spawnpoint:Transform;
var objectunit:Transform;
var firetime:float = 0;
var firetimecaps:float = 2;
var bfire:boolean = false;
var projectilespeed:float = 200;

var pitchobj:Transform;
var yawobj:Transform;
var rotobj:Transform;

//var weaponattack:float = 0;
var attack:float = 0;
var mainship:Transform;


function SetMainShip(obj:Transform){
	mainship = obj;
}

function Start(){
	prefabholderprojectile = Instantiate(projectileprefab,spawnpoint.transform.position,spawnpoint.transform.rotation);
	prefabholderprojectile.transform.gameObject.SetActiveRecursively(false);
	prefabholderprojectile.parent = transform;
}

function Update () {

}

function LateUpdate(){
	if((Time.time > firetime)&&(bfire)){
		firetime = Time.time + firetimecaps;
		if(projectileprefab !=null){
			if(spawnpoint !=null){
				var objproectile = Instantiate(projectileprefab,
														spawnpoint.transform.position,
														spawnpoint.transform.rotation);
														
				var groundprojecitle = objproectile.transform.GetComponent(JRTSSpaceshipProjectile);
				var unitobject = objectunit.transform.GetComponent(JRTSUnit);
				if((groundprojecitle !=null)&&(unitobject !=null)){
					groundprojecitle.teamid = unitobject.rtsdata.teamid;
					groundprojecitle.unitobj = objectunit.transform.root.transform;
					groundprojecitle.weaponattack = attack;
				}				
				objproectile.rigidbody.useGravity=false;
				//objproectile.rigidbody.AddForce(rotobj.transform.forward * projectilespeed);
				objproectile.rigidbody.AddForce(transform.forward * projectilespeed);
			}
		}
	}
}