// radar! by PsychicParrot, adapted from a Blitz3d script found in the public domain online somewhere ..
//
 
public var blip : Texture;
public var radarBG : Texture;
 
public var centerObject : Transform;
public var mapScale = 0.3;
public var mapCenter = Vector2(50,50);

var standardResolutionX : float = 1366;
var standardResolutionY : float = 768;
 
function OnGUI () {
 
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, Vector3(Screen.width / standardResolutionX, Screen.height / standardResolutionY, 1));
 
	// Draw player blip (centerObject)
	bX=centerObject.transform.position.x * mapScale;
    bY=centerObject.transform.position.z * mapScale;
 
 	GUI.DrawTexture(Rect(mapCenter.x,mapCenter.y,400,300),radarBG);
 
	// Draw blips for zombies
	DrawBlipsForEnemies();
 
}

function drawBlip(go,aTexture){
 
	centerPos=centerObject.position;
	extPos=go.transform.position;
 
	// first we need to get the distance of the enemy from the player
	dist=Vector3.Distance(centerPos,extPos);
	if(dist<=200) { // New - should be more optimal 
	  dx=centerPos.x-extPos.x; // how far to the side of the player is the enemy?
	  dz=centerPos.z-extPos.z; // how far in front or behind the player is the enemy?
 
	  // what's the angle to turn to face the enemy - compensating for the player's turning?
	  deltay=Mathf.Atan2(dx,dz)*Mathf.Rad2Deg - 270 - centerObject.eulerAngles.y;
 
	  // just basic trigonometry to find the point x,y (enemy's location) given the angle deltay
	  bX=dist*Mathf.Cos(deltay * Mathf.Deg2Rad);
	  bY=dist*Mathf.Sin(deltay * Mathf.Deg2Rad);
 
	  bX=bX*mapScale; // scales down the x-coordinate by half so that the plot stays within our radar
	  bY=bY*mapScale; // scales down the y-coordinate by half so that the plot stays within our radar
 
	// Old if(dist<=200){ // this is the diameter of our largest radar circle
	  GUI.DrawTexture(Rect(mapCenter.x+bX,mapCenter.y+bY,50,50),aTexture);
 
	}
 
}
 
function DrawBlipsForEnemies(){
 
    // Find all game objects tagged Enemy
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Enemy"); 
 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
 
    // Iterate through them and call drawBlip function
    for (var go : GameObject in gos)  { 
 
	drawBlip(go,blip);
 
    }
 
}
