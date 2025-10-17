let map;
let mapOpen = false;

function mapSwitcher() {
    if (mapOpen) {
        closeMap()
    } else {
        openMap()
    }
}

function openMap() {   
    if (map == null) {
        map = document.getElementById("mapBox");
    }

    map.style.visibility = "visible";
    mapOpen = true;
}

function closeMap() {

    if (map == null) return;

    map.style.visibility = "hidden";
    mapOpen = false;
}