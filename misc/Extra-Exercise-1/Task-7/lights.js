let pauseDisplay = false;

let lightChild = 0;
let children = document.getElementById("lights-container").children;
let childrenCount = document.getElementById("lights-container").childElementCount;

var r = document.querySelector(':root');
var rs = getComputedStyle(r);

let redOn = rs.getPropertyValue('--light-colour-1-on');
let redOff = rs.getPropertyValue('--light-colour-1-off');
let greenOn = rs.getPropertyValue('--light-colour-2-on');
let greenOff = rs.getPropertyValue('--light-colour-2-off');

let intervalTime = 1000;
let newInterval = setInterval(NextLight, intervalTime);

function NextLight() {
    children[lightChild].style['background-color'] = lightChild % 2 == 0 ? redOff : greenOff;
    lightChild = (lightChild + 1) % childrenCount;
    children[lightChild].style['background-color'] = lightChild % 2 == 0 ? redOn : greenOn;
}

function ChangeDelay() {
    r.style.setProperty('--light-animation-duration', document.getElementById("user-input").value / 1000 + "s");
}

function ChangeInterval() {
    clearInterval(newInterval);
    intervalTime = document.getElementById("user-interval-input").value;
    newInterval = setInterval(NextLight, intervalTime)
}

function ToggleLights() {
    pauseDisplay = !pauseDisplay;

    switch (pauseDisplay) {
        case false:
            document.getElementById("pause-button").value = "Stop Display";
            newInterval = setInterval(NextLight, intervalTime);
            break;
        case true:
            document.getElementById("pause-button").value = "Start Display";
            children[lightChild].style['background-color'] = lightChild % 2 == 0 ? redOff : greenOff;
            clearInterval(newInterval);
            break;
    }
}

function AddLight(){
    let light = childrenCount%2 == 0 ? "green-light" : "red-light";
    document.getElementById("lights-container").insertAdjacentHTML("afterbegin", 
    ` <div class="circle ${light}"></div> `,);
    children = document.getElementById("lights-container").children;
    childrenCount = document.getElementById("lights-container").childElementCount;
}

function RemoveLight(){
    document.getElementById("lights-container").lastElementChild.remove();
}

