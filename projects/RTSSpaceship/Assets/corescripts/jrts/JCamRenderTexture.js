/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSSpaceship/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var thisCamera:Camera;
var inTransition:boolean = false;
var releaseEachFrame:boolean =false;
var  fadeSpeed:float;

var  alpha:float = 1.0f;

var  renderTex:RenderTexture;
var  tex:Texture;
var  tex2:Texture;

function  OnEnable()
{

    if (renderTex==null) renderTex = new RenderTexture(Screen.width, Screen.height, 24);
    renderTex.Release();

    Debug.Log(Time.time + " Enabled");
    alpha = 0f;
    inTransition = true;
    thisCamera.targetTexture = renderTex;
    tex = renderTex;
    Debug.Log(Time.time + "FG cam enabled");

}

// Update is called once per frame
function Update () {


    if (Input.GetKeyDown(KeyCode.R))
    {
        releaseEachFrame = !releaseEachFrame;
    }

    if (inTransition)
    {

        alpha = Mathf.MoveTowards(alpha, 1f, Time.deltaTime * fadeSpeed);
        alpha = Mathf.Clamp(alpha, 0f, 1f);

        //Debug.Log(Time.time + "Update: " + alpha);

        if (releaseEachFrame)
        {
            renderTex.Release();
        }
        tex = renderTex;

        if (alpha > 0.99999f)
        {
            inTransition = false;
            thisCamera.targetTexture = null;
            renderTex.Release();
            //Debug.Log(Time.time + "Transition to foreground complete");
        }
    }
}


function OnGUI()
{

    if (inTransition && alpha < 1f)
    {
        //GUI.color = new Color(1f, 1f, 1f, alpha);
        GUI.DrawTexture(new Rect(0, 1, Screen.width, Screen.height), tex, ScaleMode.StretchToFill, true);
		//GUI.DrawTexture(new Rect(0, 1, Screen.width, Screen.height), tex2, ScaleMode.StretchToFill, true);
        //Debug.Log(Time.time + " GUI.DrawTexture");
    }
}

