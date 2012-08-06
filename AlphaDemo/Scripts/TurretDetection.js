var rocket: Rigidbody;
var rotatespeed = 15f;
var cannon: Transform;
var shot : Transform;
var target: Transform;
var othertargets : GameObject[];
var fireRate = 0.5f;
//private var rotationDir : Quaternion;
//private var nextMoveTime : float; 
private var nextFire = 0.0f;
private var aimError : float;
private var queued=true;
private var range = 30;
private var distance;

function Start(){
	othertargets = GameObject.FindGameObjectsWithTag("Bot");
	shot=cannon.FindChild("ShootPoint");
}

function Update(){
	if(target){
		distance = distance=Vector3.Distance(transform.position,target.position);
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

	}else if (target != null && coll.tag == "Bot"){
		queued=false;
		var i=0;
		while(!queued && i<othertargets.Length){
			if(othertargets[i] == null){
				othertargets[i] = coll.gameObject;
				queued = true;
			}
			i++;
		}
	}
}

function OnTriggerStay(coll: Collider){
	if(target == null && coll.tag == "Bot"){
		var i=0;
		while(target == null && i<othertargets.Length) {
			if (othertargets[i] != null && transform.collider.bounds.Contains(othertargets[i].transform.position)){
				target=othertargets[i].transform;
			}
			i++;
		}
	}
}

function OnTriggerExit(coll: Collider){
	//Si l'objectiu surt dels limits
	if(coll.gameObject.transform == target){
		target = null;
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