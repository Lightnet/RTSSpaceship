var shipobject:Transform;
var shipinfo;
var scale=1;
var BarWidth:float = 150;
var BarHeight:float = 20;
var bshiphitinfo:boolean = false;
var bmousepress:boolean = false;
var bmouseover:boolean = false;
var bmenu:boolean = false;
var bovermenu:boolean = false;

function Update () {
	if(JRTSGameConfig.viewmode == "rts_ship"){
		var hit : RaycastHit;
		var cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(JRTSGamePlayer.bplayercontrol){
			if(Physics.Raycast(cursorRay, hit)){
				
				if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
					bmousepress = true;
				}else{
					bmousepress = false;
				}
				
				secondpoint = hit.point;
				
				
				if(hit.transform !=null){
					var shipdata = hit.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
					if(shipdata !=null){
						bshiphitinfo = true;
						shipinfo = shipdata;
					}							
				}
							
				if(Input.GetMouseButtonUp(0)){
					if(hit !=null){
						if(hit.transform !=null){
							//var shipdata = hit.transform.root.transform.GetComponent(JRTSSpaceshipUnit);
							//if(shipdata !=null){
								//shipinfo = shipdata;
							//}
						
						
							if((hit.transform.root.transform == transform.root.transform)){
								bmenu = true;
								//print("found slef");
							}else{
								//print("not this object");
								bmenu = false;
							}
							//print("checking");
						}else{
							if(bovermenu == false){//this is from GUI to handle where rect detect mousePosition
								bmenu = false;
							}
							//print("null"+hit.transform.name);
						}
					}
				}
			}else{
				bshiphitinfo = false;
			}
		}
	}
}

function OnGUI(){
	if((shipinfo !=null)&&(bshiphitinfo == true)){
		//var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
		screenPosition = Camera.main.WorldToScreenPoint((shipinfo.transform.position));
		screenPosition.y = (Screen.height - screenPosition.y);
		//check if camera is faceing forward
		if (screenPosition.z > 0) {//this deal with front and back camera face direction.
			//GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), SelectedIconDisplayTexture);
			GUI.Box(Rect(screenPosition.x - (BarWidth/2), screenPosition.y - (BarHeight/2), BarWidth, BarHeight), shipinfo.shipid);
		}
	}
}