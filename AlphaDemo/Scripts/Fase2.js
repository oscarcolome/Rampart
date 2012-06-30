#pragma strict
var enemy : Transform;
private var wave = new ArrayList();
var numberenemies : int;
var spawnPoint : Transform[];


function Start () {
	var pos: Transform = spawnPoint[Random.Range(0, spawnPoint.length)];
	for(var i=0;i<numberenemies;i++){
		var bot : Transform = Instantiate(enemy,pos.position,transform.rotation);
		wave.Add(bot);
	}	
}

function Update () {

}