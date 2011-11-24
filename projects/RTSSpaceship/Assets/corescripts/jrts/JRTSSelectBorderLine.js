/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var cursorRay:Ray;
var firstpoint:Vector3 = new Vector3();
var secondpoint:Vector3 = new Vector3();
var bmousepress:boolean = false;
var plane : Plane = new Plane(Vector3.up, Vector3.zero);
var line3d;
var min:Vector3 = Vector3();
var max:Vector3 = Vector3();

function Start(){
	line3d = transform.GetComponent(LineRenderer);
	if(line3d !=null){
		line3d.SetVertexCount (5);
	}
}

function LateUpdate(){
	if((JRTSGamePlayer.bcommandcontrol== false)){
		return;
	}
	var hitPointplane:Vector3 = new Vector3();
	cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	//Plane.Raycast(cursorRay, hit);
	
	var ent : float = 100.0; 
	if (plane.Raycast(cursorRay, ent)){
		hitPointplane = cursorRay.GetPoint(ent);
	}
	
	if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
		firstpoint = hitPointplane;
		bmousepress = true;
	}
	
	if(bmousepress){
		secondpoint = hitPointplane;
	}

	if(Input.GetMouseButtonUp(0)){
		bmousepress= false;
	}
	
	if(bmousepress == false){
		if(line3d != null){
			line3d.SetPosition (0, Vector3(0,0,0));
			line3d.SetPosition (1, Vector3(0,0,0));
			line3d.SetPosition (2, Vector3(0,0,0));
			line3d.SetPosition (3, Vector3(0,0,0));
			line3d.SetPosition (4, Vector3(0,0,0));
		}
	}
}

function Update () {
	if((JRTSGamePlayer.bcommandcontrol== false)){
		return;
	}
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
	
	if(line3d !=null){
		line3d.SetPosition (0, Vector3(min.x,0,min.z));
		line3d.SetPosition (1, Vector3(min.x,0,max.z));
		line3d.SetPosition (2, Vector3(max.x,0,max.z));
		line3d.SetPosition (3, Vector3(max.x,0,min.z));
		line3d.SetPosition (4, Vector3(min.x,0,min.z));
	}
}
