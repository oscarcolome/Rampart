
import System.Collections.Generic;
private var speed : int = 15;
private var range : float = 30f;
private var distance : float;



function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
	if(hit.collider.tag== "Bot"){
		var scan = GameObject.Find("BotWave");		
		Destroy(hit.gameObject);		
		Destroy(gameObject);			
	}
	
		//hit.transform.position
	//}
}