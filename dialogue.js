
let canStart = true;
let dialogueBox;
let dialogueLine;
let nextButton;
let typeSpeed = 40;

let dialogue = ["First Line", "Second Line"];
let lineNum = 0;

function startDialogue() {
    //on interact

    if (!canStart) return;

    if (dialogueBox == null || dialogueLine == null || nextButton == null) {
        dialogueBox = document.getElementById("dialogueBox");
        dialogueLine = document.getElementById("dialogueLine");
        nextButton = document.getElementById("nextButton");
    }

    dialogueBox.style.visibility = "visible";

    canStart = false;

    typeDialogue(dialogue[lineNum], 0);
}

function typeDialogue(line, index) {

    if (dialogueLine == null) return;

    dialogueLine.innerHTML = line.slice(0, index);
    if (index < dialogue[lineNum].length) {
        setTimeout(() => {
            typeDialogue(line, index + 1);
        }, typeSpeed);
    } else {
        nextButton.style.visibility = "visible";
    }
}

function nextDialogue() {
    //next line
    lineNum++;

    if (lineNum < dialogue.length) {
        nextButton.style.visibility = "hidden";
        typeDialogue(dialogue[lineNum], 0);
    } else {
        //end dialogue
        dialogueBox.style.visibility = "hidden";
        nextButton.style.visibility = "hidden";
        lineNum = 0;
        canStart = true;
    }
}