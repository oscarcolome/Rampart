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

var ntowers: int;


function Start () {
	remainingSeconds = countDownSeconds;
	//grid = GameObject.Find("TileArray").GetComponent(Persistent);
	//wall = GameObject.Find("CubesList");
	towersPlaced = GameObject.Find("TowersList").transform;
	if(towersPlaced.GetChildCount() > 0){
		MarkTowers();
	}
	
}

function MarkTowers(){
	for(var child in towersPlaced.GetComponentInChildren(Transform)){
		Persistent.boolmatrix[child.position.z][child.position.x] = 50;
		Persistent.boolmatrix[child.position.z][child.position.x+1] = 50;
	}	
}

function Update () {

	if(restSeconds > 0){
		screenPos = Input.mousePosition;
		ray = Camera.main.ScreenPointToRay(screenPos);
		if(Input.GetButtonDown("Fire1")){
			if(Physics.Raycast(ray,hit)){
			//Debug.Log("I hit at: x: "+hit.point.x+" y: "+hit.point.y+" z: "+hit.point.z);
				//Debug.Log("fase 2.boolmatrix[j][i]: "+Persistent.boolmatrix[hit.point.z][hit.point.x]);
				hit.point.x = Mathf.Round(hit.point.x);
				hit.point.y = Mathf.Round(hit.point.y);
				hit.point.z = Mathf.Round(hit.point.z);
				if (preview!= null){
						
					figura=checkTurret(preview);
			
					if(placeTurret(figura,(Persistent.tileheight-hit.point.z),(hit.point.x))){
						solid=DestroyPreview();
						var muralla : Rigidbody = Instantiate(solid,Vector3(hit.point.x,0,hit.point.z), transform.rotation);
						//if(solid == tower){							
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
		Application.LoadLevel("Fase 3");
	}
}

function CreatePreview(hit:RaycastHit){
	
	if(ntowers >= 0){
		solid = tower;			
		ntowers--;
	}else{
		solid = null;
		//towerFaseEnd=true;
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
	for(turretes in towersPlaced){
		turretes.transform.GetComponent(SphereCollider).collider.radius = 30;	
	}
}

function DestroyPreview(){
	Destroy(preview.gameObject);
	vista_previa=false;
	return solid;
}

function checkTurret(element: Rigidbody){
	figura = new Array(1);
	figura[0] = new Array(2);
	for(i=0;i<figura.length;i++){
		for(j=0;j<figura[i].length;j++){
			figura[i][j]=true;
		}
	}
	return figura;
}

function placeTurret(matriuNouElement:Array, posY:int, posX:int)
{
	for(var i = 0; i < matriuNouElement.length; i++)
	{
		for(var j = 0; j < matriuNouElement[i].length; j++)
		{
			//Debug.Log("Value of posY+i: "+(posY+i)+" posX+j "+(posX+j));
			//Debug.Log("Value of matriuzona: "+grid.boolmatrix[posY+i][posX+j]);
			// només es comprova els punts 'plens' del nou element
			if(matriuNouElement[i][j] == true)
			{
				
				// si alguna part de la peça esta fora dels límits sortim
				if((posY + i) < 0 || (posY + i) >= Persistent.boolmatrix.length || (posX + j) < 0 || (posX + j) >= Persistent.boolmatrix[0].length)
					return false;
								
				if(Persistent.boolmatrix[posY + i][posX + j] != -5)
						return false;
								
			}
		}
	}
	//var gridpos :GameObject ;
	// si arribem aquí es pot dibuixar la peça sense comprovar res més
	for(i = 0; i < matriuNouElement.length; i++)
	{
		for(j = 0; j < matriuNouElement[i].length; j++)
		{
			if(matriuNouElement[i][j] == true)
			{					
				Persistent.boolmatrix[posY + i][posX + j] = 50;				
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
	
    text = String.Format ("Towers: Time remaining: {0:00}:{1:00}", displayMinutes, displaySeconds);
    
    GUI.Label (Rect (100, 10, 300, 40), text);	    
       
}