#pragma strict
var _backgrounds : Texture2D[] = new Texture2D[4];

var _currentBackground : Texture2D = null;

var _gridIndex : int = -1;
var _pastIndex : int = -1;

var standardResolutionX : float = 1366;
var standardResolutionY : float = 768;

function Start () 
{

}

function Update () 
{

}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS ( Vector3(0, 0, 0), Quaternion.identity, Vector3(Screen.width / standardResolutionX, Screen.height /standardResolutionY, 1) );
	
	GUI.DrawTexture(Rect(0,0,standardResolutionX, standardResolutionY),_currentBackground);
	
	if(_gridIndex != -1)
	{
		GUI.Box(Rect(400,450, 500, 320), "Level Name: " + "\n Played: " + "\n Highest Money Earned: ");
	}
	_gridIndex = GUI.SelectionGrid(Rect(400, 300, 500, 150), _gridIndex, _backgrounds, 4);
	
	if((_gridIndex == 0) && (_pastIndex != _gridIndex))
	{
		_currentBackground = _backgrounds[0];
		_pastIndex = _gridIndex;
	}
	else if((_gridIndex == 1) && (_pastIndex != _gridIndex))
	{
		_currentBackground = _backgrounds[1];
		_pastIndex = _gridIndex;
	}	
	else if((_gridIndex == 2) && (_pastIndex != _gridIndex))
	{
		_currentBackground = _backgrounds[2];
		_pastIndex = _gridIndex;
	}
	else if((_gridIndex == 3) && (_pastIndex != _gridIndex))
	{
		_currentBackground = _backgrounds[3];
		_pastIndex = _gridIndex;
	}
	if(GUI.Button(Rect(1000, 600, 200,200), "Start Level"))
			Application.LoadLevel("The Island");
	
}