private var previousColor : Color;

function OnTriggerEnter(other : Collider){
	if (previousColor != Color.red)
		previousColor = transform.renderer.material.color;
	transform.renderer.material.color = Color.red;
}

function OnTriggerStay(other : Collider){
	if (transform.renderer.material.color != Color.red)		
		transform.renderer.material.color = Color.red;
}

function OnTriggerExit(other : Collider){
	transform.renderer.material.color = previousColor;
}
