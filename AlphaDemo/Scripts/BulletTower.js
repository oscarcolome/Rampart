
private var speed : int = 15;
private var range : float = 30f;
private var distance : float;
var explosion : Transform;


function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(gameObject);
	}
}

function OnTriggerEnter(hit : Collider){
	if(hit.tag== "Bot"){	
		Destroy(hit.gameObject);
		Instantiate(explosion,transform.position,transform.rotation);	
		audio.Play();
		Destroy(gameObject);			
	}
}