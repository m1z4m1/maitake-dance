const radenCharacter = document.querySelector(".raden-image");
const audioFirst = "./assets/audio/maitake-1.mp3";
const audioSecond = "./assets/audio/guru-1.mp3";

const spiralImage = document.querySelector(".spiral-img");

let bigText = document.querySelector(".text-el");
let ctr = 0;

let timeouts = [];

radenCharacter.addEventListener("click", radenAction);
radenCharacter.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        radenAction();
    }
});

function radenAction() {
    clearAllTimeouts()
    ctr++;
    let randomNumber = Math.floor(Math.random() * 10)

    if (ctr === 1) {
        playAudio(audioFirst);
        radenAnimation("まいたけ<br>");
    }
    else if (ctr === 2) {
        radenCharacter.src = "./assets/raden-r-1.png";

        playAudio(audioSecond);
        radenAnimation("ぐるぐる<br>");
        ctr = 0;

    }
    // spiralImage.classList.add("spiral-animation");
}

function playAudio(src) {
    let audio = new Audio(src);
    audio.play();
}

function radenAnimation(text) {
    radenCharacter.src = "./assets/raden-l-1.png";
    
    // Use timeouts and store their IDs in the array
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "./assets/raden-l-2.png";
        bigText.innerHTML = text;
        console.log("1");
    }, 120));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "./assets/raden.png";
        console.log("2");
    }, 240));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "./assets/raden-r-1.png";
        console.log("3");
        bigText.innerHTML += text;
    }, 360));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "./assets/raden-r-2.png";
        console.log("4");
    }, 480));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "./assets/raden.png";
        console.log("5");
    }, 600));

    timeouts.push(setTimeout(function(){
        bigText.innerHTML = "";
        console.log("6");
    }, 720));
}

function clearAllTimeouts() {
    timeouts.forEach(clearTimeout); // Clear all stored timeouts
    timeouts = []; // Reset the array
}

