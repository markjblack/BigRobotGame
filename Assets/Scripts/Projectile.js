#pragma strict
var _speed : int = 10;

var _camera : GameObject;

function Start () 
{
	_camera = GameObject.FindGameObjectWithTag("MainCamera");
}

function Update () 
{
	this.transform.position.z += Time.deltaTime * _speed;
}

function OnCollisionEnter(object : Collision)
{
	if(object.gameObject.tag == "Ground")
	{
		Destroy(gameObject);
	}
}