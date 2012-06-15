var rocket: Rigidbody;
var rotatespeed = 15f;
var cannon: Transform;
var shot : Transform;
var target: Transform;
var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
private var aimError : float;



function Update(){
	if(target){
		cannon.rotation = Quaternion.Lerp(cannon.rotation,Quaternion.LookRotation(target.position-cannon.position),Time.deltaTime*rotatespeed);
		if(Time.time >= nextFire){
			Shoot();
		}
	}
	
}

function OnTriggerEnter(coll: Collider){
	//Si es detecta un objecte amb l'etiqueta "Bot"
	if(coll.tag == "Bot"){
		
		target=coll.gameObject.transform;
			
	}
}

function OnTriggerExit(coll: Collider){
	//Si l'objectiu surt dels limits
	if(coll.gameObject.transform == target){
		target=null;
	}
}

/*function CalculateAim(pos : Vector3){
	var aimpos = Vector3(pos.x,pos.y,pos.z);
	rotationDir = Quaternion.LookRotation(cannon.position-aimpos);
	
}*/

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);
}