import { getData } from "./JSON_reader.js";

let canStart = true;
let dialogueBox;
let dialogueLine;
let nextButton;
let typeSpeed = 40;

let dialogue;
let lineNum = 0;

const url = "./dialogueLibrarian.json"

async function startDialogue(id) {
    //on interact

    if (!canStart) return;

    if (dialogueBox == null || dialogueLine == null || nextButton == null) {
        let data = await getData(url)

        for (let event of data.dialogue) {
            if (event.scene.id === id) {
                dialogue = event.scene.lines.map(lineObj => lineObj.Line);
                break;
            }
        }

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

        //Check for response options

        //end dialogue
        dialogueBox.style.visibility = "hidden";
        nextButton.style.visibility = "hidden";
        lineNum = 0;
        canStart = true;
    }
}

// window.startDialogue = startDialogue;
// window.nextDialogue = nextDialogue;

class DialogueData {
    constructor(lines) {
        this.lines = lines;
    }
}

class DialogueEvent {
    constructor(id, name, lines, responses) {
        this.id = id;
        this.name = name;
        this.lines = lines;
        this.responses = responses ?? [];
    }
}

class DialogueLine{
    constructor(emotion, line) {
        this.emotion = emotion;
        this.line = line;
    }
}