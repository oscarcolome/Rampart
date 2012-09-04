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