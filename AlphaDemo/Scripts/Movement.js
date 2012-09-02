import System.Collections.Generic;
var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
var rocket: Rigidbody;
private var errorAmount : float = 1f;
private var aimError : float;
//Punt de sortida
//var waypoints : List.<Rigidbody>;
var startPoint : Transform;
//Punt d'arribada
var endPoint : Transform;
var last : int;
var count: int;
private var targets: boolean;
private var range = 20;
private var distance;
private var hit : RaycastHit;
var rotatespeed : int;
var shot : Transform;
private var piece : Rigidbody;
private var fort : Transform;
private var bullet : Rigidbody;

function Start(){
	//waypoints = GameObject.FindGameObjectsWithTag("Wall");
	//if(waypoints == null)
		//waypoints = GameObject.Find("Creation").GetComponent(Fase1).cubesPlaced;
	fort = GameObject.Find("CubesList").transform;
	endPoint = fort.GetChild(Random.Range(0,fort.childCount));
		//targets=true;
		//count = waypoints.Count;		
		//piece=waypoints[Random.Range(0,waypoints.Count)];		
		//Debug.Log("Number of childs: "+endPoint.transform.GetChildCount());
		//endPoint = piece.transform.GetChild(Random.Range(0,3));
		//Debug.Log("Value of endPoint now : "+endPoint);
		
		
		
			
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
			if(Vector3.Angle((endPoint.position-transform.position),transform.forward) <.1){
				if(Time.time >= nextFire){
					Shoot();				
				}
			}else{
				transform.rotation = Quaternion.Lerp(transform.rotation,Quaternion.LookRotation(endPoint.position-transform.position),Time.deltaTime*rotatespeed);					
			}
			/*else if(bulletbot != null){	
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
		
	}else{
		//transform.Translate(Vector3.forward* Time.deltaTime* 2);
		findWayPoint();
	}
}

function findWayPoint(){
	while(endPoint == null){		
		
			endPoint=fort.GetChild(Random.Range(0,fort.childCount)).GetChild(Random.Range(0,3));
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
