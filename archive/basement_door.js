
let pressedKeys = [];

const code = "1882";

let unlocked = false;

function KeyPadPress(value) {

    pressedKeys.push(value);

    if (pressedKeys.length >= code.length) {
        tryToUnlock(pressedKeys.join(''));
    }
}

function tryToUnlock(attempt) {
    if (attempt === code) {
        //unlock door
        unlocked = true;
        console.log("Door Unlocked");
    } else {
        console.log("Incorrect Code");
        pressedKeys = [];
    }
}

window.KeyPadPress = KeyPadPress;