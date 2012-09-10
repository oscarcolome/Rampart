
var enemy : Rigidbody;
private var wave : Transform;
var numberenemies : int;
var spawnPoint : Transform[];
var countDownSeconds : int;
private var nextSpawn : float = 0.0f;
private var spawnSec : float = 2f;

private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;
private var remainingSeconds : int;	
private var battle : boolean = false;
private var ready : boolean =false;
private var spawned : int = 0;
var customskin : GUISkin;

function Start () {
	
	wave = GameObject.Find("BotWave").transform;	
	remainingSeconds = countDownSeconds;
		
}

function Update () {
	if(spawned <= numberenemies && Time.timeSinceLevelLoad >= nextSpawn && restSeconds > 0){
		var pos : Transform = spawnPoint[Random.Range(0, spawnPoint.length)];
		var bot : Rigidbody = Instantiate(enemy,pos.position,transform.rotation);
		bot.transform.parent = wave;
		spawned++;
		spawnTime();
	}
	if(restSeconds == 0){
		Application.LoadLevel("Fase 1");
	}
	
}
function spawnTime(){
	nextSpawn =  spawnSec + Time.timeSinceLevelLoad;
}

function OnGUI () {
    
   	restSeconds = remainingSeconds - (Time.timeSinceLevelLoad);

   	restSeconds = Mathf.Max(0,restSeconds);

	roundedRestSeconds = Mathf.CeilToInt(restSeconds);

    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
	var text : String;

    text = String.Format ("Battle : {0:00}:{1:00}", displayMinutes, displaySeconds);
 
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