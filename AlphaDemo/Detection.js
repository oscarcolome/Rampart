var rocket: Rigidbody;
var speed = 15.0;
var cannon: Transform;
var target: Transform;
var fireRate = 0.5;
private var nextFire = 0.0;

function OnTriggerStay(coll: Collider){
	//Si es detecta un objecte amb l'etiqueta "Bot"
	if(coll.tag == "Bot"){
		//Es crida la funció Shoot();
		Shoot();	
	}
}

function Shoot(){
	//Si ha passat prou temps des del dispar anterior
	if (Time.time >= nextFire) {
            //Es dispara l'arma
            //Es reseteja el delay ente dispars
            nextFire = Time.time + fireRate;
            //Es crea la bala
            var rocketClone : Rigidbody = Instantiate(rocket, cannon.position, cannon.rotation);
            //Se li dona velocitat i direccio
            rocketClone.velocity = transform.forward * speed + transform.up * 0.4;
            rocketClone.name = "Bullet";
    }
}