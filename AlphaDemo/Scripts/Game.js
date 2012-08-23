#pragma strict

static var fase1 : boolean = false;
static var over : boolean = false;
static var fase1timeout : boolean = false;
static var fortSuccess : boolean = false;
static var postfase1 :boolean =false;
static var fase2 : boolean = false;
static var fase3 : boolean = false;
static var startingphase : boolean = false;
private var creation : GridGenerator = null;
private var phaseone : Fase1 = null;
private var phasetwo : Fase2 = null;


function Update () {

	if(!over){
		if(!startingphase){
			creation = GetComponentInChildren(GridGenerator);
			if(creation == null)
				creation= gameObject.AddComponent(GridGenerator);
			creation.enabled = true;		
		}else if(!fase1){
//			creation.disabled=true;
			creation.enabled=false;
			phaseone = GetComponentInChildren(Fase1);
			if(phaseone == null)	
				phaseone = gameObject.AddComponent(Fase1);
			phaseone.enabled = true;
			if(fase1timeout && !fortSuccess)
				over=true;	
		}else if(!fase2){
			phaseone.enabled = false;
			phasetwo = GetComponentInChildren(Fase2);
			if(phasetwo == null)	
				phasetwo = gameObject.AddComponent(Fase2);
			phasetwo.enabled = true;
		}
	}else{
		Application.LoadLevel(1);
		//Debug.Log("Game Over.");
		if(creation != null)
			creation=null;
		if(phaseone != null)
			phaseone.enabled = false;
		this.enabled=false;		
		return;
	}
	/*if(!fase1){	
		phaseone = GetComponentInChildren(Fase1);
		if(phaseone == null)	
			phaseone = gameObject.AddComponent(Fase1);
		phaseone.enabled = true;
	}*/
}