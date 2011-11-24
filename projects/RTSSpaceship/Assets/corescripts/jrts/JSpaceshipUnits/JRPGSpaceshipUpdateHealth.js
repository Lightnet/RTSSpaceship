var healthinfo;
var health3dbar;

var prefabhealthbar3dmesh:Transform;
var prefabhealthtext:Transform;
var healthtext;

function Start(){
	health3dbar = prefabhealthbar3dmesh.transform.GetComponent(JRPGSpaceshipHealthBar3DMesh);
	healthinfo = transform.GetComponent(JRTSSpaceshipUnit);
	healthtext = prefabhealthtext.transform.GetComponent(TextMesh);
}

function LateUpdate(){
	if((health3dbar !=null) &&(healthinfo !=null)&&(healthinfo !=null)){
		var percent = healthinfo.healthpoints / healthinfo.healthpointscap;
		healthtext.text ="HP:" + healthinfo.healthpoints + "/" + healthinfo.healthpointscap;

		//print(percent);
		health3dbar.percent = percent;
	}
}


