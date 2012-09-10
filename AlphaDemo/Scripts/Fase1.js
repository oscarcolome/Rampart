
private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;

private var isred : boolean = false;

private var vista_previa : boolean;

private var screenPos;
private var ray : Ray;
private var hit : RaycastHit;

private var i : int;
private var j : int;

private var stone_preview : Transform;
private var solid_stone : Transform;

private var cubesPlaced :Transform;

private var figura: boolean[,];

var countDownSeconds : int;
private var remainingSeconds : int;

private var xgrid:int;
private var zgrid:int;

var cubes : Transform[];

private var castle : GameObject;
private var stone : Transform;

private var valor : int = 0;
private var result: int;

private var colliders : boolean = false;
var customskin : GUISkin;

function Start(){
	
	remainingSeconds = countDownSeconds;	
	castle = GameObject.FindGameObjectWithTag("Fortress");
	cubesPlaced = GameObject.Find("CubesList").transform;	
	MarkCastle();
	ResetSafeZone();
				
}

function ResetSafeZone(){
	for(var i : int = 0;i<100;i++){
		for(var j : int = 0;j<100;j++){			
			if(Persistent.boolmatrix[j,i] <= 0 ){
				Persistent.boolmatrix[j,i] = 0;
			}
		}
	}	
}

function MarkCastle(){
	stone = castle.transform;	
	var xgridless : int = stone.position.x - (stone.localScale.x/2);
	var zgridless : int = stone.position.z - (stone.localScale.z/2);
	var xgridmore : int = stone.position.x + (stone.localScale.x/2);
	var zgridmore : int = stone.position.z + (stone.localScale.z/2);
	
	xgridless = Mathf.Round(xgridless);
	zgridless = Mathf.Round(zgridless);
	xgridmore = Mathf.Round(xgridmore);
	zgridmore = Mathf.Round(zgridmore);
	
	for(var x : int = xgridless; x<xgridmore+1;x++){		
		for(var z : int = zgridless; z<zgridmore+1;z++){	
			Persistent.boolmatrix[z,x] = 1000;			
		}
	}
}

function Update(){

	if(!colliders){
		ShrinkColliders();
	}
	
	if(restSeconds > 0){
		screenPos = Input.mousePosition;
		ray = Camera.main.ScreenPointToRay(screenPos);
		if(Input.GetButtonDown("Fire1")){
			if(Physics.Raycast(ray,hit)){
			
				hit.point.x = Mathf.Round(hit.point.x);
				hit.point.y = Mathf.Round(hit.point.y);
				hit.point.z = Mathf.Round(hit.point.z);
				if (stone_preview !=  null){
					
				
						figura=ComprovarElement(stone_preview);
				
						if(colocarElement(figura,(Persistent.tileheight-hit.point.z),(hit.point.x))){
							solid_stone=DestroyStone_preview();
							var muralla : Transform = Instantiate(solid_stone,Vector3(hit.point.x,0,hit.point.z), transform.rotation);							
							var sons : Transform;
							for (sons in muralla.GetComponentInChildren(Transform)){
								sons.renderer.material.SetColor("_Color", Color.blue);
							}						
							muralla.transform.parent = cubesPlaced;

						}					
				}else{
					CreateStone_preview(hit);
				}	
			}
		}else{
			if(Physics.Raycast(ray,hit)){				
				if(!vista_previa)
					CreateStone_preview(hit);
				else
					MoveStone_preview(hit);	
			}
		}		
	}else{
		if(stone_preview != null)
			DestroyStone_preview();			
			result=checkSafeZone(stone.position.x,stone.position.z);		
		if(result==-5){
			ConvertirMuralla();
			MarkCastle();		
			Application.LoadLevel("Fase 2");
		}else{
			GameObject.Destroy(cubesPlaced.gameObject);
			GameObject.Destroy(GameObject.Find("TileArray"));
			GameObject.Destroy(GameObject.Find("Mayan"));
			GameObject.Destroy(GameObject.Find("CubesList"));
			GameObject.Destroy(GameObject.Find("TowersList"));
			GameObject.Destroy(GameObject.Find("BotWave"));
			Application.LoadLevel("Menu");
		}
	}
}

function CreateStone_preview(hit:RaycastHit){
	solid_stone = cubes[Random.Range(0,cubes.length)];		
	stone_preview = Instantiate(solid_stone,Vector3(hit.point.x,1,hit.point.z), transform.rotation);
	vista_previa=true;
}

function MoveStone_preview(hit:RaycastHit){	
    stone_preview.transform.position = hit.transform.position;
    if(stone_preview.transform.position.y >= -1 && stone_preview.transform.position.y <= 2 )
    	stone_preview.transform.position.y = 2;
}

function DestroyStone_preview(){
	Destroy(stone_preview.gameObject);
	vista_previa=false;
	return solid_stone;
}

function ConvertirMuralla(){
	var peces : Transform;
	for(peces in cubesPlaced){
		var sons : Transform;
		for (sons in peces.GetComponentInChildren(Transform)){
			sons.renderer.material.SetColor("_Color", Color.blue);
		}
		peces.transform.tag = "Wall";
	}
}

function ShrinkColliders(){
	var range : Transform = GameObject.Find("TowersList").transform;
	var ranged : SphereCollider;
	for (var alert : Transform in range){
		ranged = alert.transform.GetComponent(SphereCollider);
		ranged.radius = 1;
	}
	colliders = true;
}


function ComprovarElement(element:Transform){
	switch (element.tag){
							
		case ("Cub"):
			figura = new boolean[2,2];
			for(i=0;i<2;i++){
				for(j=0;j<2;j++){
					figura[i,j]=true;
				}
			}
			break;
	
		case ("IHoritzontal"):
			figura = new boolean[1,4];
			
			for(j=0;j<4;j++){
				figura[0,j]=true;
			}	
			break;
		
		case ("IVertical"):
			figura = new boolean[4,1];
			
			for(i=0;i<4;i++){
				figura[i,0]=true;
			}
			break;
			
		case ("L"):
			figura = new boolean [3,2];
			figura[0,0] = true; 
			figura[1,0] = true;
			figura[2,0] = true;
			figura[2,1] = true;

			break;
			
		case ("LGanxoHoritzontal"):
			figura = new boolean[2,3];
			figura[0,0] = true;
			figura[0,1] = true;
			figura[0,2] = true;
			figura[1,0] = true;
		
			break;
			
		case ("LVertical"):
			figura = new boolean[3,2];
			figura[0,0] = true;
			figura[1,1] = true;
			figura[2,1] = true;
			figura[2,1] = true;
			
			break;
		
		case ("LHoritzontal"):

			figura = new boolean[2,3];
			figura[0,2] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			figura[1,2] = true;
		
			break;
			
		case ("LInvertida"):

			figura = new boolean[3,2];
						
			figura[0,1] = true;
			figura[1,1] = true;
			figura[2,0] = true;
			figura[2,1] = true;
						
			break;
				
		case ("LInvertidaHoritzontal"):
			
			figura = new boolean[2,3];
			figura[0,0] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			figura[1,2] = true;
			
			break;
		
		case ("LInvertidaGanxoVertical"):

			figura = new boolean[3,2];
			figura[0,0] = true;
			figura[1,0] = true;
			figura[2,0] = true;
			figura[0,1] = true;
			
			break;
			
		case ("LInvertidaGanxoHoritzontal"):

			figura = new boolean[2,3];
			figura[0,0] = true;
			figura[0,1] = true;
			figura[0,2] = true;
			figura[1,2] = true;
			
			break;
		
		case ("T"):

			figura = new boolean[2,3];
			figura[0,0] = true;
			figura[0,1] = true;
			figura[0,2] = true;
			figura[1,1] = true;
			
			break;
			
		case ("TAmunt"):

			figura = new boolean[2,3];
			figura[0,1] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			figura[1,2] = true;
			
			break;
			
		case ("TVertical"):

			figura = new boolean[3,2];
			figura[0,0] = true;
			figura[1,0] = true;
			figura[2,0] = true;
			figura[1,1] = true;
			
			break;
			
		case ("TVerticalInvertida"):

			figura = new boolean[3,2];
			figura[1,0] = true;
			figura[0,1] = true;
			figura[1,1] = true;
			figura[2,1] = true;
			
			break;
			
		case ("Z"):

			figura = new boolean[2,3];			
			figura[0,0] = true;
			figura[0,1] = true;
			figura[1,1] = true;
			figura[1,2] = true;
			
			break;
			
		case ("ZVertical"):
			
			figura = new boolean[3,2];
			figura[0,1] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			figura[2,0] = true;
			
			break;
			
		case ("ZInvertidaVertical"):

			figura = new boolean[3,2];
			figura[0,0] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			figura[2,1] = true;
			
			break;
			
		case ("ZInvertida"):

			figura = new boolean[2,3];	
					
			figura[0,1] = true;
			figura[0,2] = true;
			figura[1,0] = true;
			figura[1,1] = true;
			
			break;
			
	}
	return figura;
}

function colocarElement(matriuNouElement : boolean[,] , posY:int, posX:int)
{
	for(var i : int = 0; i < matriuNouElement.GetLength(0); i++)
	{
		for(var j : int = 0; j < matriuNouElement.GetLength(1); j++)
		{

			if(matriuNouElement[i,j] == true)
			{
				
				if((posY + i) < 0 || (posY + i) >= Persistent.boolmatrix.GetLength(0) || (posX + j) < 0 || (posX + j) >= Persistent.boolmatrix.GetLength(1))
					return false;
									
				if(Persistent.boolmatrix[posY + i,posX + j] >= 1 && Persistent.boolmatrix[posY + i,posX + j] <= 3){
						return false;
				}	
				if(Persistent.boolmatrix[posY + i,posX + j] > 3){
						return false;
				}	
			}
		}
	}
	
	for(i = 0; i < matriuNouElement.GetLength(0); i++)
	{
		for(j = 0; j < matriuNouElement.GetLength(1); j++)
		{
			if(matriuNouElement[i,j] == true)
			{	
				Persistent.boolmatrix[posY + i,posX + j] = 3;						
			}
		}
	}
	return true;
}


function OnGUI () {
    
   	restSeconds = remainingSeconds - (Time.timeSinceLevelLoad);

   	restSeconds = Mathf.Max(0,restSeconds);

	roundedRestSeconds = Mathf.CeilToInt(restSeconds);

    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
	var text : String;

    text = String.Format ("Walls : {0:00}:{1:00}", displayMinutes, displaySeconds);
    
    GUI.skin = customskin;   
    GUI.Label (Rect (0,0,150,40), text);	
    if(GUI.Button(new Rect(30, 30, 70, 70), "Quit")){
		GameObject.Destroy(cubesPlaced.gameObject);
		GameObject.Destroy(GameObject.Find("TileArray"));
		GameObject.Destroy(GameObject.Find("Fortress"));
		GameObject.Destroy(GameObject.Find("CubesList"));
		GameObject.Destroy(GameObject.Find("TowersList"));
		GameObject.Destroy(GameObject.Find("BotWave"));		
		Application.LoadLevel("Menu");
    } 
}

function checkSafeZone(posx : int , posz : int) : int{
	
	if (posx < 0 || posz < 0  || posx >= Persistent.tilewidth || posz >= Persistent.tileheight || valor==-1){
		return -1;
	}

	if((Persistent.boolmatrix[posz,posx] >= 1 && Persistent.boolmatrix[posz,posx] <= 3 )||Persistent.boolmatrix[posz,posx] == -5){
		return -5;
	}
	
	Persistent.boolmatrix[posz,posx] = -5;

		
	//west	
	valor=checkSafeZone((posx-1),posz);
	//east
	valor=checkSafeZone((posx+1),posz);
	//north
	valor=checkSafeZone(posx,(posz+1));
	//south
	valor=checkSafeZone(posx,(posz-1));
		
	return valor;
	
	
}