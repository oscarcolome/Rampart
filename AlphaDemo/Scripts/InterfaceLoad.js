function OnGUI () {

	GUILayout.BeginArea(new Rect(0, 0, Screen.width, Screen.height));
    GUILayout.FlexibleSpace();
    GUILayout.BeginHorizontal();
    GUILayout.FlexibleSpace();
	
	if(GUILayout.Button("Start!")){
			var a = GameObject.Find("Creation").GetComponent(GridGenerator);
			
	}
    GUILayout.FlexibleSpace();
    GUILayout.EndHorizontal();
    GUILayout.FlexibleSpace();
    GUILayout.EndArea();
	

}