const radenCharacter = document.querySelector(".raden-image");
const audioMaitake1 = "./assets/audio/maitake-1.mp3";
const audioGuru1 = "./assets/audio/guru-1.mp3";
const audioGuruE = "./assets/audio/guru-end.mp3";
const spiralImage = document.querySelector(".spiral-img");
let bigText = document.querySelector(".text-el");

const loadingText = document.querySelector(".loading-text");
const modalWindow = document.querySelector(".about-modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");

let ctr = 0;

let timeouts = [];

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

const audioFiles = [
    "assets/audio/maitake-1.mp3",
    "assets/audio/guru-1.mp3",
    "assets/audio/guru-end.mp3",

];

audioFiles.forEach(src => {
    const aud = new Audio();
    aud.src = src;
});


window.addEventListener("load", function(){
    loadingText.style.display = "none";
    console.log("DONE")
})


//Interacting
radenCharacter.addEventListener("click", radenAction);
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling down the page when space is pressed
        radenAction(); // Call your function
    }
});

function radenAction() {
    clearAllTimeouts();
    radenCharacter.classList.remove("raden-spin-animation");
    ctr++;

    if (ctr % 2 != 0) {
        playAudio(audioMaitake1);
        radenAnimation("まいたけ<br>");
        console.log(`_____${ctr}______`)
    }
    else if (ctr % 2 === 0) {
        if (ctr === 8) {
            radenCharacter.src = "assets/images/raden-f.png"
            radenCharacter.classList.add("raden-spin-animation");
            bigText.innerHTML = "";
            playAudio(audioGuruE);
            timeouts.push(setTimeout(function(){
                radenCharacter.classList.remove("raden-spin-animation");
                console.log("Spin stop");
            }, 720));
            ctr = 0;
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
    }, 120));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.png";
    }, 240));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-1.png";
        bigText.innerHTML += text;
    }, 360));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-2.png";
    }, 480));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.png";
    }, 600));

    timeouts.push(setTimeout(function(){
        bigText.innerHTML = "";
    }, 720));
}

function clearAllTimeouts() {
    timeouts.forEach(clearTimeout); // Clear all stored timeouts
    timeouts = []; // Reset the array
}

openModal.addEventListener("click", function() {
    triggerModal(modalWindow);
});
closeModal.addEventListener("click", function() {
    triggerModal(modalWindow);
});


function triggerModal(modal){
    if(modal.style.display != "flex") {
        modal.style.display = "flex";   
    }
    else {
        modal.style.display = "none";
    }
}
