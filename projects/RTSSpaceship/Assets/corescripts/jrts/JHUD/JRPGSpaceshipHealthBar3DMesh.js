var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

var BarEmpty:Transform;
var BarFull :Transform;

var barwidth:float;
var showprogresstest:boolean = false;
var percent:float = 0;
var bfollowmaincam:boolean = true;

function Start(){
	if(BarEmpty !=null){
		var themats = BarEmpty.renderer.materials;
		themats[0].mainTexture = progressBarEmpty;
	}
	
	if(BarFull !=null){
		themats2 = BarFull.renderer.materials;
		themats2[0].mainTexture = progressBarFull;
	}
}

function FixedUpdate () {
	if(showprogresstest){percent += 0.01;}
	if(percent > 1){percent = 0;}
	if(percent < 0){percent = 0;}

	BarFull.transform.localScale.x = percent;
	//used base on mesh width.
	//blender mesh
	BarFull.transform.localPosition.x =  (0.3 * percent)  - 0.3;
	if(bfollowmaincam){
		transform.rotation = Quaternion.LookRotation(transform.position - Camera.main.transform.position);
	}
}