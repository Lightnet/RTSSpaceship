

var prefabdeployobj:Transform;
var holderdeployobj:Transform;

var deploylist:Array = new Array();
var deploymax:int = 1;

var deploytime:float = 0;
var deploynext:float = 2;

var bfire:boolean = false;
var breadyfire:boolean = false;

var bdelay:boolean = false;
var weaponinfo;

var prefabcount:int = 0;
var caplimit:int = 0;

function Start(){
	//if(prefabdeployobj !=null){
		//holderdeployobj = Instantiate(prefabdeployobj,transform.position,transform.rotation);
		//holderdeployobj.transform.gameObject.SetActiveRecursively(false);
	//}
	CheckPrefab();
}



function Update () {
	prefabcount = deploylist.length;
	if((Input.GetMouseButtonDown(0) ==true)&&Time.time > deploytime){
		breadyfire = true;
	}
	
	if((breadyfire == true)&&(Time.time > deploytime)&&(bfire == false)){
		bfire = true;
		deploytime = deploynext + Time.time;
		breadyfire = false;
		SpawnDeployUnit();
	}

	if((Time.time > deploytime)&&(bfire == true)){
		bfire = false;
	}
}

function CheckPrefab(){
	if(holderdeployobj == null){
		holderdeployobj = Instantiate(prefabdeployobj,transform.position,transform.rotation);
		var projectileunitinfo = holderdeployobj.transform.GetComponent(JRTSProjectileUnit);
		var partinfo = transform.GetComponent(JRTSPartModule);
		if((partinfo !=null)&&(projectileunitinfo !=null)){
			projectileunitinfo.unit = partinfo.unit;
		
		}
		holderdeployobj.transform.gameObject.SetActiveRecursively(false);
	}
}


function SpawnDeployUnit(){

	CheckPrefab();
	
	if(prefabdeployobj != null){
		//CheckDeployNull();
		var deployobjtmp = Instantiate(holderdeployobj,transform.position,transform.rotation);
		if(deployobjtmp != null){
		//var deploydata = deployobjtmp.transform.GetComponent(JRTSDeploy);
		//if(deploydata !=null){
			//deploydata.SetDeploy();
		//}
		deploylist.push(deployobjtmp);
		}
	}		
}


function CheckDeployNull(){
	while(true){
		var checkcount:int = 0;
		for (var i = 0; i < deploylist.length;i++){
			if(deploylist == null){
				deploylist.RemoveAt(i);
				break;
			}
			checkcount += 1;
		}
		
		if(checkcount == deploylist.length){
			break;		
		}	
	}
	return deploylist.length;
}

