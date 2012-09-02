
private var speed : int = 15;
private var range : float = 20f;
private var distance : float;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(transform.gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
		
		//var a = GameObject.Find("TileArray").GetComponent(Persistent);				
		/*if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] >= 0){
			if(a.boolmatrix[hit.transform.position.z][hit.transform.position.x] <= 1){
				var shock = transform.parent.gameObject.GetComponent(Movement).endPoint;			
				//Debug.Log("a.boolmatrix[hit.transform.position.z][hit.transform.position.x]: "+hit.transform.position.z+" "+hit.transform.position.x);
				for(var child : Transform in shock.transform){
					Debug.Log("hit+child z :" +	(child.transform.position.z) + "hit+child x: "+(child.transform.position.x));		
					a.boolmatrix[child.position.z][child.position.x] = 0;
					Debug.Log("a.boolmatrix[child.position.z][child.position.x]: "+a.boolmatrix[child.position.z][child.position.x]);
				}			
				//a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = 0;
				Destroy(hit.gameObject);
			}else{
				a.boolmatrix[hit.transform.position.z][hit.transform.position.x] = a.boolmatrix[hit.transform.position.z][hit.transform.position.x] -1;					
			}
		}*/
		
		Destroy(transform.gameObject);
		//Destroy(gameObject);	
	//else if(hit.collider.tag == "Wall"){
		//hit.transform.position
	//}
}