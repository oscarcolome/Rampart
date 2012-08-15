#pragma strict
var speed : float;
var range : float;
private var distance : float;


function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
	if(hit.collider.tag == "Bot"){
		Destroy(gameObject);	
	}//else if(hit.collider.tag == "Wall"){
		//hit.transform.position
	//}
}