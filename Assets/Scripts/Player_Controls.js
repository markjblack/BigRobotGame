#pragma strict
var _player : GameObject;
var _camera : GameObject;
var _miniMap : GameObject;

var _cameraControl : Camera_Control;

var _speed : int = 100;

var _EquipedArray : boolean[] = new boolean[6];

var _mapToggle : boolean = false;

function Start () 
{
	_player = GameObject.FindGameObjectWithTag("Player");
	
	_camera = GameObject.FindGameObjectWithTag("MainCamera");
	_camera.AddComponent(Camera_Control);
	_camera.AddComponent(RobotHUD);
	_camera.transform.parent = _player.transform;	
	_cameraControl = _camera.GetComponent(Camera_Control);
	
	_EquipedArray[0] = true;
	
	LoadEquipment();
}

function Awake()
{
	DontDestroyOnLoad(_player);
}

function Update () 
{
//	_player.transform.rotation.y += Input.GetAxis("Mouse Y")*15;
	if(Input.GetKey("w"))
	{
		_player.transform.Translate(_camera.transform.forward * Time.deltaTime * _speed);
	}
	if(Input.GetKey("s"))
	{
		_player.transform.Translate(_camera.transform.forward * Time.deltaTime * _speed * -1);
	}
	if(Input.GetKey("a"))
	{
		_player.transform.Translate(_camera.transform.right * Time.deltaTime * _speed * -1);
	}
	if(Input.GetKey("d"))
	{
		_player.transform.Translate(_camera.transform.right * Time.deltaTime * _speed);
	}
	if(Input.GetKeyDown("tab"))
	{
		_mapToggle = !_mapToggle;
		Zoom(_mapToggle);
	}
}

function LoadEquipment()
{
	if(_EquipedArray[0])
	{
		Instantiate(_miniMap, Vector3(_player.transform.position.x, 50, _player.transform.position.z), Quaternion.Euler(90,0,0));
		_miniMap = GameObject.FindGameObjectWithTag("MiniMap");
		_miniMap.transform.parent = _player.transform;
	}
}

function Zoom(toggle : boolean)
{
	if(_mapToggle)
	{
		_miniMap.camera.orthographicSize = 3;
	}
	else
	{
		_miniMap.camera.orthographicSize = 12;
	}
}