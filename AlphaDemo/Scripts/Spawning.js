var spawnPoints : Transform[];  // Array of spawn points to be used.
var enemyPrefab : Transform; // Array of different Enemies that are used.
var amountEnemies = 20;  // Total number of enemies to spawn.
var yieldTimeMin = 2;  // Minimum amount of time before spawning enemies randomly.
var yieldTimeMax = 5;  // Don't exceed this amount of time between spawning enemies randomly.
var nextWave = 0.0f;
var waveRate = 2.0f;

/*function Start()
{
   }
}

function Waves(){

	nextWave = Time.time + waveRate;	
	yield WaitForSeconds(Random.Range(yieldTimeMin, yieldTimeMax));  // How long to wait before another enemy is instantiated.
    var pos: Transform = spawnPoints[Random.Range(0, spawnPoints.length)];  // Randomize the spawnPoints to instantiate enemy at next.
    Instantiate(enemyPrefab, pos.position, pos.rotation); 
}*/




    
