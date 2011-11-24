/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

static var units:Array = new Array();
var rtsdata:jRTSData = new jRTSData();
var bselected:boolean = false;
static var _id:int = 0;
var id:int = 0;

var barmyunit:boolean = false;//check if this a soldier or building

function Start(){
	_id++;
	id = _id;
	if(barmyunit){
		units.Push(transform);
	}
	//print("unit added");
}

function Update () {

}