/**
Project: Anime Maid Code
Game Type: RPG
Engine: Unity3D
Created by: Darknet
License: cc
http://creativecommons.org/licenses/by/3.0/

source code:http://animemaidcode.googlecode.com
*/
var healthBarWidth : int = 16; //change the width image
var healthBarHeight : int = 16;  //change the height image
var IconDisplayTexture : Texture2D;
var EnemyIconDisplayTexture : Texture2D;
var SelectedIconDisplayTexture : Texture2D;
var screenPosition : Vector3;
var hudoffset:Vector3 = new Vector3();
var scale=1;
var scaledis = 10;//every time the main camera is move away salce the gui texture
var drawrange = 10000;//draw limit incase for zoom out or far out of range that doesn't need to render in gui
var spaceshipunit;

function Start(){

	spaceshipunit = transform.GetComponent(JRTSSpaceshipUnit);
}

function Update () {

}

function OnGUI(){
	if(Camera.main != null){
		var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
		
		
		//var relativePosition = Camera.main.transform.InverseTransformPoint(transform.position);
		//print(relativePosition);
		
		if (dis  < drawrange){
			//scale = (dis/scaledis);
			//if(scale == 0){scale = 1;}
			
			screenPosition = Camera.main.WorldToScreenPoint((transform.position+ hudoffset));
			
			// the GUI coordinate system is upside down relative to every other coordinate system
			screenPosition.y = (Screen.height - screenPosition.y);
			
			//GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2), screenPosition.y - (healthBarHeight/2), healthBarWidth, healthBarHeight), IconDisplayTexture);
			if (screenPosition.z > 0) {//this deal with front and back camera face direction.			
				if(spaceshipunit !=null){
					if(spaceshipunit.bselected == true){
						//draw to scale and center the texture current position
						GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), SelectedIconDisplayTexture);
					}else{
						GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), IconDisplayTexture);
					}
				}else{
					//draw to scale and center the texture current position
					GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), IconDisplayTexture);
				}
			}
		}
	}
}