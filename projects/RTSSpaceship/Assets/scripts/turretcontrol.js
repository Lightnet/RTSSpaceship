/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var LookAtTarget:Transform;
var damp = 1;
var bullitPrefab:Transform;
var saveTime=0;

function Update () {

	if(LookAtTarget)
	{
		var rotate =Quaternion.LookRotation(LookAtTarget.position - transform.position);
		
		transform.rotation = Quaternion.Slerp(transform.rotation,rotate,Time.deltaTime * damp);
		
		var seconds:int = Time.time;
		var oddeven =  (seconds % 2);
		
		if(oddeven)
		{
			Shoot(seconds);
		}
		
		
	}
}

function Shoot(seconds)
{  
	if(seconds != saveTime)
	{
		var bullit = Instantiate(bullitPrefab,
										transform.Find("spawnpoint").transform.position, 
										Quaternion.identity);
	
		bullit.rigidbody.AddForce(transform.forward  * 1000);
	
		saveTime=seconds;
	}
}