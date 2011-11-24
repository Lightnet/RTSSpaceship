var toLookAt:Transform;
var turnspeed:float;
//var adjustment = turretSpeed;

function Update () {
	LookAt();
}

function  LookAt()
{
/*
    var forwardA = -transform.right;
    var forwardB = (toLookAt.transform.position - transform.position);

    var angleA = Mathf.Atan2(forwardA.x, forwardA.z) * Mathf.Rad2Deg;
    var angleB = Mathf.Atan2(forwardB.x, forwardB.z) * Mathf.Rad2Deg;

    var angleDiff = Mathf.DeltaAngle(angleA, angleB);
    //print(angleDiff.ToString());
    if (angleDiff - 180 > 1) {
        //Rotate to 
        transform.Rotate(new Vector3(0, (turretSpeed * Time.deltaTime),0));
        //transform.rotation = new Quaternion(transform.rotation.x, transform.rotation.y + adjustment, transform.rotation.z, transform.rotation.w);

    }
    else if (angleDiff - 180 < -1) {
        transform.Rotate(new Vector3(0, (-turretSpeed * Time.deltaTime),0));
        //transform.rotation = new Quaternion(transform.rotation.x, transform.rotation.y + adjustment, transform.rotation.z, transform.rotation.w);
        print((angleDiff - 180).ToString());
    }
    else {

    }
    
    */
    
    
    var targetRelative = transform.InverseTransformPoint(toLookAt.transform.position);

	print(targetRelative.x);
    if (targetRelative.x > 0){     
       transform.Rotate(0,turnspeed * Time.deltaTime,0);
    }
    else{
       transform.Rotate(0,turnspeed * Time.deltaTime*-1,0);
    }
}