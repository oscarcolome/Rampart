#pragma strict
var customskin : GUISkin;

private var spikeCount : float;
private var windowRect0 = Rect (Screen.width/4,Screen.height/4,Screen.width/2,Screen.height/2);
private var frameOffset : float;

function AddSpikes(winX : float){
	spikeCount = Mathf.Floor(winX - 152)/22;
	GUILayout.BeginHorizontal();
	GUILayout.Label ("", "SpikeLeft");
	for (var i = 0; i < spikeCount; i++){
			GUILayout.Label ("", "SpikeMid");
    }
	GUILayout.Label ("", "SpikeRight");
	GUILayout.EndHorizontal();
}

function FancyTop(topX : float){
	//leafOffset = (topX/2)-64;
	frameOffset = (topX/2)-27;

	GUI.Label(new Rect(frameOffset, 3, 0, 0), "", "IconFrame");

}

function MyWindow() {
	// use the spike function to add the spikes
	// note: were passing the width of the window to the function
	AddSpikes(windowRect0.width);
	GUILayout.BeginVertical();
	GUILayout.Space(8);
	
    GUILayout.Label("Rampart : Tower Defense Game");
    GUILayout.Label("", "Divider");
	if (GUILayout.Button("Play Game")){
		Application.LoadLevel("Loader");
	}
	if (GUILayout.Button("Quit")){
		Application.Quit();	
	}
				
	GUILayout.Label("", "Divider");
	GUILayout.EndVertical();	
	
}

function OnGUI () {
	GUI.skin = customskin;
	windowRect0 = GUI.Window (0, windowRect0, MyWindow, "");

}
