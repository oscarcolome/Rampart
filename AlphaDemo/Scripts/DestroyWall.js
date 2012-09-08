var explosion : Transform;

function OnCollisionEnter (hit : Collision) {	
	if(hit.collider.tag == "Rocket"){			
		if(Persistent.boolmatrix[Persistent.tileheight-transform.position.z][transform.position.x] > 1){
			Persistent.boolmatrix[Persistent.tileheight-transform.position.z][transform.position.x] = Persistent.boolmatrix[Persistent.tileheight-transform.position.z][transform.position.x] - 1;																
		}else{		
			Persistent.boolmatrix[Persistent.tileheight-transform.position.z][transform.position.x] = 0;
			Destroy(transform.gameObject);						
		}
	}
}

function OnTriggerEnter( hit : Collider ){
	if(hit.tag == "Bot"){
		Destroy(hit.transform.gameObject);
		Instantiate(explosion, transform.position, transform.rotation);
		var sons : Transform;
		var daddy : Transform = transform.parent.gameObject.transform;
		for(sons in daddy){
			Debug.Log("Sons? :"+sons.transform);
			Persistent.boolmatrix[Persistent.tileheight-sons.position.z][sons.position.x] = 0;
			Destroy(sons.gameObject);
		}
		Destroy(transform.parent.gameObject);
	}
}