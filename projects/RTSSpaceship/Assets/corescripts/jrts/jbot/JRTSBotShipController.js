var bbot:boolean = true;
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

/*
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
*/


function Update () {
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
	}
	
}