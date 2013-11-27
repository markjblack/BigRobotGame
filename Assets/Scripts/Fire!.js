#pragma strict
var _camera : GameObject;
var _bullet : GameObject;

var _robotHUD : RobotHUD;

function Start () 
{
	_camera = GameObject.FindGameObjectWithTag("MainCamera");
	_robotHUD = _camera.GetComponent(RobotHUD);
}

function Update () 
{
	Debug.DrawRay(transform.position, _camera.transform.forward, Color.red);
	if((Input.GetKey("space")) && (_robotHUD._machine_gun_on == true))
	{
		print("hey");
		Instantiate(_bullet, this.transform.position, Quaternion.Euler(_camera.transform.rotation.x,_camera.transform.rotation.y,_camera.transform.rotation.z));
	}
}