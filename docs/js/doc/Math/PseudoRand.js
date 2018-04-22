// JavaScript source code
var totalPicks = 0;
var totalPositivePicks = 0;
var lastResult = false;
var currentChances = 0;
var hardness;
var successRate;

function UpdateValues()
{
    successRate = document.getElementById("sr").value / 100;
    hardness = document.getElementById("h").value;
    ResetOdds();
    UpdateDisplay();
}

function Pick(repeat)
{
    for (var i = 0; i < repeat; i++)
    {
        lastResult = Math.random() <= currentChances;

        if (lastResult)
        {
            currentChances -= (1 - successRate) * hardness;
        }
        else
        {
            currentChances += successRate * hardness;
        }

        // Pick
        if (lastResult)
            totalPositivePicks++;
        totalPicks++;
    }

    UpdateDisplay();
}

function UpdateDisplay()
{
    // Update result
    var resultElement = document.getElementById("result");
    resultElement.textContent = lastResult;
    resultElement.className = lastResult ? "green" : "red";

    // Update actual odds
    var actualOddsElement = document.getElementById("odds");
    numberString = (Math.round(currentChances * 10000) / 100).toString();
    if (!numberString.includes('.'))
        numberString += '.';
    while (numberString.length < 4)
        numberString += '0';
    actualOddsElement.textContent = numberString;

    // Update success rate so far
    var resultElement = document.getElementById("successRateSoFar");
    var numberString = (Math.round((totalPositivePicks / totalPicks) * 100 * 100) / 100).toString();
    if (!numberString.includes('.'))
        numberString += '.';
    while (numberString.length < 5)
        numberString += '0';
    resultElement.textContent = numberString + "%  (" + totalPositivePicks + " / " + totalPicks + ")";
}

function ResetOdds()
{
    currentChances = successRate;
}

function Reset()
{
    totalPicks = 0;
    totalPositivePicks = 0;

    ResetOdds();
    UpdateDisplay();
}