function OnCollisionEnter (hit : Collision) {
	
	if(hit.collider.tag == "Rocket"){
				
		if(Persistent.boolmatrix[100-transform.position.z][transform.position.x] > 1){
			Persistent.boolmatrix[100-transform.position.z][transform.position.x] = Persistent.boolmatrix[transform.position.z][transform.position.x] - 1;																
		}else{		
			Persistent.boolmatrix[100-transform.position.z][transform.position.x] = 0;
			Destroy(transform.gameObject);						
		}
	}
}