import { getData } from "./JSON_reader.js";

//cd "C:\Users\blair\OneDrive\Documents\Web Design\Website"
//python -m http.server 8000

//http://localhost:8000

let canStart = true;
let dialogueBox;
let dialogueLine;
let nextButton;
let typeSpeed = 40;

let scene;
let dialogue;
let lineNum = 0;

let data;

const url = "./dialogueLibrarian.json"

async function startDialogue(id) {
    //on interact

    if (!canStart) return;

    clearButtonOptions();

    if (dialogueBox == null || dialogueLine == null || nextButton == null) {
        data = await getData(url)

        dialogueBox = document.getElementById("dialogueBox");
        dialogueLine = document.getElementById("dialogueLine");
        nextButton = document.getElementById("nextButton");
    }

    if (data == null) return;

    for (let event of data.dialogue) {
            if (event.scene.id === id) {
                scene = event.scene;
                dialogue = event.scene.lines.map(lineObj => lineObj.Line);
                break;
        }
    }

    dialogueBox.style.visibility = "visible";

    canStart = false;

    typeDialogue(dialogue[lineNum], 0);
}

function typeDialogue(line, index) {

    if (dialogueLine == null) return;

    dialogueLine.innerHTML = line.slice(0, index);
    if (index < line.length) {
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
        nextButton.style.visibility = "hidden";
        lineNum = 0;
        canStart = true;

        //Check for response options
        if (scene.responses && scene.responses.length > 0) {

            createButtonOptions(scene.responses);
            return;
        }

        //end dialogue
        dialogueBox.style.visibility = "hidden";
    }
}

function createButtonOptions(responses) {
    for (let response of responses) {
        let button = document.createElement("button");
        button.className = "dialogueOptionButton";
        button.innerText = response.response;
        button.onclick = () => startDialogue(response.next);
        dialogueBox.appendChild(button);
    }
}

function clearButtonOptions() {
    if (!dialogueBox) return;
    const buttons = dialogueBox.querySelectorAll('.dialogueOptionButton');
    buttons.forEach(b => b.remove());
}

window.startDialogue = startDialogue;
window.nextDialogue = nextDialogue;

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