var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
var rocket: Rigidbody;
private var errorAmount : float = 1f;
private var aimError : float;
//Punt de sortida
var waypoints : GameObject[];
var startPoint : Transform;
//Punt d'arribada
private var endPoint : Transform;
var last : int;
var count: int;
private var targets: boolean;
private var range = 20;
private var distance;
private var hit : RaycastHit;
var rotatespeed : int;
var shot : Transform;

function Start(){
	//waypoints = GameObject.FindGameObjectsWithTag("Wall");
	//if(waypoints == null)
		waypoints = GameObject.FindGameObjectsWithTag("Wall");
		targets=true;
		count = waypoints.Length;
		
		endPoint=waypoints[Random.Range(0,waypoints.length)].transform;
		//Debug.Log("Number of childs: "+endPoint.transform.GetChildCount());
		endPoint = endPoint.GetChild(Random.Range(0,3));
		
		
		
			
}

function Update () {

	if(endPoint){
		//Es calcula la distància entre el punt de sortida i el d'arribada		
		distance=Vector3.Distance(startPoint.position,endPoint.position);
		/*if(Physics.Raycast(transform.position,Vector3.forward,hit,(distance-10))){
			if(hit.transform.tag == "Wall")
				endPoint = hit.transform.GetChild(Random.Range(0,3));
		}*/
		//Si encara queda distància per recórrer
		if(distance>range){
			//Es mou l'objecte des del punt de sortida fins al punt d'arribada, amb la velocitat indicada
			//La velocitat es calcula dividint el temps per la distància que queda.
			//Així es fa consant.
    		transform.position = Vector3.Lerp(startPoint.position, endPoint.position,Time.deltaTime* 3/distance);
		}else{
			endPoint.position.x = endPoint.position.x + aimError;
			endPoint.position.y = endPoint.position.y + aimError;
			endPoint.position.z = endPoint.position.z + aimError;
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

function CalculateAimError(){
	aimError = Random.Range(-errorAmount, errorAmount);
}

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);
}
