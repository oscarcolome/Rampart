
var tile : Transform;
var width : int = 100;
var height : int = 100;
private var tileParent : Transform;
var boolmatrixcreation : int[,];

function Start () {
	tileParent=GameObject.Find("TileArray").transform;
	GenerateTiles();	
	GenerateHashMap();
	Persistent.boolmatrix = boolmatrixcreation;
	Persistent.tilewidth = width;
	Persistent.tileheight = height;
	Application.LoadLevel("Fase 1");	

	
}

function GenerateHashMap(){
	
	boolmatrixcreation = new int[width,height];	
	for(var i: int = 0;i<boolmatrixcreation.GetLength(0);i++){
		for(var j : int = 0;j<boolmatrixcreation.GetLength(1);j++){
			boolmatrixcreation[i,j]=0;
		}
	}		
}

function GenerateTiles(){
	// Set Tiles

	for(var x = 0; x < width ; x++){
		for(var z = 0; z < height; z++){
			var tiler = Instantiate(tile,Vector3(x,-1,z),Quaternion.identity);
			tiler.parent = tileParent;
			tiler.name = "Tile ("+x+","+z+")";
		}
	}
}