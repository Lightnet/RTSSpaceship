/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


function Update () {
}

function OnDrawGizmos() {
	Gizmos.color = Color (1,0,1,0.4);
	Gizmos.DrawCube (transform.position, Vector3(0.1,0.1,0.1));	
}