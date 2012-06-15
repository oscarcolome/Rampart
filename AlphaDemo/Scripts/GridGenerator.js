#pragma strict
/*var gridList = new ArrayList();
var tile : Transform;
var width : int;
var height : int;
static var creat = false;

function Update () {

	if(Input.GetButtonDown("Fire1") && (!creat)){
		var screenPos = Input.mousePosition;
		var ray = camera.ScreenPointToRay(screenPos);
		var hit : RaycastHit;
		if(Physics.Raycast(ray,hit)){
			GenerateTiles(hit);
		}
	}

}

function GenerateTiles(hit : RaycastHit){
	// Set Tiles
	//var xhit = (hit.point.x);
	//var zhit = (hit.point.z);
	var xhit = Mathf.Round(hit.point.x);
	var zhit = Mathf.Round(hit.point.z);
	for(var x = (xhit -((width-1)/2)); x < (xhit+(width/2)); x++){
		for(var z = (zhit-((height-1)/2)); z < (zhit+(height/2)); z++){
			var tiler = Instantiate(tile,Vector3(x,0,z),Quaternion.identity);
			gridList.Add(tiler);
			tiler.name = "Tile ("+x+","+z+")";
		}
	}
	creat=true;
}*/