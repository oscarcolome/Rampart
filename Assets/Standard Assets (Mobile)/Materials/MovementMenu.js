import System.Collections.Generic;
var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
var rocket: Rigidbody;
private var errorAmount : float = 1f;
private var aimError : float;
//Punt de sortida
//Punt d'arribada
var endPoint : Transform;
private var range = 20;
private var distance : float;
private var hit : RaycastHit;
var rotatespeed : int;
var shot : Transform;
private var piece : Rigidbody;
private var rotationstate;
var startPoint : Transform;

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
			rotationstate =  Quaternion.Lerp(transform.rotation,Quaternion.LookRotation(endPoint.position-transform.position),Time.deltaTime*rotatespeed);
			
			if (rotationstate != Quaternion.identity){
				transform.rotation = rotationstate;
			}
			else{
				if(Time.time >= nextFire){
					Shoot();				
				}
			}/*else if(bulletbot != null){	
				if(bulletbot.transform.){
					waypoints.Remove(piece);
				}
			}*/
			/*Destroy(endPoint.gameObject);
			count = count -1;
			/*if(targets){
				transform.Translate(Vector3.zero);
			}else{
				findWayPoint();
			}*/
		}	
	}
}

function CalculateAimError(){
	aimError = Random.Range(-errorAmount, errorAmount);
}

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);
}
