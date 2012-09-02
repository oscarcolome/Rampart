function OnCollisionEnter (hit : Collision) {
	if(hit.collider.tag == "Rocket"){
		var a = GameObject.Find("TileArray").GetComponent(Persistent);				
		if(Persistent.boolmatrix[transform.position.z][transform.position.x] >= 0){
			if(Persistent.boolmatrix[transform.position.z][transform.position.x] <= 1){					
				for(var child : Transform in transform){
				//Debug.Log("hit+child z :" +	(child.transform.position.z) + "hit+child x: "+(child.transform.position.x));		
					Persistent.boolmatrix[child.transform.position.z][child.transform.position.x] = 0;
				//Debug.Log("Persistent.boolmatrix[child.position.z][child.position.x]: "+Persistent.boolmatrix[child.position.z][child.position.x]);
				}			
			//Persistent.boolmatrix[hit.transform.position.z][hit.transform.position.x] = 0;				
				Destroy(transform.gameObject);
			}else{
				for(var child : Transform in transform){
				//Debug.Log("hit+child z :" +	(child.transform.position.z) + "hit+child x: "+(child.transform.position.x));		
					Persistent.boolmatrix[child.position.z][child.position.x] = Persistent.boolmatrix[child.position.z][child.position.x] -1;					
				//Debug.Log("Persistent.boolmatrix[child.position.z][child.position.x]: "+Persistent.boolmatrix[child.position.z][child.position.x]);
				}			
			}
		}
	}
}