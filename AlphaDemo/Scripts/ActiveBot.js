#pragma strict

private var botActive : Movement;

function Start () {
	
	if (botActive ==  null)
		botActive = transform.GetComponent(Movement);
			
}

function Update () {

	if(Application.loadedLevel == 3|| Application.loadedLevel == 4){
		botActive.enabled = false;
	}else{
		botActive.enabled = true;
	}

}