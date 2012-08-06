var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
var rocket: Rigidbody;

//Punt de sortida
var waypoints : GameObject[];
var startPoint : Transform;
//Punt d'arribada
var endPoint : Transform;
var last : int;
var count: int;
private var targets: boolean;
private var range = 20;
private var distance;
var rotatespeed = 14f;
var shot : Transform;

function Start(){
	//waypoints = GameObject.FindGameObjectsWithTag("Wall");
	//if(waypoints == null)
		waypoints = GameObject.FindGameObjectsWithTag("Turret");
		targets=true;
		count = waypoints.Length;
		endPoint=waypoints[Random.Range(0,waypoints.length)].transform;
		
			
}

function Update () {

	if(endPoint){
		//Es calcula la distància entre el punt de sortida i el d'arribada
		distance=Vector3.Distance(startPoint.position,endPoint.position);
		//Si encara queda distància per recórrer
		if(distance>range){
			//Es mou l'objecte des del punt de sortida fins al punt d'arribada, amb la velocitat indicada
			//La velocitat es calcula dividint el temps per la distància que queda.
			//Així es fa consant.
    		transform.position = Vector3.Lerp(startPoint.position, endPoint.position,Time.deltaTime* 3/distance);
		}else{
			transform.rotation = Quaternion.Lerp(transform.rotation,Quaternion.LookRotation(endPoint.position-transform.position),Time.deltaTime*rotatespeed);
			if(Time.time >= nextFire){
				Shoot();
			}	
						
			/*Destroy(endPoint.gameObject);
			count = count -1;
			/*if(targets){
				transform.Translate(Vector3.zero);
			}else{
				findWayPoint();
			}*/
		}
	}else{
		//transform.Translate(Vector3.forward* Time.deltaTime* 2);
		findWayPoint();
	}
}

function findWayPoint(){
	for(i=0;i<waypoints.Length;i++){
		if(waypoints[i] != null){
			endPoint = waypoints[i].transform;	
		}else{
			if(count == 0){
				targets=false;	
			}
		}
	}
}

//function OnCollisionEnter(hit : Collision){
//	if(hit.collider.tag == "Rocket"){
//		Destroy(gameObject);	
//	}
//}

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);
}