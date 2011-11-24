var ships:Transform[];
var shipquerybuilds:Array = new Array();
var bmenushipyard:boolean = false;
var bovermenu:boolean = false;

var timerate:float = 1;
var timenext:float = 1;

var scrollViewVector : Vector2 = Vector2.zero;
var scrollViewVector2 : Vector2 = Vector2.zero;
var menupos: Vector2 = Vector2.zero;
var btogglemenu:boolean = false;
var shipinfo;


function Start(){
	shipinfo = GetComponent(JRTSSpaceshipUnit);
}


function Update () {
	if(JRTSGamePlayer.bcommandcontrol){
		var cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit : RaycastHit;
		Physics.Raycast(cursorRay, hit);

		if(Input.GetMouseButtonUp(0)){
			if(hit !=null){
				//print("NAME HIT:"+ hit.transform.name);
				if(hit.transform !=null){
					if((hit.transform.root.transform == transform.root.transform)){
						bmenushipyard = true;
						print("found slef");
					}else{
						//print("not this object");
						bmenushipyard = false;
					}
					//print("checking");
				}else{//if not click on the object
					if(bovermenu == false){//this is from GUI to handle where rect detect mousePosition
						bmenushipyard = false;
					}
				}
			}
			//print("click for shipyard");
		}
	}
}

function LateUpdate(){
	if(shipquerybuilds.length > 0){
		var shipunit = shipquerybuilds[0].GetComponent(JRTSSpaceshipUnit);
		if(shipunit !=null){
			shipunit.setspawntime(Time.time);
			if(Time.time > shipunit.spawntime){
				shipunit.bsettime = false;
				shipquerybuilds[0].position = transform.position;
				shipquerybuilds[0].rotation = transform.rotation;
				shipquerybuilds[0].gameObject.SetActiveRecursively(true);
				shipquerybuilds.RemoveAt(0);
			}
		}
	}
}

function OnGUI(){
	if((bmenushipyard)||(JRTSGameConfig.viewmode == "rts_ship")&&(shipinfo.playername == JRTSGamePlayer.currentplayer))
	{
		if(GUI.Button(Rect(300,0,100,20),"Shipyard")){
			if(btogglemenu){
				btogglemenu = false;
			}else{
				btogglemenu = true;
			}
		}
		
		if(btogglemenu){
		GUI.Box(Rect(menupos.x,menupos.y,120,120),"ship builds list");
		
		// Begin the ScrollView
		var buttonheight = ships.length * 20;
		scrollViewVector = GUI.BeginScrollView (Rect (menupos.x,menupos.y+20, 100, 100), scrollViewVector, Rect (0, 0, 100, buttonheight));
		for(var i = 0; i < ships.length;i++){
			var shipid = ships[i].transform.GetComponent(JRTSSpaceshipUnit);
			if(shipid != null ){
				if(GUI.Button(Rect(0,20*i,100,20),shipid.shipname)){
					spawnship(ships[i]);
				}
			}
		}
		// End the ScrollView
		GUI.EndScrollView();
		if(GUI.Button(Rect(menupos.x,menupos.y,20,20),"x")){
			bmenushipyard = false;
		}
		//this handle mouse over position if the menu is within the box, so it not disappear when clicked
		if(!Rect(menupos.x,menupos.y,350,120).Contains(Event.current.mousePosition)){
			bovermenu = false;
		}else{
			bovermenu = true;
		}
		
		GUI.Box(Rect(menupos.x+200,menupos.y,100,120),"ship query list");
		
		if(shipquerybuilds.length > 0){
			var shiptime;
			var buttonheight2 = shipquerybuilds.length * 20;
			scrollViewVector2= GUI.BeginScrollView (Rect (menupos.x+200, menupos.y+20, 100, 100), scrollViewVector, Rect (0, 0, 100, buttonheight2));
			for(var sl = 0;sl < shipquerybuilds.length;sl++){
				var shipq = shipquerybuilds[sl].GetComponent(JRTSSpaceshipUnit);
				if(sl == 0){
					shiptime =shipq;
				}
				if(shipq !=null){
					if(GUI.Button(Rect(0,20*sl,100,20),shipq.shipname)){
						shipquerybuilds.RemoveAt(sl);
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
}

function spawnship(obj){
	var shipspawn  = Instantiate(obj,
											transform.position,
											transform.rotation);
	if(shipspawn !=null){
		shipspawn.transform.gameObject.SetActiveRecursively(false);
		shipquerybuilds.Push(shipspawn);
	}
}