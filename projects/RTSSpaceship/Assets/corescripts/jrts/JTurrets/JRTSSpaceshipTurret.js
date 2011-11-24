var baseturret:Transform;
var target:Transform;
var bbot:boolean = true;
var projectileprefab:Transform;
var spawnpointbone:Transform;
var projectilespeed = 200;
var firerate:float = 1;
var firenext:float = 1;
var detecttarget:Transform;
var bfire:boolean = false;

function Update () {
	

}

//FixedUpdate
//This function is called every fixed framerate frame, if the MonoBehaviour is enabled.
//LateUpdate
//LateUpdate is called every frame, if the Behaviour is enabled.
//Update
//Update is called every frame, if the MonoBehaviour is enabled.

function LateUpdate(){
	if((bbot == true)){//&&(target !=null)){
		//var rotatetarget = Quaternion.LookRotation(target.position - baseturret.position);
		//baseturret.rotation = rotatetarget;
		if(detecttarget !=null){
			var detectobj = detecttarget.GetComponent(JRTSRadiusDetect);
			target = detectobj.target;
		}
		
		if(target != null){
			var rotatetarget = Quaternion.LookRotation(target.position - baseturret.position);
			baseturret.rotation = rotatetarget;
			bfire=true;
		}else{
			bfire = false;
		}
		
		var forward = baseturret.TransformDirection(Vector3.forward);
		//print("[>>>]"+forward);
		Debug.DrawRay (baseturret.position, forward * 1, Color.green);
		
		if((Time.time > firenext)&&(bfire == true)){
			firenext = Time.time + Random.Range(0, 2);
			spawnprojectile();
			//print("spawn projectiles...");
		}
	}
}

function spawnprojectile(){
	if(projectileprefab != null){
		var Bullet;
		if(spawnpointbone !=null){
			Bullet = Instantiate(projectileprefab,
										spawnpointbone.position, 
										baseturret.rotation);
		
		}
		else
		{
		Bullet = Instantiate(projectileprefab,
										transform.Find("spawnpoint").transform.position, 
										Quaternion.identity);
		}
		Bullet.rigidbody.useGravity=false;
		Bullet.rigidbody.AddForce(baseturret.forward * projectilespeed);
	}
}