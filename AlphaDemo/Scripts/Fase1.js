
private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;

private var isred : boolean = false;

private var vista_previa : boolean;
//private var creat : boolean = false;
//var towerFaseEnd : boolean = false;
//var towerFaseStart : boolean = false;

private var screenPos;
private var ray : Ray;
private var hit : RaycastHit;


private var stone_preview : Transform;
private var solid_stone : Transform;

private var cubesPlaced :Transform;



var figura: Array;

var countDownSeconds : int;
private var remainingSeconds : int;

private var xgrid:int;
private var zgrid:int;

var cubes : Transform[];
//var tile : Transform;
//var width : int;
//var height : int;


private var castle : GameObject;
private var stone : Transform;
//private var hitwall : RaycastHit;
//private var yaxis = 50;
private var valor : int = 0;
private var result: int;

private var fase0;
private var colliders : boolean = false;
//private var tiles;


//private var steps = 0;

/*function Awake(){
	DontDestroyOnLoad(transform.gameObject);
}*/

function Start(){
	
	remainingSeconds = countDownSeconds;	
	castle = GameObject.FindGameObjectWithTag("Fortress");
	//fase0 = GameObject.Find("TileArray").GetComponent(Persistent);	
	cubesPlaced = GameObject.Find("CubesList").transform;	
	MarkCastle();
	ResetSafeZone();
				
}

function ResetSafeZone(){
	for(var i=0;i<Persistent.boolmatrix.length;i++){
		for(var j=0;j<Persistent.boolmatrix[i].length;j++){			
			if(Persistent.boolmatrix[j][i] <= 0 ){
				Persistent.boolmatrix[j][i] = 0;
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
	
	for(var x=xgridless; x<xgridmore+1;x++){		
		for(var z=zgridless; z<zgridmore+1;z++){	
			//Debug.Log("Value of boolmatrix"+fase0.boolmatrix[z][x]);	
			Persistent.boolmatrix[z][x] = 1000;			
		}
	}
	//creat=true;
}

//Colocar el contorn de la muralla.
function Update(){
	//com que la funcio update s'executa a cada frame
	//es comprova el temps, si encara queda temps
	//es poden posar cubs
	//si el temps es 0 s'han de canviar les textures dels cubs per paret
	
	if(!colliders){
		ShrinkColliders();
	}
	
	if(restSeconds > 0){
		screenPos = Input.mousePosition;
		ray = Camera.main.ScreenPointToRay(screenPos);
		if(Input.GetButtonDown("Fire1")){
			if(Physics.Raycast(ray,hit)){
				
				//Debug.Log("+fase 1.boolmatrix[j][i]: "+Persistent.boolmatrix[hit.point.z][hit.point.x]);
				hit.point.x = Mathf.Round(hit.point.x);
				hit.point.y = Mathf.Round(hit.point.y);
				hit.point.z = Mathf.Round(hit.point.z);
				if (stone_preview !=  null){
					
				
						figura=ComprovarElement(stone_preview);
				
						if(colocarElement(figura,(GridGenerator.terrainheight-hit.point.z),(hit.point.x))){
							solid_stone=DestroyStone_preview();
							var muralla : Transform = Instantiate(solid_stone,Vector3(hit.point.x,0,hit.point.z), transform.rotation);
							//muralla.transform.renderer.material.SetColor("_Color",Color.blue);
							var sons : Transform;
							for (sons in muralla.GetComponentInChildren(Transform)){
								sons.renderer.material.SetColor("_Color", Color.blue);
							}
							//if(solid_stone == tower){							
							muralla.transform.parent = cubesPlaced;

						}					
				}else{
					CreateStone_preview(hit);
				}	
			}
		}else{
			if(Physics.Raycast(ray,hit)){
				//Debug.Log("I hit at : "+hit.point.x+" tag of "+hit.transform.tag);
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
			//fase0.boolmatrix = fase0.boolmatrix;
			Application.LoadLevel("Fase 2");
		}else{
			//GameObject.Destroy(fase0);
			GameObject.Destroy(cubesPlaced.gameObject);
			GameObject.Destroy(GameObject.Find("TileArray"));
			GameObject.Destroy(GameObject.Find("Fortress"));
			GameObject.Destroy(GameObject.Find("CublesList"));
			GameObject.Destroy(GameObject.Find("TowersList"));
			GameObject.Destroy(GameObject.Find("BotWave"));
			Application.LoadLevel("Menu");
		}
	}
}

function CreateStone_preview(hit:RaycastHit){
	solid_stone = cubes[Random.Range(0,cubes.length)];		
	stone_preview = Instantiate(solid_stone,Vector3(hit.point.x,0,hit.point.z), transform.rotation);
	vista_previa=true;
}

function MoveStone_preview(hit:RaycastHit){
	//hit.transform.position.y = 1;
    stone_preview.transform.position = hit.transform.position;
}

function DestroyStone_preview(){
	Destroy(stone_preview.gameObject);
	vista_previa=false;
	return solid_stone;
}

function ConvertirMuralla(){
	var peces : Transform;
	for(peces in cubesPlaced){
		var sons :Transform;
		for (sons in peces.GetComponentInChildren(Transform)){
			sons.renderer.material.SetColor("_Color", Color.blue);
		}
		peces.transform.tag = "Wall";
	}
}

function ShrinkColliders(){
	var range = GameObject.Find("TowersList").transform;
	for (var alert in range){
		alert.transform.GetComponent(SphereCollider).collider.radius = 1;
	}
	colliders = true;
}


function ComprovarElement(element:Transform){
	switch (element.tag){
							
		case ("Cub"):
			//Debug.Log("És el Cub");
			figura = new Array(2);
			figura[0] = new Array(2);
			figura[1] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
	
		case ("IHoritzontal"):
			//Debug.Log("És la IHoritzontal");
			figura = new Array(1);
			figura[0] = new Array(4);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
		
		case ("IVertical"):
			//Debug.Log("És la IVertical");
			figura = new Array(4);
			for(i=0;i<figura.length;i++){
				figura[i]=new Array(1);
			}
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
			
		case ("L"):
			//Debug.Log("És la L");
			figura = new Array(3);
			figura[0] = new Array(1);
			figura[1] = new Array(1);
			figura[2] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
			
		case ("LGanxoHoritzontal"):
			//Debug.Log("És la LGanxoHoritzontal");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(1);
		
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
			
		case ("LVertical"):
			//Debug.Log("És la LVertical");
			figura = new Array(3);
			for(i=0;i<figura.length;i++){
				figura[i]=new Array(2);
			}
		
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i>0 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}	
			}
			break;
		
		case ("LHoritzontal"):
			//Debug.Log("És la LHoritzontal");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(3);
		
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==0 && j<2)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}	
			}
			break;
			
		case ("LInvertida"):
			//Debug.Log("És la LInvertida");
			figura = new Array(3);
						
			figura[0] = new Array(2);
			figura[1] = new Array(2);
			figura[2] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i<=1 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			
			break;
		
		
		case ("LInvertidaHoritzontal"):
			//Debug.Log("És la LInvertidaHoritzontal");
			figura = new Array(2);
			figura[0] = new Array(1);
			figura[1] = new Array(3);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==0 && j>0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
		
		case ("LInvertidaGanxoVertical"):
			//Debug.Log("És la LGanxoVertical");
			figura = new Array(3);
			figura[0] = new Array(2);
			figura[1] = new Array(1);
			figura[2] = new Array(1);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
			
		case ("LInvertidaGanxoHoritzontal"):
			//Debug.Log("És la LInvertidaGanxoHoritzontal");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(3);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==1 && j<=1)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
		
		case ("T"):
			//Debug.Log("És la T");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==1 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("TAmunt"):
			//Debug.Log("És la TAmunt");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(3);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==0 && (j==0 || j==2))
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("TVertical"):
			//Debug.Log("És la TVertical");
			figura = new Array(3);
			figura[0] = new Array(1);
			figura[1] = new Array(2);
			figura[2] = new Array(1);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
			
		case ("TVerticalInvertida"):
			//Debug.Log("És la TVerticalInvertida");
			figura = new Array(3);
			for(i=0;i<figura.length;i++){
				figura[i] = new Array(2);
			}
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if((i==0 || i==2) && (j==0))
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("Z"):
			//Debug.Log("És la Z");
			figura = new Array(2);
			figura[0] = new Array(2);
			figura[1] = new Array(3);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==1 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("ZVertical"):
			//Debug.Log("És la ZVertical");
			figura = new Array(3);
			figura[0] = new Array(2);
			figura[1] = new Array(2);
			figura[2] = new Array(1);
			
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==0 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("ZInvertidaVertical"):
			//Debug.Log("És la ZInvertidaVertical");
			figura = new Array(3);
			figura[0] = new Array(1);
			figura[1] = new Array(2);
			figura[2] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==2 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
		case ("ZInvertida"):
			//Debug.Log("És la ZInvertida");
			figura = new Array(2);
			figura[0] = new Array(3);
			figura[1] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					if(i==0 && j==0)
						figura[i][j]=false;
					else
						figura[i][j]=true;
				}
			}
			break;
			
	}
	return figura;
}

function colocarElement(matriuNouElement:Array, posY:int, posX:int)
{
	for(var i = 0; i < matriuNouElement.length; i++)
	{
		for(var j = 0; j < matriuNouElement[i].length; j++)
		{
			//Debug.Log("Value of posY+i: "+(posY+i)+" posX+j "+(posX+j));
			//Debug.Log("Value of matriuzona: "+Persistent.boolmatrix[posY+i][posX+j]);
			// només es comprova els punts 'plens' del nou element
			if(matriuNouElement[i][j] == true)
			{
				
				// si alguna part de la peça esta fora dels límits sortim
				if((posY + i) < 0 || (posY + i) >= Persistent.boolmatrix.length || (posX + j) < 0 || (posX + j) >= Persistent.boolmatrix[0].length)
					return false;
									
				if(Persistent.boolmatrix[posY + i][posX + j] >= 1 && Persistent.boolmatrix[posY + i][posX + j] <= 3){
						return false;
				}				
			}
		}
	}
	
	for(i = 0; i < matriuNouElement.length; i++)
	{
		for(j = 0; j < matriuNouElement[i].length; j++)
		{
			if(matriuNouElement[i][j] == true)
			{	
				Persistent.boolmatrix[posY + i][posX + j] = 3;						
			}
		}
	}
	return true;
}


function OnGUI () {
    //make sure that your time is based on when this script was first called
    //instead of when your game started
    //es resta el temps (ni idea) del temps inicial
    
   	restSeconds = remainingSeconds - (Time.timeSinceLevelLoad);
   	//quan el comptador arriba a 0, seguira calculant valors negatius
   	//la funcio max selecciona el maxim entre 0 i el valor del temps
   	//per mantenir el comptador a 0 quan baixi a -1,-2,-3...
   	restSeconds = Mathf.Max(0,restSeconds);

	//display the timer
	roundedRestSeconds = Mathf.CeilToInt(restSeconds);
	//s'extreuen els segons i minuts del temps calculat
    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
	var text : String;
	//format del comptador
    text = String.Format ("Wall the castle: Time remaining: {0:00}:{1:00}", displayMinutes, displaySeconds);
    	
   
    GUI.Label (Rect (100, 10, 300, 40), text);	
       
}

function checkSafeZone(posx : int , posz : int) : int{
	
	if (posx < 0 || posz < 0  || posx >= GridGenerator.terrainwidth || posz >= GridGenerator.terrainheight || valor==-1){
		return -1;
	}
	//Debug.Log("Persistent.boolmatrix[posz][posx]: "+Persistent.boolmatrix[posz][posx]);
	if((Persistent.boolmatrix[posz][posx] >= 1 && Persistent.boolmatrix[posz][posx] <= 3 )||Persistent.boolmatrix[posz][posx] == -5){
		return -5;
	}
		
	Persistent.boolmatrix[posz][posx] = -5;
	valor = Persistent.boolmatrix[posz][posx];
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