
var healthBarWidth : int = 100; //change the width image
var healthBarHeight : int = 12;  //change the height image
var healthBarTexture : Texture2D;
var healthBarTextureFull : Texture2D;
var screenPosition : Vector3;
private var TextPosition : Vector3 = new Vector3(0,-20,0);
var hudoffset:Vector3 = new Vector3(0,1,0);
var scale=1;
var scaledis = 10;//every time the main camera is move away salce the gui texture
var drawrange = 40;//draw limit incase for zoom out or far out of range that doesn't need to render in gui

var bhidehealthbar:boolean = false;
var rtsdata;

function Start(){
	var junit = transform.GetComponent(JRTSUnit);
	if(junit !=null){
		rtsdata = junit.rtsdata;
	}
}

function Update () {

}

function OnGUI(){
		if((Camera.main != null)&&(bhidehealthbar==false)){
			var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
			if (dis  < drawrange){
				screenPosition = Camera.main.WorldToScreenPoint((transform.position + hudoffset));
				scale = (dis/scaledis);
				if(scale == 0){scale = 1;}
				
				screenPosition.y = (Screen.height - screenPosition.y); // the GUI coordinate system is upside down relative to every other coordinate system
				//draw to scale and center the texture current position
				GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), healthBarTexture);
				
				var percent:float = 1.0;
				if(rtsdata != null){
					percent = rtsdata.health/rtsdata.healthcaps;
				}
				if(percent < 0){percent = 0;}
				if(percent > 1){percent = 1;}
				
				//print(percent +"<>"+ health + "<>"+healthcaps);
				GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, (healthBarWidth * percent)/scale, healthBarHeight/scale), healthBarTextureFull);
				if(rtsdata !=null){
					GUI.Label(Rect(screenPosition.x - (healthBarWidth/2)/scale,(TextPosition.y + screenPosition.y) - (healthBarHeight/2)/scale,100, 20), rtsdata.name);
				}
			}
		}
}