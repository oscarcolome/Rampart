private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;
private var vista_previa : boolean;
private var towersPlaced : Transform;
var countDownSeconds : int;
private var remainingSeconds : int;
var tower : Rigidbody;
private var fase1;
private var preview : Rigidbody;
private var solid : Rigidbody;
private var screenPos;
private var ray : Ray;
private var hit : RaycastHit;
private var grid;
private var wall;
var customskin : GUISkin;
private var figura : boolean[,];
private var i : int;
private var j : int;

var ntowers: int;


function Start () {
	remainingSeconds = countDownSeconds;	
	towersPlaced = GameObject.Find("TowersList").transform;
	if(towersPlaced.GetChildCount() > 0){
		MarkTowers();
	}
	
}

function MarkTowers(){
	for(var child : Transform in towersPlaced.GetComponentInChildren(Transform)){
		Persistent.boolmatrix[child.position.z,child.position.x] = 50;
		Persistent.boolmatrix[child.position.z,child.position.x+1] = 50;
	}	
}

function Update () {

	if(restSeconds > 0){
		screenPos = Input.mousePosition;
		ray = Camera.main.ScreenPointToRay(screenPos);
		if(Input.GetButtonDown("Fire1")){
			if(Physics.Raycast(ray,hit)){
			
				hit.point.x = Mathf.Round(hit.point.x);
				hit.point.y = Mathf.Round(hit.point.y);
				hit.point.z = Mathf.Round(hit.point.z);
				if (preview!= null){
						
					figura=checkTurret(preview);
			
					if(placeTurret(figura,(Persistent.tileheight-hit.point.z),(hit.point.x))){
						solid=DestroyPreview();
						var muralla : Rigidbody = Instantiate(solid,Vector3(hit.point.x,0,hit.point.z), transform.rotation);					
						muralla.transform.parent = towersPlaced;

					}

				}else{
					CreatePreview(hit);
				}	
			}
		}else{
			if(Physics.Raycast(ray,hit)){			
				if(!vista_previa)
					CreatePreview(hit);
				else
					MovePreview(hit);	
			}
		}	
	}else{
		expandRadius();
		Persistent.previousLevel = Application.loadedLevel;
		Application.LoadLevel("Fase 3");
	}
}

function CreatePreview(hit:RaycastHit){
	
	if(ntowers >= 0){
		solid = tower;			
		ntowers--;
	}else{
		solid = null;
		expandRadius();
		remainingSeconds = 0;
		return;			
	}
	preview = Instantiate(solid,Vector3(hit.point.x,0,hit.point.z), transform.rotation);
	vista_previa=true;
}

function MovePreview(hit:RaycastHit){
    preview.transform.position = hit.transform.position;
}

function expandRadius(){
	var turretes : Transform;
	var rangedtower : SphereCollider;
	for(turretes in towersPlaced){
		rangedtower = turretes.transform.GetComponent(SphereCollider);
		rangedtower.radius = 15;	
	}
}

function DestroyPreview(){
	Destroy(preview.gameObject);
	vista_previa=false;
	return solid;
}

function checkTurret(element: Rigidbody){
	figura = new boolean[2,2];
	for(i=0;i<2;i++){
		for(j=0;j<2;j++){
			figura[i,j]=true;
		}
	}
	
	return figura;
}

function placeTurret(matriuNouElement : boolean[,], posY:int, posX:int)
{
	for(var i = 0; i < matriuNouElement.GetLength(0); i++)
	{
		for(var j = 0; j < matriuNouElement.GetLength(1); j++)
		{
			
			if(matriuNouElement[i,j] == true)
			{
			
				if((posY + i) < 0 || (posY + i) >= Persistent.boolmatrix.GetLength(0) || (posX + j) < 0 || (posX + j) >= Persistent.boolmatrix.GetLength(1))
					return false;
								
				if(Persistent.boolmatrix[posY + i,posX + j] != -5)
						return false;							
			}
		}
	}

	for(i = 0; i < matriuNouElement.GetLength(0); i++)
	{
		for(j = 0; j < matriuNouElement.GetLength(1); j++)
		{
			if(matriuNouElement[i,j] == true)
			{					
				Persistent.boolmatrix[posY + i,posX + j] = 50;				
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
	
    text = String.Format ("Towers : {0:00}:{1:00}", displayMinutes, displaySeconds);
    GUI.skin = customskin;
    GUI.Label (Rect (0,0,150,40), text);	
    if(GUI.Button(new Rect(30, 30, 70, 70), "Quit")){		
		GameObject.Destroy(GameObject.Find("TileArray"));
		GameObject.Destroy(GameObject.Find("Fortress"));
		GameObject.Destroy(GameObject.Find("CubesList"));
		GameObject.Destroy(GameObject.Find("TowersList"));
		GameObject.Destroy(GameObject.Find("BotWave"));
		Application.LoadLevel("Menu");    
	}
       
}