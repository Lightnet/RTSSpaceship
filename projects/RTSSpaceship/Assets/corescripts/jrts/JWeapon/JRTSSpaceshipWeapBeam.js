var bfire:boolean = false;

var breadyfire:boolean = false;

var firerange:float = 10;
var line3d;
var postionpoint;

var firetime:float = 0;
var firenext:float = 3;

var rechargetime:float = 0;
var rechargenext:float = 0;

function Start(){
	line3d = transform.GetComponent(LineRenderer);
	if(line3d !=null){
		line3d.SetVertexCount (2);
	}
}

function Update () {

	if((breadyfire == true)&&(firetime <= Time.time)&&(rechargetime <= Time.time)&&(bfire == false)){
		bfire = true;
		firetime = firenext + Time.time;
		rechargetime = rechargenext + firenext + Time.time;
		breadyfire = false;
	}

	if((bfire == true)&&(Time.time < firetime)){
		var hit : RaycastHit;
		var fwd = transform.TransformDirection (Vector3.forward);
		var ray = new Ray (transform.position,fwd);
		
		if (Physics.Raycast(ray, hit,firerange)) {
			//print ("There is something in front of the object!");
			if(line3d != null){
				line3d.SetPosition (0, transform.position);
				line3d.SetPosition (1, hit.point);
			}
			print(hit.point);
			Debug.DrawLine (ray.origin, hit.point);
		}else{
			//if there no hit location use the max ranage for now
			if(line3d != null){
				line3d.SetPosition (0, transform.position);
				line3d.SetPosition (1, fwd*firerange);
			}
		
		}
	}else{
		if(line3d != null){
			line3d.SetPosition (0, transform.position);
			line3d.SetPosition (1, transform.position);
		}
	}
	
	if((bfire == true)&&(Time.time > firetime)&&(Time.time > rechargetime)){
		bfire = false;
	}
}

//function OnDrawGizmos(){
	//Debug.DrawLine (transform.position, postionpoint);
//}


function fire(){
	breadyfire = true;
}