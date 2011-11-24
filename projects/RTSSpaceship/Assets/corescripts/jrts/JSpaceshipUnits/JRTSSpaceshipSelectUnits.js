/**
Project: Anime Maid Code
Game Type: RPG
Engine: Unity3D
Created by: Darknet
License: cc
http://creativecommons.org/licenses/by/3.0/

source code:http://animemaidcode.googlecode.com
*/
var headLook:Transform;
var hitlocalobj:Transform;
var busedobjecthit:boolean = false;
var offset = 1;
var cursorRay:Ray;
var firstpoint:Vector3 = new Vector3();
var secondpoint:Vector3 = new Vector3();
var bmousepress:boolean = false;
var plane : Plane = new Plane(Vector3.up, Vector3.zero);
var bleftshift:boolean = false;

var lastpos:Vector3 = new Vector3();
var lastrot;//:Vector3 = new Vector3();


function Start(){
	lastpos = transform.position;
	lastrot = transform.rotation;
	
	var units = JRTSSpaceshipUnit.units;
	for (i = 0; i < units.length;i++){
		rtsdataunit = units[i].GetComponent(JRTSSpaceshipUnit);
		if(rtsdataunit !=null){
			rtsdataunit.bselected = false;
		}		
	}
}


var bcommandcontrol:boolean = false;

// Update is called once per frame
function LateUpdate () {
	if(JRTSGamePlayer.bcommandcontrol == false){
		return;
	}
	var hitPointplane:Vector3 = new Vector3();
	cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	
	var ent : float = 100.0; 
	if (plane.Raycast(cursorRay, ent)){
		hitPointplane = cursorRay.GetPoint(ent);
		if(busedobjecthit){
			hitlocalobj.position = hitPointplane;
		}
	}
	
	if((Input.GetKeyDown("left shift"))&&(bleftshift == false)){
		print("shift key...");
		bleftshift = true;
	}
	
	if((Input.GetKeyUp("left shift")== true)){
		bleftshift = false;
	}
	
	if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
		firstpoint = hitPointplane;
		bmousepress = true;
		//print("left mouse is press");
		
		//print(hit.transform.name);
		//transform.GetComponent();
		if((bleftshift==true)&&(hit.transform!=null)){
			var spaceshipunit = hit.transform.GetComponent(JRTSSpaceshipUnit);
			if(spaceshipunit !=null){
				spaceshipunit.bselected = true;
			}
		}
	}else{
		bmousepress = false;
	}
	
	//secondpoint = hit.point;
	if(Input.GetMouseButtonUp(0)){
		secondpoint = hitPointplane;
		//print("dis: "+Vector3.Distance(firstpoint,secondpoint));
		if(Vector3.Distance(firstpoint,secondpoint) == 0){
			MoveSelectedUnits();
		}else{
			SelectedUnits();
		}
		
		//print(hit.transform.name);
	}
	Debug.DrawLine(firstpoint, secondpoint, Color.red);
}


function ResetCam(){
	transform.position = lastpos;
	transform.rotation = lastrot;
}

function MoveSelectedUnits(){
	//print("move units");
	var units = JRTSSpaceshipUnit.units;
	if(units !=null){
		for (var i = 0; i < units.length;i++){
			var jrtsunit = units[i].GetComponent(JRTSSpaceshipUnit);
			var rtsdataunit = units[i].GetComponent(JRTSSpaceshipUnitControl);
			if(jrtsunit.bselected){
				jrtsunit.move(firstpoint);
				if(rtsdataunit !=null){
					rtsdataunit.movetotargetpoint(firstpoint);
				}
			}
		}
	}
}

function SelectedUnits(){
	var min:Vector3 = Vector3();
	var max:Vector3 = Vector3();
	
	if(firstpoint.x > secondpoint.x){
		min.x = secondpoint.x;
		max.x = firstpoint.x;
	}else{
		min.x = firstpoint.x;
		max.x = secondpoint.x;
	}	
	if(firstpoint.y > secondpoint.y){
		min.y = secondpoint.y;
		max.y = firstpoint.y;
	}else{
		min.y = firstpoint.y;
		max.y = secondpoint.y;
	}
	
	if(firstpoint.z > secondpoint.z){
		min.z = secondpoint.z;
		max.z = firstpoint.z;
	}else{
		min.z = firstpoint.z;
		max.z = secondpoint.z;
	}
	//print(min + ":" + max);
	var units = JRTSSpaceshipUnit.units;
	
	if(units !=null){
		//print("checking..");
		if(bleftshift == false){
			for (var i = 0; i < units.length;i++){
				var rtsdataunit = units[i].GetComponent(JRTSSpaceshipUnit);
				if(rtsdataunit !=null){
					rtsdataunit.bselected = false;
					//print(rtsdataunit.rtsdata.name);
				}
			}
		}
		
		for (i = 0; i < units.length;i++){
			if((min.x <= units[i].position.x) &&(max.x >= units[i].position.x)&&
				/*(min.y <= units[i].position.y) &&(max.y >= units[i].position.y)&&*/
				(min.z <= units[i].position.z) &&(max.z >= units[i].position.z)){
				rtsdataunit = units[i].GetComponent(JRTSSpaceshipUnit);
				rtsdataunit.bselected = true;
				
				//print(rtsdataunit.rtsdata.name);
				//print("found it!");
			}else{
				rtsdataunit = units[i].GetComponent(JRTSSpaceshipUnit);
				rtsdataunit.bselected = false;
			}
		}
	}else{
		print("?");
	}
}

function OnGUI(){
	var units = JRTSSpaceshipUnit.units;
	if(units !=null){
		GUI.Label(Rect(0,0,150,20),"Units:"+units.length);
	}

	if(JRTSGamePlayer.bplayercontrol == true){
		if(GUI.Button(Rect(Screen.width - 140,0,140,20),"Commad Control")){
			JRTSGamePlayer.bplayercontrol = false;
			JRTSGamePlayer.bcommandcontrol = true;
			JRTSGamePlayer.ResetCommandCam();
		}
	}
	
	if(JRTSGamePlayer.bcommandcontrol == false){
		return;
	}
	
	if(GUI.Button(Rect(Screen.width - 140,0,140,20),"Player Control")){
		JRTSGamePlayer.bplayercontrol = true;
		JRTSGamePlayer.bcommandcontrol = false;
	}

	/*
	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	if(hit !=null){
		GUI.Label(Rect(0,20,150,20),"Point:"+hit.point);
	}
	*/
}

function OnDrawGizmosSelected () {
	/*
	var min:Vector3 = Vector3();
	var max:Vector3 = Vector3();
	
	if(firstpoint.x > secondpoint.x){
		min.x = secondpoint.x;
		max.x = firstpoint.x;
	}else{
		min.x = firstpoint.x;
		max.x = secondpoint.x;
	}	
	if(firstpoint.y > secondpoint.y){
		min.y = secondpoint.y;
		max.y = firstpoint.y;
	}else{
		min.y = firstpoint.y;
		max.y = secondpoint.y;
	}
	
	if(firstpoint.z > secondpoint.z){
		min.z = secondpoint.z;
		max.z = firstpoint.z;
	}else{
		min.z = firstpoint.z;
		max.z = secondpoint.z;
	}
	var average:Vector3 = new Vector( ((min.x+max.x)/2),((min.y+max.y)/2),((min.z+max.z)/2)  );
	// Draw a semitransparent blue cube at the transforms position
	Gizmos.color = Color (1,0,0,.5);
	//Gizmos.DrawCube (new Vector3 (1,1,1), Vector3 (1,1,1));
	//Gizmos.DrawCube (secondpoint, Vector3 (1,1,1));
	
	var planegrid:Vector3 = new Vector3();
	var hitPointplane;
	cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	
	var ent : float = 100.0; 
	if (plane.Raycast(cursorRay, ent)){
		planegrid = cursorRay.GetPoint(ent);
	}
	
	Gizmos.DrawCube (firstpoint, average);
	*/
	Gizmos.color = Color (1,0,0,.5);
	Gizmos.DrawCube (secondpoint, Vector3(1,1,1));
}


