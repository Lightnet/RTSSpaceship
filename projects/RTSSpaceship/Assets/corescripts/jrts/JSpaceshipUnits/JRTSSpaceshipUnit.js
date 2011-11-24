static var units:Array = new Array();
static var id:int = 0;

var shipname:String = "None";
var unittype:String[];
var shipid:String = "";
var playername:String = "None";
var HUDType:String = "hudsmallship";
var bbot:boolean = true;

var healthpoints:float = 100;
var healthpointscap:float = 100;

var shieldpoints:float = 100;
var shieldpointscap:float = 100;

var teamid:int = 0;
var teamname:String = "None";


var shipprefabs:Transform[];
var ships:Array = new Array();//ship for docking and lanuching
var lanuchships:Array = new Array();//cargo items
var shipcap:int = 0;

var shipyardprefabs:Transform[];
var shipyard:Array = new Array();//shipyard to build ships
var buildships:Array = new Array();//query to build ships
var cargo:Array = new Array();//cargo items

var entrypoints:jRTSSpaceshippoint[];


var blaunched:boolean = false;
var holdshipcaps:float = 0;
var spawntime:float = 10;
var spawntimecaps:float = 0;
var lanuchtimecaps:float = 0;
var bsettime:boolean = false;
var lanuchtime:float = 5;
//var setlaunchtime:float = 0;

var shipsizeint:int = 0;

//var rtsdata:jRTSData = new jRTSData();
var bselected:boolean = false;

function Start(){
	units.Push(transform);
	//print("spaceship unit added...");
	id += 1;
	if(playername){
		playername = playername + id;
	}	
	shipid = shipname +"_" +id;
	
	
	for(tran in shipyardprefabs){
		if(tran !=null){
			shipyard.Push(tran);
		}
	}
	
	for(ship in shipprefabs){
		if(ship !=null){
			ships.Push(ship);
		}
	}	
}

function Update () {

}

function move(targetpoint){

}
	function setspawntime(ticktime){
		if(bsettime == false){
			spawntime = ticktime +  spawntimecaps;
			bsettime = true;
		}
	}
	
	function setlaunchtime(ticktime){
		if(bsettime == false){
			lanuchtime   = ticktime + lanuchtimecaps;
			bsettime = true;
		}
	}