#pragma strict
var _crosshairTexture : Texture2D;
var _frameTexture : Texture2D;

var _gridIndex : int = -1;
var _pastIndex : int = -1;
var _readoutIndex : int = 0;

var standardResolutionX : float = 1366;		//The resolution of the screen you are editing on
var standardResolutionY : float = 768;

var _machine_gun_on: boolean = true;
var _laser_on : boolean = false;
var _missles_on : boolean = false;

var _gridStrings : String[] = ["1", "2", "3", "4", "5", "6"];
var _readoutArray : String[] = [" ", " ", " ", " ", " ", " ", " ", " "];

function Start () 
{
	_crosshairTexture = Resources.Load("Crosshairs", Texture2D);
	_frameTexture = Resources.Load("Frame", Texture2D);
}

function Update () 
{
}

//Function for printing to readout display, requires the string to print out.
function PrintToReadout(text : String)
{
	if(_readoutIndex >= 8)
	{
		for(var i : int = 7; i > 0; i--)
		{
			_readoutArray[i] = _readoutArray[i-1];
		} 
		_readoutArray[0] = text;
	}
	else
	{
		for(var t : int; i < 8; i++)
		{
			if(_readoutArray[i] == " ")
			{
				_readoutArray[i] = text;
				_readoutIndex++;
				break;
			}
			else
			{
			
			}
		}
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS ( Vector3(0, 0, 0), Quaternion.identity, Vector3(Screen.width / standardResolutionX, Screen.height /standardResolutionY, 1) );
	//Draw the frame of the robot.
	GUI.DrawTexture(Rect(0, 0, standardResolutionX, standardResolutionY), _frameTexture);
	//Draw CrossHairs
	GUI.DrawTexture(Rect(480, 130, 400, 400), _crosshairTexture);
	//Don't look at this like of code, its ugly and I need to make it pretty.
	GUI.Box(Rect(0, 500, 480, 300), _readoutArray[0] + "\n" + _readoutArray[1] + "\n" + _readoutArray[2] + "\n" + _readoutArray[3] + "\n" + _readoutArray[4] + "\n" + _readoutArray[5] + "\n" + _readoutArray[6] + "\n" + _readoutArray[7]);
	//Grid for weapon selection buttons.
	_gridIndex = GUI.SelectionGrid(Rect(900, 500, 450, 270), _gridIndex, _gridStrings, 2);
	//if/else block for printing out current attached weapon to readout display.
	if((_gridIndex == 0) && (_gridIndex!= _pastIndex))
	{
		PrintToReadout("Machine Gun Equiped");
		_machine_gun_on = true;
		_laser_on = false;
		_missles_on = false;
		_pastIndex = _gridIndex;
	}
	else if((_gridIndex == 1) && (_gridIndex != _pastIndex))
	{
		PrintToReadout("Lasers Equiped");
		_laser_on = true;
		_machine_gun_on = false;
		_missles_on = false;
		_pastIndex = _gridIndex;
	}
	else if((_gridIndex == 2) && (_gridIndex != _pastIndex))
	{
		PrintToReadout("Missels Equiped");
		_machine_gun_on = false;
		_laser_on = false;
		_missles_on = true;
		_pastIndex = _gridIndex;
	}
	else
	{
		
	}
}