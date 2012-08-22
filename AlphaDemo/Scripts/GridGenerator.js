var castle :Transform;	
var gridList = new ArrayList();
var tile : Transform;
var width : int = 100;
var height : int = 100;
static var creat = false;
static var terrainwidth : int;
static var terrainheight : int;



function Start () {

	GenerateTiles();	
	//GenerateCastle();
	Game.startingphase=true;
	
}

function GenerateCastle(){
	
	var posx=Random.Range(10,width);
	var posz=Random.Range(10,height);
	
	//fortLimit = Random.Range(2,3);
	//for(var h=0;h<fortLimit;h++){		
		Instantiate(castle,	Vector3(posx,0,posz),transform.rotation);
	//}
	
	//Instantiate(castle,Vector3((width/2),(stone.localScale.y/2),(height/2)),transform.rotation);
	
}



function GenerateTiles(){
	// Set Tiles
//	xgrid = hit.point.x -((width)/2);
//	zgrid = hit.point.z +(height/2);
//	for(var x = (hit.point.x -((width-1)/2)); x < (hit.point.x+(width/2)); x++){
//		for(var z = (hit.point.z-((height-1)/2)); z < (hit.point.z+(height/2)); z++){
//			var tiler = Instantiate(tile,Vector3(x,0,z),Quaternion.identity);
//			gridList.Add(tiler);
//			tiler.name = "Tile ("+x+","+z+")";
//		}
//	}
	
	for(var x = 0; x < width ; x++){
		for(var z = 0; z < height; z++){
			//Debug.Log("valor de x "+x+" i z "+z);
			var tiler = Instantiate(tile,Vector3(x,-1,z),Quaternion.identity);
			gridList.Add(tiler);
			tiler.name = "Tile ("+x+","+z+")";
		}
	}
	terrainwidth = width;
	terrainheight = height;
	
	creat=true;
}