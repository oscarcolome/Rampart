
var cube : Rigidbody;

private var restSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
private var startTime : int;
private var roundedRestSeconds : int;


private var screenPos;
private var ray;
private var hit : RaycastHit;
private var vista_previa : boolean;

private var preview : Rigidbody;
private var solid : Rigidbody;
private var cubesPlaced = new ArrayList();

var boolmatrix: Array;
var figura: Array;

var countDownSeconds : int;

private var xgrid:int;
private var zgrid:int;

var cubes : Rigidbody[];
private var gridList =new ArrayList();
var tile : Transform;
var width : int;
var height : int;
static var creat = false;
var film : Camera ;


//Colocar el contorn de la muralla.
function Update(){
	//com que la funcio update s'executa a cada frame
	//es comprova el temps, si encara queda temps
	//es poden posar cubs
	//si el temps es 0 s'han de canviar les textures dels cubs per parets 
	screenPos = Input.mousePosition;
	ray = film.ScreenPointToRay(screenPos);
	
	if(Input.GetButtonDown("Fire1")){
		//screenPos = Input.mousePosition;
		//ray = film.ScreenPointToRay(screenPos);
		if(Physics.Raycast(ray,hit)){
			hit.point.x = Mathf.Round(hit.point.x);
			hit.point.y = Mathf.Round(hit.point.y);
			hit.point.z = Mathf.Round(hit.point.z);
			if(!creat){
				GenerateTiles(hit);
				GenerateHashMap();	
			}else{
				 if((hit.collider.tag == "Plane")||(hit.collider.tag == "Untagged")){
				//PlaceCube(hit);
				//boolmatrix[zgrid-hit.point.z][hit.point.x-xgrid] = true;<------------------------------------------
				//solid = cubes[Random.Range(0,cubes.length)];<------------------------------------------
				
					figura=ComprovarElement(preview);
				
					if(colocarElement(boolmatrix,figura,(zgrid-hit.point.z),(hit.point.x-xgrid))){
						solid=DestroyPreview();
						var muralla : Rigidbody = Instantiate(solid,Vector3(hit.point.x,1,hit.point.z), transform.rotation); 
						cubesPlaced.Add(muralla);
					}
				}else{
				
					Debug.Log("Tag del que he clicat "+hit.collider.tag);
				}	
			}
		}
	}else{
		if(Physics.Raycast(ray,hit)){
			if(!vista_previa){
				CreatePreview(hit);
			}else{
				MovePreview(hit);
			}	
		}
	}
}

function CreatePreview(hit:RaycastHit){
	solid = cubes[Random.Range(0,cubes.length)];
	preview = Instantiate(solid,Vector3(hit.point.x,1,hit.point.z), transform.rotation);
	vista_previa=true; 
	
}

function MovePreview(hit:RaycastHit){
    preview.transform.position = hit.transform.position;
}


function DestroyPreview(){
	Destroy(preview.gameObject);
	vista_previa=false;
	return solid;
}


//Hashtable amb clau Vector3 per indexar les taules.
//Hashmap 

function ComprovarElement(element:Rigidbody){
	switch (element.tag){
		case ("IHoritzontal"):
			Debug.Log("És la IHoritzontal");
			figura = new Array(1);
			figura[0] = new Array(4);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
		
		case ("IVertical"):
			Debug.Log("És la IVertical");
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
			Debug.Log("És la L");
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
			Debug.Log("És la LGanxoHoritzontal");
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
			Debug.Log("És la LVertical");
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
			Debug.Log("És la LHoritzontal");
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
		
		
		case ("LInvertidaHoritzontal"):
			Debug.Log("És la LInvertidaHoritzontal");
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
			Debug.Log("És la LGanxoVertical");
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

		case ("LInvertida"):
			Debug.Log("És la LInvertida");
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
			
		case ("LInvertidaGanxoHoritzontal"):
			Debug.Log("És la LInvertidaGanxoHoritzontal");
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
				
		case ("Cub"):
			Debug.Log("És el Cub");
			figura = new Array(2);
			figura[0] = new Array(2);
			figura[1] = new Array(2);
			for(i=0;i<figura.length;i++){
				for(j=0;j<figura[i].length;j++){
					figura[i][j]=true;
				}
			}
			break;
		
		case ("T"):
			Debug.Log("És la T");
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
			
		case ("TVertical"):
			Debug.Log("És la TVertical");
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
			
		case ("TAmunt"):
			Debug.Log("És la TAmunt");
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
			
		case ("Z"):
			Debug.Log("És la Z");
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
			Debug.Log("És la ZVertical");
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
			Debug.Log("És la ZInvertidaVertical");
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
			Debug.Log("És la ZInvertida");
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

function colocarElement(matriuZona:Array, matriuNouElement:Array, posY:int, posX:int)
{
	for(var i = 0; i < matriuNouElement.length; i++)
	{
		for(var j = 0; j < matriuNouElement[i].length; j++)
		{
			// només es comprova els punts 'plens' del nou element
			if(matriuNouElement[i][j] == true)
			{
				// si alguna part de la peça esta fora dels límits sortim
				if((posY + i) < 0 || (posY + i) >= matriuZona.length || (posX + j) < 0 || (posX + j) >= matriuZona[0].length)
					return false;
					
				else if(matriuZona[posY + i][posX + j] == true)
					return false;
			}
		}
	}
	
	// si arribem aquí es pot dibuixar la peça sense comprovar res més
	for(i = 0; i < matriuNouElement.length; i++)
	{
		for(j = 0; j < matriuNouElement[i].length; j++)
		{
			if(matriuNouElement[i][j] == true)
			{
				matriuZona[posY + i][posX + j] = true;
			}
		}
	}
	return true;
}



function PlaceCube(hit: RaycastHit) {
	//Si es pressiona el botó "Fire1" (Disparar per defecte a Unity)
	//Capturem la posició actual del punter del ratolí a la pantalla
	//if(Input.GetButtonDown("Fire1")){
		//var screenPos = Input.mousePosition;<--------------------------------
		//definim un "ray" que tindrà les mateixes coordenades
		//que les del ratolí ( coordenades de pantalla
		//var ray = camera.ScreenPointToRay(Input.mousePosition);<-----------------
		//variable que retornarà la informació de l'objecte que ha interseccionat amb el ray
		//Passem la posició del punter de la pantalla a les coordenades del món 3D 
		//si el raycast toca algun objecte del món 3D, es guardarà a la variable hit
		//if(Physics.Raycast(ray,hit)){	<----------------------------
			//var llistagrids = new GridGenerator();<------------------
			//llistagrids.getList();<--------------------------
			/*for(var i=0;i<llistagrids.size();i++){
				if(hit.point == llistagrids.GetIndex(i).position){
				}
					
			}*/
			/*var x = Mathf.Round(hit.point.x);
			var y = Mathf.Round(hit.point.y);
			var z = Mathf.Round(hit.point.z);*/
			//Debug.Log("I hit at:"+hit.transform.tag);
			//Debug.Log("I hit at: "+" x: "+x+" y: "+y+" z: "+z);
			//i s'instanciarà a la posició on ha tocat el ray.	
			
		//}
	//}
}

function OnGUI () {
    //make sure that your time is based on when this script was first called
    //instead of when your game started
    //es resta el temps (ni idea) del temps inicial
   	var guiTime = Time.time - startTime;
   	restSeconds = countDownSeconds - (guiTime);
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
    text = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
    
    //display messages or whatever here -->do stuff based on your timer
    if (restSeconds == 10) {
    	//diferents missatges segons el temps que queda
        GUI.Label (Rect (400, 35, 100, 40), "Ten Seconds Left");
    }else if (restSeconds == 0) {
        GUI.Label (Rect (400, 35, 100, 40), "Time is Over");
        //do stuff here
    }else {
    	GUI.Label (Rect (400, 35, 100, 40), text);
    }    
}

function GenerateHashMap(){
	boolmatrix = new Array(width);
	for(var i=0;i<boolmatrix.length;i++){
		boolmatrix[i]=new Array(height);
	}
	for(i=0;i<boolmatrix.length;i++){
		for(var j=0;j<boolmatrix[i].length;j++){
			boolmatrix[i][j]=false;
		}
	}
}

function GenerateTiles(hit : RaycastHit){
	// Set Tiles
	//var xhit = (hit.point.x);
	//var zhit = (hit.point.z);
	/*var xhit = Mathf.Round(hit.point.x);
	var zhit = Mathf.Round(hit.point.z);*/
	xgrid = hit.point.x -((width)/2);
	zgrid = hit.point.z +(height/2);
	Debug.LogWarning("xgrid: "+xgrid+" "+"zgrid: "+zgrid);
	for(var x = (hit.point.x -((width-1)/2)); x < (hit.point.x+(width/2)); x++){
		for(var z = (hit.point.z-((height-1)/2)); z < (hit.point.z+(height/2)); z++){
			var tiler = Instantiate(tile,Vector3(x,0,z),Quaternion.identity);
			gridList.Add(tiler);
			tiler.name = "Tile ("+x+","+z+")";
		}
	}
	creat=true;
}