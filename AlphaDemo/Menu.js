#pragma strict

function OnGUI () {

	GUILayout.BeginArea(new Rect(0, 0, Screen.width, Screen.height));
    GUILayout.FlexibleSpace();
    GUILayout.BeginHorizontal();
    GUILayout.FlexibleSpace();

    if(GUILayout.Button("Play Game")){
    	Application.LoadLevel("demo1");
    }else if(GUILayout.Button("Quit")){
    	Application.Quit();
    }
   	/*if (GUI.Button (Rect (10,10,150,100), "Play Game")) {
		Application.LoadLevel(0);
	}else if (GUI.Button (Rect (200,150,150,100), "Quit")) {
		Application.Quit();
	}*/

    GUILayout.FlexibleSpace();
    GUILayout.EndHorizontal();
    GUILayout.FlexibleSpace();
    GUILayout.EndArea();
	

}