private var nChild : int;
function Start () {
	nChild = transform.GetChildCount();
}

function Update () {
	nChild = transform.GetChildCount();
	if(nChild == 0){
		Persistent.boolmatrix[transform.position.z][transform.position.x]= 0;
		Destroy(transform.gameObject);
	}
}