#pragma strict
var _robot : Texture2D;
var _missle_launcher : Texture2D;
var _machine_gun : Texture2D;
var _laser : Texture2D;

var _weapon_equip_array : int[];

var _missle_launcher_equip = false;
var _machine_gun_equip = false;
var _laser_equip = false;
var _mouseMoving = false;

var _slotArray : Rect[] = new Rect[6];
var _windowArray : Equipment[] = new Equipment[6];

var standardResolutionX : float = 1366;
var standardResolutionY : float = 768;

var _currentY : float;
var _currentX : float;

var _player : GameObject;

var _playerControls : Player_Controls;

function Start()
{
	_slotArray[0] = Rect(25, 40, 60, 95);
	_slotArray[1] = Rect(20, 240, 60, 130);
	_windowArray[0].rect = Rect(520, 0, 100, 100);
	_windowArray[0].name = "Laser";

	//_player = GameObject.FindGameObjectWithTag("Player");
	//_playerControls = _player.GetComponent(Player_Controls);
}

function Update () 
{

}

function OnGUI()
{
	if((Event.current.mousePosition.x != _currentX) || (Event.current.mousePosition.y != _currentY))
	{
		_mouseMoving = true;
	}
	else
	{
		_mouseMoving = false;
	}
	//Matrix to rescale eveything as the screen changes.
	GUI.matrix = Matrix4x4.TRS ( Vector3(0, 0, 0), Quaternion.identity, Vector3(Screen.width / standardResolutionX, Screen.height /standardResolutionY, 1) );
	//2-D Robot
	GUI.DrawTexture(Rect(0, 0, (standardResolutionX * .5), standardResolutionY), _robot);
	//Check position of slots
	GUI.Button(_slotArray[0], "Slot");
	//Inventory
	GUI.Box (Rect ((standardResolutionX * .5),0, (standardResolutionX * .5), standardResolutionY), "Inventory");
	//Laser in Inventory
	_windowArray[0].rect = GUI.Window (0, _windowArray[0].rect, DoMyWindow, _laser);
	//To Check if you equip somthing.
	if(_mouseMoving)
	{
		for(var slot in _slotArray)
		{
			for(var window in _windowArray)
			{
				if(slot.Contains(window.rect.center))
				{
					window.rect.Set(slot.x, slot.y, window.rect.width, window.rect.height);
					window.equiped = true;
				}
			}
		}
	}
	_currentX = Event.current.mousePosition.x;
	_currentY = Event.current.mousePosition.y;
}

function DoMyWindow (windowID : int) 
{
	// Make the windows be drag-able.
	GUI.DragWindow();
}

class Equipment
{
	var rect : Rect;
	var name : String;
	var equiped : boolean;
}