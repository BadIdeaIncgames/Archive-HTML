
const pressedKeys = [];

const code = "1234";

let unlocked = false;

function KeyPadPress(value) {
    if (pressedKeys.length >= code.length) {
        tryToUnlock
    }

    pressedKeys.push(value);
}

function tryToUnlock(attempt) {
    if (attempt === code) {
        //unlock door
        unlocked = true;
        console.log("Door Unlocked");
    } else {
        pressedKeys = [];
    }
}

window.KeyPadPress = KeyPadPress;