/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var shipinfo;
var weaponinfo;

var bcustommenu:boolean = false;//custom menu that is extra GUI that is not part of the ship or building station

//single ship display
var btabsborder:boolean = false;
var bborderout:boolean = false;

var bshowactions:boolean = false;
var bshowactionsborder:boolean = false;
var btoggleactions:boolean = false;

var bshowships:boolean = false;
var bshowshipsborder:boolean = false;
var btoggleships:boolean = false;

var bshowshipyard:boolean = false;
var bshowshipyardborder:boolean = false;
var btoggleshipyard:boolean = false;

var bshowweapons:boolean = true;
var bshowweaponsborder:boolean = false;
var btoggleweapons:boolean = true;

var bshowshuttle:boolean = false;
var bshowshuttleborder:boolean = false;
var btoggleshuttle:boolean = false;

var bshowspecial:boolean = false;
var bshowspecialborder:boolean = false;
var btogglespecial:boolean = false;

var bshowjump:boolean = false;
var bshowjumpborder:boolean = false;
var btogglesjump:boolean = false;

var bshowwarp:boolean = false;
var bshowwarpborder:boolean = false;
var btoggleswarp:boolean = false;

var scrollViewVector : Vector2 = Vector2.zero;
var ScrollWeaponSlotVector : Vector2 = Vector2.zero;
var ScrollShipSlotVector : Vector2 = Vector2.zero;
var ScrollLanuchShipSlotVector : Vector2 = Vector2.zero;
var ScrollLanuchShipyardSlotVector : Vector2 = Vector2.zero;
var ScrollLanuchShipbuildSlotVector : Vector2 = Vector2.zero;

var bovermenu:boolean = false;
var bmousepress:boolean = false;
var menupos:Vector2 = Vector2.zero;
var bshipmenu:boolean = false;
var tabscount = 0;

var btogglemenu:boolean = false;
var entrypoints:jRTSSpaceshippoint[];


function Start(){
	shipinfo = GetComponent(JRTSSpaceshipUnit);
	entrypoints = shipinfo.entrypoints;
	weaponinfo = GetComponent(JRTSSpaceshipWeaponSlots);
}

function Update () {
	//this part deal with spawning or lanuching ships
	if(bshowshipyard){
		if(shipinfo.buildships.length > 0){
			var shipunit = shipinfo.buildships[0].GetComponent(JRTSSpaceshipUnit);
			if(shipunit !=null){
				shipunit.setspawntime(Time.time);
				if(Time.time > shipunit.spawntime){
					shipunit.bsettime = false;
					
					if(entrypoints.length){
						for (var i=0;i < entrypoints.length;i++ ){
							shipinfo.buildships[0].position = entrypoints[i].volume.position;
							shipinfo.buildships[0].rotation = entrypoints[i].volume.rotation;
						}
						print("spawn entery");
					}else{
						shipinfo.buildships[0].position = transform.position;
						shipinfo.buildships[0].rotation = transform.rotation;						
						print("spawn position ship");
					}
					
					shipinfo.buildships[0].gameObject.SetActiveRecursively(true);
					shipinfo.buildships.RemoveAt(0);
					
				}
			}
		}
	}
	
	if(bshowships){
		if(shipinfo.lanuchships.length > 0){
			var shipunitl = shipinfo.lanuchships[0].GetComponent(JRTSSpaceshipUnit);
			shipunitl.setlaunchtime(Time.time);
			shipunitl.blaunched = true;//this make sure it doesn't dock fast
			if(Time.time > shipunitl.lanuchtime){
				if(entrypoints.length > 0){
					for (var s=0;s <entrypoints.length;s++ ){
						if(entrypoints[s].volume !=null){
							shipinfo.lanuchships[0].position = entrypoints[s].volume.position;
							//lanuchships[0].rotation = entrypoints[s].volume.transform.localRotation;
							shipinfo.lanuchships[0].rotation = entrypoints[s].volume.transform.rotation;							
						}						
					}					
					shipinfo.lanuchships[0].transform.gameObject.SetActiveRecursively(true);
					shipinfo.lanuchships.RemoveAt(0);
					print("spawn entery");
				}else{//other is spawn on ship position
					print("spawn position ship");
					shipinfo.lanuchships[0].position = transform.position;
					shipinfo.lanuchships[0].rotation = transform.rotation;
					shipinfo.lanuchships[0].transform.gameObject.SetActiveRecursively(true);
					shipinfo.lanuchships.RemoveAt(0);
				}
			}		
		}
	}
}

function OnGUI(){	
	if(JRTSGameConfig.viewmode == "rts_ship"){
		//make sure it player stuff
		if((weaponinfo !=null)&&(shipinfo.playername  == JRTSGamePlayer.currentplayer)){
			tabscount = -1;
			if(bshowweapons){
				WeaponlistGUI(OnGUI);
			}
			if(bshowships){
				DockingBay(OnGUI);
			}
			if(bshowshipyard){
				ShipyardlistGUI(OnGUI);
			}
		}
	}
	if(JRTSGameConfig.viewmode == "rts_command"){
		//need to make sure it not over laps
		if((weaponinfo !=null)&&(bshipmenu == true)){
			if(!Rect(0,0,Screen.width,20).Contains(Event.current.mousePosition)){
				btabsborder = false;
				//print("out tabs");
			}else{
				btabsborder = true;
				//print("over tabs");
			}
			
			GUI.Label(Rect(Screen.width-200,0,100,20),shipinfo.shipid);
			
			tabscount = -1;
			if(bshowweapons){
				WeaponlistGUI(OnGUI);
			}
			if(bshowships){
				DockingBay(OnGUI);
			}
			if(bshowshipyard){
				ShipyardlistGUI(OnGUI);
			}
			
			if((bovermenu == false)&&(btabsborder == false)&&(bshowweaponsborder == false)&&(bshowshipsborder == false)&&(bshowshipyardborder == false)){//this is from GUI to handle where rect detect mousePosition
				bborderout = false;
			}else{
				bborderout = true;
			}
		}
		
		//SelectShipUnit();
	}
}

function SelectShipUnit(){
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
							bshipmenu = true;
							//print("found slef");
						}else{
							//print("not this object");
							bshipmenu = false;
						}
						//print("checking");
					}else{
						if((bovermenu == false)&&(btabsborder == false)&&(bshowweaponsborder == false)){//this is from GUI to handle where rect detect mousePosition
							bshipmenu = false;
						}
						//print("null"+hit.transform.name);
					}
				}
			}
		}
	}
}

function HUDSmallShip(OnGUI){
	/*
	if(JRTSGamePlayer.bplayercontrol == false){
		return;
	}
	*/
	if(JRTSGamePlayer.bcommandcontrol){	
	var itemheight = weaponinfo.prefabweapons.length *20;
		ScrollWeaponSlotVector = GUI.BeginScrollView (Rect (10, 40, 135, 180), ScrollWeaponSlotVector, Rect (0, 0, 100, itemheight));
		var buttoncount = 0;
		for (weapon in weaponinfo.prefabweapons ){
			var wepinfo = weapon.spawnprefab.transform.GetComponent(JRTSSpaceshipWeapProjectile);
			if(wepinfo !=null){
				GUI.Label(Rect(0,20*buttoncount ,100,20),wepinfo.weaponname);
				buttoncount += 1;
			}
			var turretinfo = weapon.spawnprefab.transform.GetComponent(jRTSSpaceUnitTurretWeaponHandle);
			if(turretinfo !=null){
				GUI.Label(Rect(0,20*buttoncount ,100,20),turretinfo.turretname);
				buttoncount += 1;
			}			
		}
		
	GUI.EndScrollView();
	}
}

function HUDCarrierShip(OnGUI){
	if(GUI.Button(Rect(100,0,100,20),"Weapons")){
		if(btogglemenu){
			btogglemenu = false;
		}else{
			btogglemenu = true;
		}
	}

	if(btogglemenu){
		var itemheight = weaponinfo.prefabweapons.length *20;
		ScrollWeaponSlotVector = GUI.BeginScrollView (Rect (10, 40, 250, 180), ScrollWeaponSlotVector, Rect (0, 0, 100, itemheight));
		var buttoncount = 0;
		for (weapon in weaponinfo.prefabweapons ){
			var wepinfo = weapon.spawnprefab.transform.GetComponent(JRTSSpaceshipWeapProjectile);
			if(wepinfo !=null){
				GUI.Label(Rect(0,20*buttoncount ,100,20),wepinfo.weaponname);
				buttoncount += 1;
			}
			
			var turretinfo02 = weapon.spawnprefab.transform.GetComponent(JRTSStationTurret);
			if(turretinfo02 !=null){
				if(GUI.Button(Rect(0,20*buttoncount ,100,20),turretinfo02.turretname)){
					turretinfo02.manualfire = true;				
				}
				
				if(GUI.Button(Rect(110 ,20*buttoncount ,100,20), "AutoFire:" + turretinfo02.bautofire)){
					if(turretinfo02.bautofire){
						turretinfo02.bautofire = false;
					}else{
						turretinfo02.bautofire = true;
					}
				}
				buttoncount += 1;
			}
		}
		GUI.EndScrollView();
	}
}

function WeaponlistGUI(OnGUI){
	tabscount += 1;
	if(GUI.Button(Rect(100*tabscount,0,100,20),"Weapon Slots")){
		if(btoggleweapons){
			btoggleweapons = false;
		}else{
			HideTabs();
			btoggleweapons = true;
		}
	}

	if(btoggleweapons){
	
		if(!Rect(0,20,300,200).Contains(Event.current.mousePosition)){
			bshowweaponsborder = false;
		}else{
			bshowweaponsborder = true;
		}
	
		GUI.Box(Rect(0,20,300,200),"Weapon Slots");
		var itemheight = weaponinfo.prefabweapons.length *20;
		ScrollWeaponSlotVector = GUI.BeginScrollView (Rect (10, 40, 250, 180), ScrollWeaponSlotVector, Rect (0, 0, 100, itemheight));
		var buttoncount = 0;
		for (weapon in weaponinfo.prefabweapons ){
			var wepinfo = weapon.spawnprefab.transform.GetComponent(JRTSSpaceshipWeapProjectile);
			if(wepinfo !=null){
				GUI.Label(Rect(0,20*buttoncount ,100,20),wepinfo.weaponname);
				buttoncount += 1;
			}
			
			var turretinfo02 = weapon.spawnprefab.transform.GetComponent(JRTSStationTurret);
			if(turretinfo02 !=null){
				if(GUI.Button(Rect(0,20*buttoncount ,100,20),turretinfo02.turretname)){
					turretinfo02.manualfire = true;				
				}
				
				if(GUI.Button(Rect(110 ,20*buttoncount ,100,20), "AutoFire:" + turretinfo02.bautofire)){
					if(turretinfo02.bautofire){
						turretinfo02.bautofire = false;
					}else{
						turretinfo02.bautofire = true;
					}
				}
				buttoncount += 1;
			}
		}
		GUI.EndScrollView();
	}

}

function DockingBay(OnGUI){
	tabscount += 1;
	if(GUI.Button(Rect(100*tabscount,0,100,20),"Docking Bay")){
		if(btoggleships){
			btoggleships = false;
		}else{
			HideTabs();
			btoggleships = true;
		}
	}

	
	if(btoggleships){
			GUI.Box(Rect(menupos.x,menupos.y+20,500,260),"Docking Bay:");
			
			if(shipinfo !=null){
				var shipcount:String = shipinfo.ships.length.ToString() + "/" + shipinfo.shipcap.ToString();
				GUI.Label(Rect(menupos.x,menupos.y+40,200,20),"Name:" + shipinfo.shipname + ":[" + shipcount + "]");
			}
			
			
			if(!Rect(menupos.x,menupos.y,500,260).Contains(Event.current.mousePosition)){
				bshowshipsborder = false;
			}else{
				bshowshipsborder = true;
			}
			
			GUI.Label(Rect(0,60,100,20),"Ships");
			
			if(shipinfo.ships.length > 0){
				ScrollLanuchShipSlotVector = GUI.BeginScrollView (Rect (menupos.x+0, menupos.y+80, 250, 160), ScrollLanuchShipSlotVector, Rect (0, 0, 250, shipinfo.ships.length * 20));
				for(var i =  0;i < shipinfo.ships.length;i++){
					var shipunit  = shipinfo.ships[i].transform.GetComponent(JRTSSpaceshipUnit);
					if(shipunit !=null){
						if(GUI.Button(Rect(0,20*i,200,20),shipunit.shipname + "_" +  shipunit.playername)){
							shipinfo.lanuchships.Push(shipinfo.ships[i]);
							shipinfo.ships.RemoveAt(i);
							break;
						}
						//print("found");
					}else{
						//print("not found");
					}
				}
				GUI.EndScrollView();
			}
			
			
			GUI.Label(Rect(250,60,100,20),"lanuching:" + shipinfo.lanuchships.length);
			if(shipinfo.lanuchships.length > 0){
				ScrollLanuchShipSlotVector = GUI.BeginScrollView (Rect (250, 80, 250, 160), ScrollLanuchShipSlotVector, Rect (0, 0, 250, shipinfo.lanuchships.length * 20));
				var shipunitl = shipinfo.lanuchships[0].GetComponent(JRTSSpaceshipUnit);
				var tmptime = (shipunitl.lanuchtimecaps - Time.time);
				GUI.Label(Rect(0,0,300,20),"Name: " + shipunitl.shipname + " E.T.A:" + tmptime);
				//print((shipunitl.lanuchtimecaps - Time.time));
				GUI.EndScrollView();	
			}

		}
}

function ShipyardlistGUI(OnGUI){
	tabscount += 1;
	if(GUI.Button(Rect(100*tabscount,0,100,20),"Shipyard")){
		if(btoggleshipyard){
			btoggleshipyard = false;
		}else{
			HideTabs();
			btoggleshipyard = true;
		}
	}

	if(btoggleshipyard){
		GUI.Box(Rect(menupos.x,menupos.y+20,160,140),"ship builds list");
		
		// Begin the ScrollView
		ScrollLanuchShipyardSlotVector = GUI.BeginScrollView (Rect (menupos.x,menupos.y+40, 160, 120), ScrollLanuchShipyardSlotVector, Rect (0, 0, 160, shipinfo.shipyard.length * 20));
		for(var i = 0; i < shipinfo.shipyard.length;i++){
			var shipid = shipinfo.shipyard[i].transform.GetComponent(JRTSSpaceshipUnit);
			if(shipid != null ){
				if(GUI.Button(Rect(0,20*i,160,20),shipid.shipname)){
					spawnship(shipinfo.shipyard[i]);
				}
			}
		}
		//print("ships:"+shipinfo.shipyard.length);
		// End the ScrollView
		GUI.EndScrollView();
		if(GUI.Button(Rect(menupos.x,menupos.y+20,20,20),"x")){
			bmenushipyard = false;
		}
		//this handle mouse over position if the menu is within the box, so it not disappear when clicked
		if(!Rect(menupos.x,menupos.y+20,360,140).Contains(Event.current.mousePosition)){
			bshowshipyardborder = false;
		}else{
			bshowshipyardborder = true;
		}
		
		GUI.Box(Rect(menupos.x+200,menupos.y+20,160,140),"ship query list");
		
		if(shipinfo.buildships.length > 0){
			var shiptime;
			ScrollLanuchShipbuildSlotVector= GUI.BeginScrollView (Rect (menupos.x+200, menupos.y+40, 160, 120), ScrollLanuchShipbuildSlotVector, Rect (0, 0, 160, shipinfo.buildships.length * 20));
			for(var sl = 0;sl < shipinfo.buildships.length;sl++){
				var shipq = shipinfo.buildships[sl].GetComponent(JRTSSpaceshipUnit);
				if(sl == 0){
					shiptime =shipq;
				}
				if(shipq !=null){
					if(GUI.Button(Rect(0,20*sl,160,20),shipq.shipname)){
						shipinfo.buildships.RemoveAt(sl);
						break;
					}
				}
			}
			GUI.EndScrollView();
			if(shiptime !=null){
				//GUI.Label(Rect(menupos.x+200,menupos.y - 20,100,20),"Name:"+shiptime.shipname+":" +Time.time +":"+ Mathf.Floor(shiptime.spawntimecaps));
				//print(Mathf.Floor(shiptime.spawntime - Time.time));
				var timespawn = Mathf.Floor(shiptime.spawntime - Time.time);
				if(timespawn < 0){
					timespawn =0;
				}
				
				GUI.Label(Rect(menupos.x+200,menupos.y - 20,200,20),"Name:"+shiptime.shipname+": Time:" + timespawn );
			}
		}
	}

}

function ShuttleGUI(){//deal with self destory


}


function InfoUnitGUI(OnGUI){

}

function ResearchTechGUI(OnGUI){//sci lab

}

function ArmoryLabGUI(OnGUI){//armor 

}

function WeaponLabGUI(OnGUI){//weapon

}

function ResourceGUI(OnGUI){

}

function spawnship(obj){
	var shipspawn  = Instantiate(obj,
											transform.position,
											transform.rotation);
	if(shipspawn !=null){
		shipspawn.transform.gameObject.SetActiveRecursively(false);
		shipinfo.buildships.Push(shipspawn);
	}
}

function HideTabs(){
	//var bshowships:boolean = false;
	btoggleships = false;

	//var bshowshipyard:boolean = false;
	btoggleshipyard = false;

	//var bshowweapons:boolean = true;
	btoggleweapons = false;
}



function Test(){

}