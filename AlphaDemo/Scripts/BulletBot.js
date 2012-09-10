
private var speed : int = 15;
private var range : float = 20f;
private var distance : float;
var explosion : Transform;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	distance += Time.deltaTime * speed;
	if(distance >= range){
		Destroy(transform.gameObject);
	}
}

function OnCollisionEnter(hit : Collision){
			
		Destroy(transform.gameObject);
}