var meshframe:Transform;

var team_mat_red:Material[];
var mat_selected_red:Material[];

var team_mat_blue:Material[];
var mat_selected_blue:Material[];

var unitinfo;
var bselected:boolean = false;
var bchecked:boolean = true;

function Start(){
	unitinfo = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	
	if(unitinfo.teamid == 0){
		if(team_mat_red.length >0) {
			if(meshframe !=null){
				meshframe.renderer.materials = team_mat_red;	
				//print("team color set");
			}		
		}
	}	
	
	if(unitinfo.teamid == 1){
		if(team_mat_blue.length >0) {
			if(meshframe !=null){
				meshframe.renderer.materials = team_mat_blue;	
				//print("team color set");
			}		
		}
	}	
}


function Update () {
	if(unitinfo !=null){
		
		if(bselected != unitinfo.bselected){
			bselected = unitinfo.bselected;
			bchecked = true;
		}

		if(bchecked == true){
			if(unitinfo.teamid == 0){
				if(bselected){
					if(mat_selected_red.length >0) {
						if(meshframe !=null){
							meshframe.renderer.materials = mat_selected_red;	
							//print("set select mat");
						}		
					}
				}else{
					if(team_mat_red.length >0) {
						if(meshframe !=null){
							meshframe.renderer.materials = team_mat_red;	
							//print("set team color");
						}		
					}
				}
			}
			
			if(unitinfo.teamid == 1){
				if(bselected){
					if(mat_selected_red.length >0) {
						if(meshframe !=null){
							meshframe.renderer.materials = mat_selected_blue;	
							//print("team coloer set");
						}		
					}
				}else{
					if(team_mat_red.length >0) {
						if(meshframe !=null){
							meshframe.renderer.materials = team_mat_blue;	
							//print("team coloer set");
						}		
					}
				}
			}	
			bchecked = false;
		}	
	}else{
		//unitinfo = transform.root.transform.GetComponent(JRTSSpaceshipUnit);
	}
}