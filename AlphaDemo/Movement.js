
//Punt de sortida
var startPoint : Transform;
//Punt d'arribada
var endPoint : Transform;
function Update () {
	
	var distance : float;
	//Es calcula la distància entre el punt de sortida i el d'arribada
	distance=Vector3.Distance(startPoint.position,endPoint.position);
	//Si encara queda distància per recórrer
	if(distance>0){
		//Es mou l'objecte des del punt de sortida fins al punt d'arribada, amb la velocitat indicada
		//La velocitat es calcula dividint el temps per la distància que queda.
		//Així es fa consant.
    	transform.position = Vector3.Lerp (startPoint.position, endPoint.position,Time.deltaTime* 3/distance);
	}
}