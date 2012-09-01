/*function OnCollisionEnter(hit : Collision){
		
		var a = GameObject.Find("Creation").GetComponent(Fase1);
		Debug.Log("a.boolmatrix[transform.position.z][transform.position.x]"+a.boolmatrix[transform.position.z][transform.position.x]);
		if(a.boolmatrix[transform.position.z][transform.position.x] > 0){
			if(a.boolmatrix[transform.position.z][transform.position.x] == 1){			
				pieces = GameObject.Find("Creation").GetComponent(Fase1).cubesPlaced;				
				pieces.Remove(transform.rigidbody);
				Destroy(transform.gameObject);
				//Destroy(hit.gameObject);
				a.boolmatrix[transform.position.z][transform.position.x] = 0;
			}else{
				a.boolmatrix[transform.position.z][transform.position.x]=a.boolmatrix[transform.position.z][transform.position.x]-1;					
			}
		}
		//Destroy(this.gameObject);
		//Destroy(gameObject);	
	//else if(hit.collider.tag == "Wall"){
		//hit.transform.position
	//}
}*/