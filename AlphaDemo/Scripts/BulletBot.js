private var speed : int = 15;
private var range : float = 20f;
private var distance : float;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
		
		var a = GameObject.Find("Creation").GetComponent(Fase1);
		
		if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] > 0){
			if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] == 1){			
				Destroy(hit.transform.gameObject);
				a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = 0;
			}else{
				a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = a.boolmatrix[hit.transform.position.z][hit.transform.position.x] -1;	
			}
		}
		Destroy(this.gameObject);
		//Destroy(gameObject);	
	//else if(hit.collider.tag == "Wall"){
		//hit.transform.position
	//}
}