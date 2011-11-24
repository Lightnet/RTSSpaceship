/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


class jRTSData{
	var playerid:String = "";
	var balive:boolean = true;
	var name:String = "";
	var health:float = 0;
	var healthcaps:float = 0;
	var teamid:int = 0;
	var faction:String = "";
	var spawntime:float = 10;
	var spawntimecaps:float = 0;
	var lanuchtime:float = 5;
	var lanuchtimecaps:float = 0;
	var time:float = 0;
	var bsettime:boolean = false;
	var blaunched:boolean = false;
	var shipsizeint:int = 0;
	
	function setspawntime(ticktime){
		if(bsettime == false){
			spawntimecaps = ticktime + spawntime;
			bsettime = true;
		}
	}
	
	function setlaunchtime(ticktime){
		if(bsettime == false){
			lanuchtimecaps = ticktime + lanuchtime;
			bsettime = true;
		}
	}
}