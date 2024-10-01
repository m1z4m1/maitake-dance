const radenCharacter = document.querySelector(".raden-image");
const audioMaitake1 = "./assets/audio/maitake-1.mp3";
const audioGuru1 = "./assets/audio/guru-1.mp3";
const audioGuruE = "./assets/audio/guru-end.mp3";

const spiralImage = document.querySelector(".spiral-img");

let bigText = document.querySelector(".text-el");
let ctr = 0;

let timeouts = [];

window.onload = function () {
    console.log('Loaded');
  }


// Preload images
const images = [
    "assets/images/raden.png",
    "assets/images/raden-l-1.png",
    "assets/images/raden-l-2.png",
    "assets/images/raden-r-1.png",
    "assets/images/raden-r-2.png",
    "assets/images/raden-f.png"
];

images.forEach(src => {
    const img = new Image();
    img.src = src;
});

//Interacting
radenCharacter.addEventListener("click", radenAction);
radenCharacter.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        radenAction();
    }
});

function radenAction() {
    clearAllTimeouts();
    radenCharacter.classList.remove("raden-spin-animation");
    ctr++;
    let randomNumber = Math.floor(Math.random() * 10)

    if (ctr % 2 != 0) {
        playAudio(audioMaitake1);
        radenAnimation("まいたけ<br>");
        console.log(`_____${ctr}______`)
    }
    else if (ctr % 2 === 0) {
        if (ctr % 8 === 0) {
            radenCharacter.src = "assets/images/raden-f.png"
            radenCharacter.classList.add("raden-spin-animation");
            playAudio(audioGuruE);
            timeouts.push(setTimeout(function(){
                radenCharacter.classList.remove("raden-spin-animation");
                console.log("Spin stop");
            }, 720));
        }
        else {
            playAudio(audioGuru1);
            radenAnimation("ぐるぐる<br>");
            console.log(`_____${ctr}______`);
    }
        }   

}

function playAudio(src) {
    let audio = new Audio(src);
    audio.play();
}

function radenAnimation(text) {
    radenCharacter.src = "assets/images/raden-l-1.png";
    
    // Use timeouts and store their IDs in the array
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-l-2.png";
        bigText.innerHTML = text;
        console.log("1");
    }, 120));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.png";
        console.log("2");
    }, 240));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-1.png";
        console.log("3");
        bigText.innerHTML += text;
    }, 360));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-2.png";
        console.log("4");
    }, 480));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.png";
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

