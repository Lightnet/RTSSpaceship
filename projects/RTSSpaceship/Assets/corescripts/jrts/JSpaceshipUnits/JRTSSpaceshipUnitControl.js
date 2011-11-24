@script RequireComponent (Rigidbody)

var bbot:boolean = false;
var bmove:boolean = false;
var brotate:boolean = false;
var borderai:boolean = false;
var target:Transform;
var targetpoint;
var holdposition;
var lastposition;
var Anglefollow:float = 20;

var hoverHeight : float = 3;
var hoverHeightStrictness : float = 1.0;
var  forwardThrust : float = 5000.0;
var  backwardThrust : float = 2500.0;
var  bankAmount : float = 0.1;
var  bankSpeed : float = 0.2;
var  bankAxis : Vector3 = new Vector3(-1.0, 0.0, 0.0);
var  turnSpeed : float = 5.0;
var  forwardDirection : Vector3 = new Vector3(0.0, 0.0, 1.0);
var  mass : float = 5.0;

// positional drag
var sqrdSpeedThresholdForDrag : float = 25.0;
var superDrag : float = 2.0;
var fastDrag : float = 0.5;
var slowDrag : float = 0.01;
   
// angular drag
var sqrdAngularSpeedThresholdForDrag : float = 5.0;
var superADrag : float = 2.0;
var fastADrag : float = 1.0;
var slowADrag : float = 0.1;

var playerControl : boolean = true;
private var bank : float = 0.0;

// thrust
private var thrust : float = 0;
private var turn : float = 0;

var weapon:jRTSSpaceshipWeapon[];

var shipinfo;
var weaponslots;


function Thrust( t : float )
{
	thrust = Mathf.Clamp( t, -1.0, 1.0 );
}
   
function Turn(t : float)
{
	turn = Mathf.Clamp( t, -1.0, 1.0 ) * turnSpeed;
}

function Start()
{
	gameObject.rigidbody.mass = mass;
	rigidbody.useGravity =false;

	weaponslots = transform.GetComponent(JRTSSpaceshipWeaponSlots);
	shipinfo = transform.GetComponent(JRTSSpaceshipUnit);
}

private var thrustGlowOn : boolean = false;

function Update () {
	var theThrust : float = thrust;
	
	if(shipinfo !=null){
		if(shipinfo.playername  == JRTSGamePlayer.currentplayer){
			if(JRTSGamePlayer.bplayercontrol == true){
			if ((playerControl == true))
			{
				thrust = Input.GetAxis("Vertical");
				turn = Input.GetAxis("Horizontal") * turnSpeed;
				//print("controling");
			}
			
			if((Input.GetMouseButtonDown(0) ==true)){
				if(weaponslots !=null){
					weaponslots.FireIdx(0,true);
				}
			}
			
			if((Input.GetMouseButtonUp(0) ==true)){
				if(weaponslots !=null){
					weaponslots.FireIdx(0,false);
				}
			}
			
			if((Input.GetMouseButtonDown(1) ==true)){
				if(weaponslots !=null){
					weaponslots.FireIdx(1,true);
				}
			}
			
			if((Input.GetMouseButtonUp(1) ==true)){
				if(weaponslots !=null){
					weaponslots.FireIdx(1,false);
				}
			}
		}
		else
		{//just make sure it off when change player view or something
			weaponslots.FireIdx(0,false);
			weaponslots.FireIdx(1,false);
		}
		}else{
			weaponslots.FireIdx(0,false);
			weaponslots.FireIdx(1,false);		
		}
	}
	else
	{//just make sure it off when change player view or something
			weaponslots.FireIdx(0,false);
			weaponslots.FireIdx(1,false);
	}
	
	//print("thrust: "+thrust+" turn:"+turn);
	//thrust -1,0,1 //turn -8000,8000
	
	if(bbot){
		bot();
	}

	//print("thrust: "+thrust+" turn:"+turn);
	if (thrust > 0.0)
	{
		theThrust *= forwardThrust;
	}
	else
	{
		theThrust *= backwardThrust;
	}
	
	if (Mathf.Abs(thrust) > 0.01)
	{
		if (rigidbody.velocity.sqrMagnitude > sqrdSpeedThresholdForDrag)
		{
			rigidbody.drag = fastDrag;
		}
		else
		{
			rigidbody.drag = slowDrag;
		}
	}
	else
	{
		rigidbody.drag = superDrag;
	}
	
	if (Mathf.Abs(turn) > 0.01)
	{
		if (rigidbody.angularVelocity.sqrMagnitude > sqrdAngularSpeedThresholdForDrag)
		{
			rigidbody.angularDrag = fastADrag;
		}
		else
		{
			rigidbody.angularDrag = slowADrag;
        }
	}
	else
	{
		rigidbody.angularDrag = superADrag;
	}
	
	rigidbody.AddRelativeTorque(Vector3.up * turn * Time.deltaTime);
	rigidbody.AddRelativeForce(forwardDirection * theThrust * Time.deltaTime);
	
	var forward = transform.TransformDirection(Vector3.forward);
	//print("[>>>]"+forward);
	Debug.DrawRay (transform.position, forward * 10, Color.green);
	var rotation : Vector3 = transform.rotation.eulerAngles;
	//print(rotation);
}

function FixedUpdate(){
	Debug.DrawLine (transform.position, new Vector3 (transform.position.x, 0, transform.position.z), Color.white);
}

function bot(){
	//print("thrust: "+thrust+" turn:"+turn);
	//thrust = 1;
	
	if((targetpoint !=null)&&(borderai == true)){
		var speedpercent = Vector3.Distance(transform.position,targetpoint) / Vector3.Distance(lastposition,targetpoint);
		
		//print("speed precent"+speedpercent);
		if(speedpercent > 1){
			speedpercent =1;
		}
		if(speedpercent < 0.2){
			speedpercent = 0;
		}
		
		thrust = 1 * speedpercent;
		if(thrust > 1){
			thrust = 1;
		}
		
		if(Vector3.Distance(transform.position,targetpoint) < 2){
			borderai= false;
			thrust = 0;
			//print("finish");
		}
		
		var rotatetarget = Quaternion.LookRotation( targetpoint - transform.position);
		var setdirection:Vector3 = rotatetarget.eulerAngles;
		var currentdirection:Vector3 = transform.rotation.eulerAngles;

		var angley:float = 0;
		//var angley1 = 360 - setdirection.y + currentdirection.y;
		//var angley2 = currentdirection.y - setdirection.y;
		if(setdirection.y > currentdirection.y)
		{
			angley1 = (360 - setdirection.y) + currentdirection.y;
			angley2 =  setdirection.y - currentdirection.y;
			//print("hello?");
			if( (angley2 < 180)&&(angley2 > Anglefollow)){
				turn = turnSpeed;
			}else if((angley1 < 180)&&(angley1 > Anglefollow)){
				turn = -turnSpeed;
			}else{
				turn = 0;
			}
		}else{
			angley1 = (360 - currentdirection.y) + setdirection.y;
			angley2 =  currentdirection.y - setdirection.y;
			if ((angley2 < 180)&&(angley2 > Anglefollow)){
				turn = -turnSpeed;
			}else if((angley1 < 180)&&(angley1 > Anglefollow)){
				turn = turnSpeed;
			}else{
				turn = 0;
			}
		}
		//print(angley1 + ">]"+angley2 + "set:" + setdirection.y +  " Currnet:" + currentdirection.y);
	}
	
	/*
	if(targetpoint !=null){
		if(Vector3.Distance(transform.position,targetpoint) > ) {
		}
	}
	*/
}

function OnGUI(){
	
}

function movetotargetpoint(tpoint){
	borderai = true;
	targetpoint = tpoint;
	lastposition = transform.position;
}


function lanuchunit(){

}

function autoploit(){

}

function OnDrawGizmos() {
	if(targetpoint != null){
		//thrust = 1;
		Gizmos.color = Color (1,0,1,0.4);
		Gizmos.DrawCube (targetpoint, Vector3(1,1,1));	
		//print("targetpoint"+targetpoint);
	}
}