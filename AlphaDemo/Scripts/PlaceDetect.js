private var previousColor : Color;

function OnTriggerEnter(other : Collider){
	if (other.tag == "Fortress"){
		if (previousColor != Color.red)
			previousColor = transform.renderer.material.color;
		transform.renderer.material.color = Color.red;
	}
}

function OnTriggerStay(other : Collider){
	if (other.tag == "Fortress"){
		if (transform.renderer.material.color != Color.red)		
			transform.renderer.material.color = Color.red;
	}
}

function OnTriggerExit(other : Collider){
	if (other.tag == "Fortress")
		transform.renderer.material.color = previousColor;
}
