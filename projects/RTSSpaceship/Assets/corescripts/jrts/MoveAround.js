var targetSpeed : float = 2;

function Awake ()
{
	MoveAround ();
}

function MoveAround ()
{
	var startPosition : Vector3 = transform.position;
	while(true)
	{
		yield MoveTo(startPosition + Random.insideUnitSphere*3);
	}
}

function MoveTo (endPosition : Vector3) 
{
	var t : float = 0;
	var startPosition : Vector3 = transform.position;
	while (t < 1)
	{
		t += Time.deltaTime*targetSpeed;
		transform.position = Vector3.Lerp(startPosition, endPosition, t);
		yield;
	}
}