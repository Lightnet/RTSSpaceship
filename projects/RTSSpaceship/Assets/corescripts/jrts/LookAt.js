var horizontalAxis : Transform;
var verticalAxis : Transform;
var target : Transform;

function LateUpdate () 
{
	var targetDirection : Vector3 = verticalAxis.InverseTransformPoint(target.position);
	targetDirection.y = 0;
	targetDirection = verticalAxis.TransformPoint(targetDirection);
	verticalAxis.LookAt(targetDirection, verticalAxis.up);
	
	//targetDirection = horizontalAxis.InverseTransformPoint(target.position);
	//targetDirection.x = 0;
	//targetDirection = horizontalAxis.TransformPoint(targetDirection);
	//horizontalAxis.LookAt(targetDirection, horizontalAxis.up);
	
	
	
	//horizontalAxis.LookAt(target,horizontalAxis.);
}
