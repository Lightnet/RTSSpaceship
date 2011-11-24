var information:String = "The Resource produce";

var ResourceType:String = "";
var ResourceProduce:int = 0;
var ProducePreHour:int = 0;
var ProducePoints:int = 10;
var ProduceTime:int = 10;
var ProduceTimeNext:int = 10;
var bProducePoint:boolean = true;

var buildtime:float = 0;
var buildtimecap:float = 0;

var level:int = 0;
var bupgrade:boolean = false;
var bbuild:boolean = false;
var bproducing:boolean = false;

var Storage:float = 0;
var StorageMax:float = 100;

var teamid:int = 0;

var levels:JRTSLevel[];


var bmenures:boolean = false;
var bovermenu:boolean = false;
var bmousepress:boolean = false;
var menupos:Vector2 = Vector2.zero;
var bupgradeable:boolean = false;

function Start(){
	for(levelup in levels){
		if(levelup.level == level+1){
			bupgradeable = true;		
			break;
		}	
	}
}


function LateUpdate () {
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
						bmenures = true;
						//print("found slef");
					}else{
						//print("not this object");
						bmenures = false;
					}
					//print("checking");
				}else{
					if(bovermenu == false){//this is from GUI to handle where rect detect mousePosition
						bmenures = false;
					}
					//print("null"+hit.transform.name);
				}
			}
		}
	}

	var teaminfo:JRTSSpaceshipUnit = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	if((teaminfo !=null)&&(bproducing == true)&&(bupgrade == false)){
		//teaminfo.teamid
		if(bProducePoint){
			if(Time.time > ProduceTime){
				ProduceTime = ProduceTimeNext + Time.time;
				JRTSResourceManagement.ResourcesAdd(teaminfo.teamid,ResourceType,ProducePoints);
				//print("Produce res ");
			}
		}
	}
	
	if(bupgrade){
		if(Time.time > buildtime ){
			level += 1;
			bupgrade = false;
			
			
			for(levelup in levels){
				if(levelup.level == level){
					ProducePoints = levelup.producepoint;
					StorageMax = levelup.storagecap;					
					break;
				}	
			}
			JRTSResourceManagement.CheckstorageMaxTeams();
			for(levelup in levels){
				if(levelup.level == level+1){
					bupgradeable = true;		
					break;
				}else{
					bupgradeable = false;
				}
			}
		}
	}
	
}


function OnGUI(){

	if((bmenures == true)&&(JRTSGamePlayer.bcommandcontrol == true)){
		
		if(!Rect(menupos.x,menupos.y+20,320,200).Contains(Event.current.mousePosition)){
			bovermenu = false;
		}else{
			bovermenu = true;
		}
		GUI.Box(Rect(menupos.x,menupos.y+20,320,200),"Resource "+ResourceType+" Level:"+level);
		
		GUI.Label(Rect(menupos.x,menupos.y+40,200,40),"Info:"+information);
		
		if((bupgradeable == true)&&(bupgrade == false)){
			if(GUI.Button(Rect(menupos.x,menupos.y+80,100,20),"Upgrade")){
				//Time.time				
				for(levelup in levels){
					if(levelup.level == level+1){
						buildtime =  Time.time +  levelup.buildtimecap;
						break;
					}	
				}			
				bupgrade = true;			
			}
			for(levelup in levels){
				if(levelup.level == level+1){
					buildtime =  Time.time +  levelup.buildtimecap;
					GUI.Label(Rect(menupos.x,menupos.y+100,200,20),"Time Build:" + levelup.buildtimecap.ToString("#.00") );
					GUI.Label(Rect(menupos.x,menupos.y+120,200,20),"Metals:" + levelup.cost_metal.ToString("#.00") );
					GUI.Label(Rect(menupos.x,menupos.y+140,200,20),"Crystals:" + levelup.cost_crystal.ToString("#.00") );
					GUI.Label(Rect(menupos.x,menupos.y+160,200,20),"Fuels:" + levelup.cost_fuel.ToString("#.00") );
					//GUI.Label(Rect(menupos.x,menupos.y+1,200,20),"Time Build:" + levelup.buildtimecap.ToString("#.00") );
					break;
				}	
			}	
		}
		if(bupgrade){
			if(GUI.Button(Rect(menupos.x,menupos.y+80,100,20),"Cancel")){
				bupgrade = false;			
			}
			var tmptime:float = buildtime - Time.time;
			print(tmptime);
			GUI.Label(Rect(menupos.x,menupos.y+100,200,20),"Time Build:" + tmptime.ToString("#.00") );
		}				
	}
}

function GetTeamID():int{
	var teaminfo:JRTSSpaceshipUnit = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	teamid = teaminfo.teamid;
}


