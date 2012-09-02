import System.Collections.Generic;

var enemy : Rigidbody;
var wave;
var numberenemies : int;
var spawnPoint : Transform[];

private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;
var countDownSeconds : int;
private var remainingSeconds : int;	
private var battle : boolean = false;
private var ready : boolean =false;


function Start () {
	wave = GameObject.Find("BotWave").transform;
	for(var i=0;i<numberenemies;i++){
		var pos: Transform = spawnPoint[Random.Range(0, spawnPoint.length)];
		var bot : Rigidbody = Instantiate(enemy,pos.position,transform.rotation);
		bot.transform.parent = wave;
	}
	//ready=true;
	remainingSeconds = countDownSeconds;
		
}

function Update () {
	if(restSeconds == 0){
		Application.LoadLevel("Fase 1");
	}
	
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
    text = String.Format ("Battle phase: {0:00}:{1:00}", displayMinutes, displaySeconds);
    //display messages or whatever here -->do stuff based on your timer
    //if (restSeconds == 10) {
    	//diferents missatges segons el temps que queda
        //GUI.Label (Rect (100, 10, 300, 40), "Ten Seconds Left!!");
    //}else 
    GUI.Label (Rect (100, 10, 300, 40), text);	    
       
}