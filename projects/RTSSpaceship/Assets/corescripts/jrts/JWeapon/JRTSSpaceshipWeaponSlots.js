var prefabweapons:jRTSSpaceshipWeapon[];
var weaponlist:Array = new Array();


function Start(){
	for(var  i= 0;i < prefabweapons.length;i++){
		if(prefabweapons[i].prefabobject !=null){
			if(prefabweapons[i].bonesocket != null){
				var weaponprefab = Instantiate(prefabweapons[i].prefabobject,prefabweapons[i].bonesocket.transform.position,prefabweapons[i].bonesocket.transform.rotation);
				if(weaponprefab != null){
					weaponprefab.parent = prefabweapons[i].bonesocket;				
					var turretstation = weaponprefab.transform.GetComponent(JRTSStationTurret);
					if(turretstation !=null){
						turretstation.SetMainShip(transform);
					}
					prefabweapons[i].spawnprefab = weaponprefab;
				}
			}
		}
	}
}


function FireIdx(IDX,bfired){
	if(prefabweapons.length >= 1){//make sure there no weapon error if the slot area empty
		for( prefabwepon in prefabweapons){
			if(prefabwepon !=null){
				if(prefabwepon.weaponcontrolindex == IDX){
					if(prefabwepon.spawnprefab !=null){
						var weaponinfo02 =  prefabwepon.spawnprefab.transform.GetComponent(JRTSSpaceshipWeapProjectile);
						if(weaponinfo02 !=null){
							weaponinfo02.bfire = bfired;
						}
					}
				}
			}
		}
	}
}



function Update () {

}