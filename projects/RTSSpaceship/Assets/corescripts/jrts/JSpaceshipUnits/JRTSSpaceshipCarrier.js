var prefabships:Transform[];
var dockships:Array = new Array();
var lanuchships:Array = new Array();
var bcarryships:boolean = false;
var entrypoints:jRTSSpaceshippoint[];

var shipsizeint:int = 0;
var holdshipcaps:int = 10;

var bmenucarrier:boolean = false;
var bovermenu:boolean = false;
var bmousepress:boolean = false;
var menupos:Vector2 = Vector2.zero;

var balterlanuch:boolean = false;
var lanuchcount:int;

var btogglemenu:boolean = false;
var bttogglemenu = "Ship Bay";

var shipinfo;

function Start(){
	shipinfo = GetComponent(JRTSSpaceshipUnit);
	
	for (prefabship in prefabships){
		if(prefabship !=null){
			var tmpship  = Instantiate(prefabship);
			if(tmpship !=null){
				tmpship.transform.gameObject.SetActiveRecursively(false);
				dockships.Push(tmpship);
			}
		}
	}
}

function Update () {
	
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
						bmenucarrier = true;
						//print("found slef");
					}else{
						//print("not this object");
						bmenucarrier = false;
					}
					//print("checking");
				}else{
					if(bovermenu == false){//this is from GUI to handle where rect detect mousePosition
						bmenucarrier = false;
					}
					//print("null"+hit.transform.name);
				}
			}
		}
	}
	
	if(lanuchships.length > 0){
		var shipunitl = lanuchships[0].GetComponent(JRTSSpaceshipUnit);
		shipunitl.setlaunchtime(Time.time);
		shipunitl.blaunched = true;//this make sure it doesn't dock fast
		if(Time.time > shipunitl.lanuchtime){
			for (var s=0;s <entrypoints.length;s++ ){
				if(entrypoints[s].volume !=null){
					lanuchships[0].position = entrypoints[s].volume.position;
					//lanuchships[0].rotation = entrypoints[s].volume.transform.localRotation;
					lanuchships[0].rotation = entrypoints[s].volume.transform.rotation;
				}
			}
			lanuchships[0].transform.gameObject.SetActiveRecursively(true);
			lanuchships.RemoveAt(0);
		}
		
	}
}

function OnGUI(){
	
	if((bmenucarrier == true)&&(JRTSGamePlayer.bcommandcontrol == true)||(JRTSGameConfig.viewmode == "rts_ship")&&(shipinfo.playername == JRTSGamePlayer.currentplayer)){
		if(GUI.Button(Rect(0,0,100,20),bttogglemenu)){
			if(btogglemenu){
				btogglemenu = false;
			}else{
				btogglemenu = true;
			}
		}
		
		if(btogglemenu){
			GUI.Box(Rect(menupos.x,menupos.y+20,320,200),"Docking");
			if(shipinfo !=null){
				GUI.Label(Rect(menupos.x,menupos.y,100,20),"Ship Name:" + shipinfo.shipname + "Dock Ships:" + dockships.length + "/" + holdshipcaps);
			}
			
			if(!Rect(menupos.x,menupos.y,320,200).Contains(Event.current.mousePosition)){
				bovermenu = false;
			}else{
				bovermenu = true;
			}
			GUI.Label(Rect(0,40,100,20),"lanuch ships:" + lanuchships.length);
			if(lanuchships.length > 0){
				var shipunitl = lanuchships[0].GetComponent(JRTSSpaceshipUnit);
				var tmptime = (shipunitl.lanuchtimecaps - Time.time);
				GUI.Label(Rect(0,60,300,20),"Ship Name:" + shipunitl.shipname + "Time Lanuch:" + tmptime);
				//print((shipunitl.lanuchtimecaps - Time.time));
			}
			
			if(dockships.length > 0){
				GUI.Label(Rect(0,80,100,20),"SHIP LIST");
				for(var i =  0;i <dockships.length;i++){
					var shipunit  = dockships[i].transform.GetComponent(JRTSSpaceshipUnit);
					if(shipunit !=null){
						if(GUI.Button(Rect(0,20*i+100,200,20),shipunit.shipname + "_" +  shipunit.playername)){
							lanuchships.Push(dockships[i]);
							dockships.RemoveAt(i);
							break;
						}
						//print("found");
					}else{
						//print("not found");
					}
				}
			}
		}
	
	}
}



