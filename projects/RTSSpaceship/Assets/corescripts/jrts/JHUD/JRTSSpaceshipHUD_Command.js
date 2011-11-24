var bmenu_actions:boolean = true;
var bdisable_actions:boolean = false;
var bmenu_shipyards:boolean = false;
var bdisable_shipyards:boolean = false;
var bmenu_carrierships:boolean = false;
var bdisable_carrierships:boolean = false;
var bmenu_cargobays:boolean = false;
var bdisable_cargobays:boolean = false;
var bmenu_dockingships:boolean = false;
var bdisable_dockingships:boolean = false;
var bmenu_specials:boolean = false;
var bdisable_specials:boolean = false;
var bmenu_shuttle:boolean = false;
var bdisable_shuttle:boolean = false;
var bmenu_jumpmode:boolean = false;
var bdisable_jumpmode:boolean = false;

var bmenu:boolean = true;

var scrollViewVector : Vector2 = Vector2.zero;

var bovermenu:boolean = false;
var bmousepress:boolean = false;
var menupos:Vector2 = Vector2.zero;
var bmenuweapons:boolean = false;

function Update () {
	if(JRTSGameConfig.viewmode == "rts_command"){
		var hit : RaycastHit;
		var cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(JRTSGamePlayer.bcommandcontrol){
			Physics.Raycast(cursorRay, hit);
	
			if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
				bmousepress = true;
			}else{
				bmousepress = false;
			}
			
			secondpoint = hit.point;
			
			if(Input.GetMouseButtonUp(0)){
				if(hit !=null){
					if(hit.transform !=null){
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
		}
	}
}


function OnGUI()
{
	if(JRTSGameConfig.gamemode == "rts_comand"){
		if(bmenu){
			var buttoncount = 0;
			if(!bdisable_actions){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Actions")){
					if(bmenu_actions){
						bmenu_actions = false;
					}else{
						bmenu_actions =  true;
					}			
				}		
			}
			if(!bdisable_shipyards){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Ship Yard")){
					if(bmenu_shipyards){
						bmenu_shipyards = false;
					}else{
						bmenu_shipyards =  true;
					}			
				}		
			}
			if(!bdisable_carrierships){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Ships Load")){
					if(bmenu_carrierships){
						bmenu_carrierships = false;
					}else{
						bmenu_carrierships =  true;
					}			
				}		
			}
			if(!bdisable_cargobays){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Cargo Bay")){
					if(bmenu_cargobays){
						bmenu_cargobays = false;
					}else{
						bmenu_cargobays =  true;
					}			
				}		
			}
			if(!bdisable_dockingships){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Docking Ship")){
					if(bmenu_dockingships){
						bmenu_dockingships = false;
					}else{
						bmenu_dockingships =  true;
					}			
				}		
			}
			if(!bdisable_specials){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Specials")){
					if(bmenu_specials){
						bmenu_specials = false;
					}else{
						bmenu_specials =  true;
					}			
				}		
			}
			if(!bdisable_jumpmode){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Jump")){
					if(bmenu_jumpmode){
						bmenu_jumpmode = false;
					}else{
						bmenu_jumpmode =  true;
					}			
				}		
			}
			if(!bdisable_shuttle){
				buttoncount += 1;
				if(GUI.Button(Rect(80*buttoncount,0,80,20),"Shuttle")){
					if(bmenu_shuttle){
						bmenu_shuttle = false;
					}else{
						bmenu_shuttle =  true;
					}			
				}		
			}
		
		
		}
	}


}