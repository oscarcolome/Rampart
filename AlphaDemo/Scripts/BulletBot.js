import System.Collections.Generic;

private var speed : int = 15;
private var range : float = 20f;
private var distance : float;
private var pieces : List.<Rigidbody>;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(transform.gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
		
		var a = GameObject.Find("CubesList").GetComponent(Persistent);		
		Debug.Log("a.boolmatrix[hit.transform.position.z][hit.transform.position.x]"+a.boolmatrix[hit.transform.position.z][hit.transform.position.x]);
		if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] >= 0){
			if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] <= 1){			
				Destroy(hit.gameObject);
				a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = 0;
			}else{
				a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = a.boolmatrix[hit.transform.position.z][hit.transform.position.x] -1;					
			}
		}
		Destroy(transform.gameObject);
		//Destroy(gameObject);	
	//else if(hit.collider.tag == "Wall"){
		//hit.transform.position
	//}
}