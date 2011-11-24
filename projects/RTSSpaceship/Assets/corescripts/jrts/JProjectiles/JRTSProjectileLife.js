/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var lifetime = 10.0;
var bdestory:boolean = true;


function Start()
{
	if(bdestory){
		Destroy(gameObject,lifetime);
	}
}