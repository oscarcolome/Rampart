private var nChild : int;
function Start () {
	nChild = transform.GetChildCount();
}

function Update () {
	nChild = transform.GetChildCount();
	//Debug.Log(nChild);
	if(nChild == 0){		
		Destroy(transform.gameObject);
	}
}