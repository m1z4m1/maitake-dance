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

let clickCounter = document.querySelector(".click-counter-text");
let totalClicks = 0;

let myClicksCounter = document.querySelector(".my-click-counter-text");

let myClicks = 0;
let ctr = 0;
let timeouts = [];

//fetch yourClicks from localStorage
myClicks = localStorage.getItem("myClicks");
myClicksCounter.textContent = `You: ${myClicks}`;

//display clicks total
function updateClickCount() {
    clickCounter.textContent = `Total Clicks: ${totalClicks}`;
}

// Preload images and audio
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
    console.log("Load Done")
})


//Interacting
radenCharacter.addEventListener("click", radenAction);
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling down the page when space is pressed
        radenAction();
    }
});

function radenAction() {
    clearAllTimeouts();
    radenCharacter.classList.remove("raden-spin-animation");

    totalClicks++;
    updateClickCount(); 
    sendClickCountToBackend(totalClicks);
    
    
    ctr++; //For knowing which audio/animation to play

    if (ctr % 2 != 0) {
        playAudio(audioMaitake1);
        radenAnimation("まいたけ<br>");
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
        }
    }   

    myClicks++; //record your own clicks in localstorage
    localStorage.setItem("myClicks", JSON.stringify(myClicks));
    myClicksCounter.textContent = `You: ${myClicks}`;
    console.log(myClicks)

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

//To collect and clear all timeouts for more responsive clickings
function clearAllTimeouts() {
    timeouts.forEach(clearTimeout); // Clear all stored timeouts
    timeouts = []; // Reset the array
}


//About modal stuff
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

//Backend stuff
function sendClickCountToBackend(clicks) {
    const url = 'https://script.google.com/macros/s/AKfycbx2iVMtp6XCsnfDB-qVo92GyONrTKehEouQ6Hi5v-Nl3dVqph8x5GFrLH8ze-goDnL3AQ/exec'; // Replace with your deployed web app URL
    fetch(`${url}?action=record&clicks=${clicks}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })  
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Optionally, handle the response
    })
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

// Function to fetch total clicks from Google Sheets
function fetchTotalClicks() {
    const url = 'https://script.google.com/macros/s/AKfycbx2iVMtp6XCsnfDB-qVo92GyONrTKehEouQ6Hi5v-Nl3dVqph8x5GFrLH8ze-goDnL3AQ/exec'; // Replace with your deployed web app URL
    fetch(`${url}?action=getTotal`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response); // Log response for debugging
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data); // Log the data returned
        totalClicks = data.totalClicks; // Update totalClicks with the fetched value
        updateClickCount(); // Update the display
    })
    .catch((error) => console.error('Error:', error));
}

fetchTotalClicks();