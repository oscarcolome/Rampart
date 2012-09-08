#pragma strict

private var turretActive : TurretDetection;

function Start () {
	
	if (turretActive ==  null)
		turretActive = transform.GetComponent(TurretDetection);

}

function Update () {

	if(Application.loadedLevel == 3 || Application.loadedLevel == 4){
		turretActive.enabled = false;
	}else{
		turretActive.enabled = true;
	}

}