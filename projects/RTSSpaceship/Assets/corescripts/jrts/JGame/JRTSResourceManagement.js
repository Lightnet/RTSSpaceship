
static var teamresource:Array = new Array();//team resource that they will handle
static var planetresource:Array = new Array();//planet resource that they will handle

function Start(){
	var team0 = new JRTSResourceData();
	team0.teamid = 0;
	team0.metals = 1000;
	team0.crystals = 1000;
	team0.fuels = 1000;
	team0.credits = 1000;
	teamresource.Add(team0);	
	
	var team1 = new JRTSResourceData();
	team1.teamid = 1;
	teamresource.Add(team1);
	CheckstorageMaxTeams();
}


function Update () {

}

static function ResourcesAdd(p_id,r_type,p_point){
	//print("checking res..."+teamresource.length);
	for (var i = 0; i < teamresource.length;i++){
		//print("team id"+teamresource[i].teamid);
		if(teamresource[i].teamid == p_id){
			if(r_type == "metal"){
				teamresource[i].metals += p_point;			
			}
			if(r_type == "credit"){
				teamresource[i].credits += p_point;			
			}
			if(r_type == "crystal"){
				teamresource[i].crystals += p_point;			
			}
			if(r_type == "fuel"){
				teamresource[i].fuels += p_point;			
			}
			//print("metals:"+ teamresource[i].metals + " crystals:"+ teamresource[i].crystals +" fuels:"+ teamresource[i].fuels +" credits:"+ teamresource[i].credits);
			break;
		}
	}
}

function OnGUI(){
	//print("checking res..."+teamresource.length);
	for (var i = 0; i < teamresource.length;i++){
		//print("team id"+teamresource[i].teamid);
		if(teamresource[i].teamid == JRTSGameConfig.TeamID){
			GUI.Label(Rect(0,Screen.height -20,300,20),"metals:"+ teamresource[i].metals+"/" + teamresource[i].metalsmax + " crystals:"+ teamresource[i].crystals +"/" + teamresource[i].crystalsmax +" fuels:"+ teamresource[i].fuels +"/" + teamresource[i].fuelsmax +" credits:"+ teamresource[i].credits);
			//print("metals:"+ teamresource[i].metals + " crystals:"+ teamresource[i].crystals +" fuels:"+ teamresource[i].fuels +" credits:"+ teamresource[i].credits);
			break;
		}
	}
}


static function CheckstorageMaxTeams(){
	var JRTSResources : JRTSResourceInfo[] = FindObjectsOfType(JRTSResourceInfo) as JRTSResourceInfo[];	

	for (var i = 0; i < teamresource.length;i++){
		//print("team id"+teamresource[i].teamid);
		if(teamresource[i].teamid == i){
			//GUI.Label(Rect(0,Screen.height -20,300,20),"metals:"+ teamresource[i].metals + " crystals:"+ teamresource[i].crystals +" fuels:"+ teamresource[i].fuels +" credits:"+ teamresource[i].credits);			
			var metalsmax = 0;
			var fuelsmax = 0;
			var crystalsmax = 0;

			for (RTSResource in JRTSResources){
				RTSResource.GetTeamID();
				if((RTSResource.ResourceType == "storage") &&(RTSResource.teamid == teamresource[i].teamid)){				
					metalsmax += RTSResource.StorageMax;
					fuelsmax += RTSResource.StorageMax;
					crystalsmax += RTSResource.StorageMax;
				}
			}
			
			teamresource[i].metalsmax = metalsmax;
			teamresource[i].fuelsmax = fuelsmax;
			teamresource[i].crystalsmax = crystalsmax;
		}
	}
}




