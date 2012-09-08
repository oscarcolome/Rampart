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
		Destroy(transform.parent.gameObject);
	}
}