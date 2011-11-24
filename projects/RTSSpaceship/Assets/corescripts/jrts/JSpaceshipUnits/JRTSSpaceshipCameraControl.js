var movekeyspeed:float = 1;
var setheightcam:float = 10;
var bplayercontrol:boolean = false;
var scrollspeed:float = 100;
var zoomspeed:float = 50;

var target:Transform;

var lastpos:Vector3 = new Vector3();
var lastrot;//:Vector3 = new Vector3();


function Start(){
	transform.position.y = setheightcam;
	lastpos = transform.position;
	lastrot = transform.rotation;
}


function Update () {
	if (JRTSGamePlayer.bcommandcontrol == false){
		return;
	}
	
	if(bplayercontrol){
		if (Input.GetAxis("Mouse ScrollWheel") > 0){
			transform.position.y -= scrollspeed * Time.deltaTime * zoomspeed;
		}
		
		if (Input.GetAxis("Mouse ScrollWheel") < 0){
			transform.position.y += scrollspeed * Time.deltaTime * zoomspeed;
		}
		if(Input.GetAxis("Vertical") > 0){
			transform.position.z += scrollspeed * Time.deltaTime;	
		}
		if(Input.GetAxis("Vertical") < 0){
			transform.position.z -= scrollspeed * Time.deltaTime;
		}
	
		if(Input.GetAxis("Horizontal") > 0){
			transform.position.x += scrollspeed * Time.deltaTime;
		}
		if(Input.GetAxis("Horizontal") < 0){
			transform.position.x -= scrollspeed * Time.deltaTime;
		}
	}
}

function ResetCam(){
	transform.position = lastpos;
	transform.rotation = lastrot;
}