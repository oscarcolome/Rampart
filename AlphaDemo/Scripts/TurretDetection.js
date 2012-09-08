
var rocket: Rigidbody;
var rotatespeed : int;
var cannon: Transform;
private var shot : Transform;
var target: Transform;
var fireRate = 0.5f;
private var nextFire = 0.0f;
private var aimError : float;
private var queued=true;
private var range = 30;
private var distance;
private var errorAmount : float = 1f;
private var bullet : Rigidbody;

function Start(){
	
	shot=cannon.FindChild("ShootPoint");
	
}

function Update(){
	
	
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
	}
}

function CalculateAimError(){
	aimError = Random.Range(-errorAmount, errorAmount);
}

function Shoot(){
	nextFire = Time.time + fireRate;
    Instantiate(rocket,shot.position,shot.rotation);        
    
}