import System.Collections.Generic;
var rocket: Rigidbody;
var rotatespeed : int;
var cannon: Transform;
var shot : Transform;
var target: Transform;
var scan : List.<Rigidbody>;
var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
private var aimError : float;
private var queued=true;
private var range = 30;
private var distance;
private var errorAmount : float = 1f;
private var bullet : Rigidbody;

function Start(){
	
	shot=cannon.FindChild("ShootPoint");
	//Debug.Log("Value of scan : "+scan);
	
}

function Update(){
	if(scan == null){
		
	}	
	if(target){
		distance = Vector3.Distance(transform.position,target.position);
		target.position.x = target.position.x + aimError;
		target.position.y = target.position.y + aimError;
		target.position.z = target.position.z + aimError;
		cannon.rotation = Quaternion.Lerp(cannon.rotation,Quaternion.LookRotation(target.position-cannon.position),Time.deltaTime*rotatespeed);
		if(distance <= range && Time.time >= nextFire){
				Shoot();						
		}
	}
}



function OnTriggerEnter(coll: Collider){
	//Si es detecta un objecte amb l'etiqueta "Bot"
	if(target == null && coll.tag == "Bot"){
		target=coll.gameObject.transform;		
	}
}

function OnTriggerStay(coll: Collider){	
	if(target == null && coll.tag == "Bot"){
		target=coll.gameObject.transform;
		//target = GameObject.FindGameObjectWithTag("Bot").transform;
	}	
}

function OnTriggerExit(coll: Collider){
	//Si l'objectiu surt dels limits
	if(coll.gameObject.transform == target){
		target = null;		
		/*i=0;
		while(target == null && i<othertargets.Length){
			if (othertargets[i] != null && transform.collider.bounds.Contains(othertargets[i].transform.position)){
				target=othertargets[i].transform;
			}
			i++;			
		}*/
	}
}

function ScanBots(){
	scan = GameObject.Find("Creation").GetComponent(Fase3).wave;
}

function CalculateAimError(){
	aimError = Random.Range(-errorAmount, errorAmount);
}

/*function CalculateAim(pos : Vector3){
	var aimpos = Vector3(pos.x,pos.y,pos.z);
	rotationDir = Quaternion.LookRotation(cannon.position-aimpos);
	
}*/

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);        
    
}