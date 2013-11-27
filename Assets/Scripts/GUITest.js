#pragma strict
var standardResolutionX : float = 1024;		//The resolution of the screen you are editing on
var standardResolutionY : float = 768;

function Start ()
{
}

function OnGUI()
{	//Keep this at the beginning of OnGUI() to translate all code from standard resolution to any resolution
	GUI.matrix = Matrix4x4.TRS ( Vector3(0, 0, 0), Quaternion.identity, Vector3(Screen.width / standardResolutionX, Screen.height /standardResolutionY, 1) );
	
	if (GUI.Button(Rect(450,650,200,200),GUIContent("Test Button")))
		{	}
	
}