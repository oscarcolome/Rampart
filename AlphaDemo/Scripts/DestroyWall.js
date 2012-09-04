function OnCollisionEnter (hit : Collision) {
	if(hit.collider.tag == "Rocket"){
	
		Debug.Log("Value of Persistent.boolmatrix[transform.position.z][transform.position.x]: "+Persistent.boolmatrix[transform.position.z][transform.position.x]);
		Debug.Log("Value of positions x: "+transform.position.x+" z: "+transform.position.z);
		
		if(Persistent.boolmatrix[transform.position.z][transform.position.x] > 0){
			Persistent.boolmatrix[transform.position.z][transform.position.x] = Persistent.boolmatrix[transform.position.z][transform.position.x] - 1;																
		}else{			
			Persistent.boolmatrix[transform.position.z][transform.position.x] = 0;
			Destroy(transform.gameObject);						
		}
	}
}