/*
camera or stand alone while being selected for the ship units
*/

var bmousepress:boolean = false;
var bshipmenu:boolean = false;
var bactivemenu:boolean = false;

var shipobj;
var shipinfo;
var shiphud;

function Update () {
	SelectShipUnit();
}

function SelectShipUnit(){
	if(JRTSGameConfig.viewmode == "rts_command"){
		var hit : RaycastHit;
		var cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if(shiphud !=null){		
			bactivemenu = shiphud.bborderout;
		}
		//print(bactivemenu);
		
		if(JRTSGamePlayer.bcommandcontrol){
			Physics.Raycast(cursorRay, hit);
	
			if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
				bmousepress = true;
			}else{
				bmousepress = false;
			}
			
			secondpoint = hit.point;
			
			if((Input.GetMouseButtonUp(0) == true)&&(bactivemenu == false)){				
				if(shipinfo !=null){
					shiphud.bshipmenu = false;
				}
				
				if(hit !=null){
					if(hit.transform !=null){
						shipinfo = hit.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
						if(shipinfo != null){
							

							shiphud = hit.transform.root.transform.GetComponent(JRTSSpaceshipHUD);
							shiphud.bshipmenu = true;						
						}
					}
				}
			}
		}
	}
}
