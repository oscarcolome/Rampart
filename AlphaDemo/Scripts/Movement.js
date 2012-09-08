#pragma strict
var fireRate : float = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire : float = 0.0f;
var rocket: Rigidbody;
private var errorAmount : float = 1f;
private var aimError : float;
//Punt de sortida
var startPoint : Transform;
//Punt d'arribada
var endPoint : Transform;
private var dad : Transform;

private var targets: boolean;
private var range = 20;
private var distance : float;
private var hit : RaycastHit;
var rotatespeed : int;
var shot : Transform;
private var piece : Rigidbody;
private var fort : Transform;
private var bullet : Rigidbody;

function Start(){

	fort = GameObject.Find("CubesList").transform;
	dad = fort.GetChild(Random.Range(0,fort.childCount));
	endPoint = dad.GetChild(Random.Range(0,dad.childCount));

			
}

function Update () {

	if(Application.loadedLevel == 2 || Application.loadedLevel == 3 && this.enabled){
		this.enabled=false;
	}else{
		this.enabled=true;
	}

	if(endPoint){
		//Es calcula la distància entre el punt de sortida i el d'arribada		
		distance=Vector3.Distance(startPoint.position,endPoint.position);
		//Si encara queda distància per recórrer
		if(distance>=range){
			//Es mou l'objecte des del punt de sortida fins al punt d'arribada, amb la velocitat indicada
			//La velocitat es calcula dividint el temps per la distància que queda.
			//Així es fa consant.
    		transform.position = Vector3.Lerp(startPoint.position, endPoint.position,Time.deltaTime* 6/distance);
		}else{
			endPoint.position.x = endPoint.position.x + aimError;
			endPoint.position.y = endPoint.position.y + aimError;
			endPoint.position.z = endPoint.position.z + aimError;			
			if(Vector3.Angle((endPoint.position-transform.position),transform.forward) <.1){
				if(Time.time >= nextFire){
					Shoot();				
				}
			}else{
				transform.rotation = Quaternion.Lerp(transform.rotation,Quaternion.LookRotation(endPoint.position-transform.position),Time.deltaTime*rotatespeed);					
			}		
		}
		
	}else{
		findWayPoint();
	}
}

function findWayPoint(){
	while(endPoint == null){				
			dad = fort.GetChild(Random.Range(0,fort.childCount));
			endPoint = dad.GetChild(Random.Range(0,dad.childCount));
	}
}

function CalculateAimError(){
	aimError = Random.Range(-errorAmount, errorAmount);
}

function Shoot(){
	nextFire = Time.time + fireRate;
    bullet=Instantiate(rocket,shot.position,shot.rotation);
    bullet.transform.parent = transform;
}
