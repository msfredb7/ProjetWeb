// JavaScript source code
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

//document.getElementById("panelButton").onclick = function ()
//{
//};

var xDown = null;
var yDown = null;
var threshold = 0.15;
var pressTime = null;
var maxDuration = 0.2 * 1000;
var leftBorder = 0.3;

function Log()
{
    console.log("sup");
}

function handleTouchStart(evt)
{
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    pressTime = Date.now();
};

function handleTouchMove(evt)
{
    if (!xDown || !yDown)
    {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) < document.body.clientWidth * threshold)
        return;

    var timeElapsed = (Date.now() - pressTime);
    if (timeElapsed > maxDuration)
        return;

    if (Math.abs(xDiff) > Math.abs(yDiff))
    {
        if (xDiff > 0)
        {
            // Close !
            TweenMax.to("#panelContainer", 0.24, { left: "-73%" });
        } else
        {
            // Open !
            // Top à droite ?
            if (xDown > leftBorder * document.body.clientWidth)
                return;
            TweenMax.to("#panelContainer", 0.24, { left: "-10%" });
        }
    }
    else
    {
    }

    //Reset values
    xDown = null;
    yDown = null;
};