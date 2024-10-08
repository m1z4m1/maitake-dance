const radenCharacter = document.querySelector(".raden-image");
const audioMaitake1 = "./assets/audio/maitake-1.mp3";
const audioGuru1 = "./assets/audio/guru-1.mp3";
const audioGuruE = "./assets/audio/guru-end.mp3";
const spiralImage = document.querySelector(".spiral-img");
const speedToggle = document.querySelector("#speed-toggle")

let bigText = document.querySelector(".text-el");

const modalWindow = document.querySelector(".about-modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const clickCounter = document.querySelector(".click-counter-text");

let ctr = 0; //For knowing which audio/animation to play
let timeouts = [];

// Preload images and audio
const images = [
    "assets/images/raden.webp",
    "assets/images/raden-l-1.webp",
    "assets/images/raden-l-2.webp",
    "assets/images/raden-r-1.webp",
    "assets/images/raden-r-2.webp",
    "assets/images/raden-f.webp"
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


//This url is the API endpoint that updates instantly
//The actual API getting data is so slow so i used this.
const url = 'https://api.counterapi.dev/v1/maitake-namespace/maitake-name/up';

//But everytime I reference that url, it increments the counter so it already increments even just opening the site so I need a workaround..
//This one works the same as the above one but it decrements the counter so it will work to cancel out the increment lmao
const url2 = 'https://api.counterapi.dev/v1/maitake-namespace/maitake-name/down';

let totalCounter = 0; //

async function fetchUpCount() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Parse the JSON response
        return (data.count); // Return the count value
    } catch (error) {
        console.error('There was a problem fetching the count:', error);
    }
}

async function fetchDownCount() {
    try {
        const response = await fetch(url2);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Parse the JSON response
        return (data.count); // Return the count value
    } catch (error) {
        console.error('There was a problem fetching the count:', error);
    }
}

//Fetch and display the count from JSON
function updateFromFetch() {
    fetchUpCount().then(count => {
        totalCounter = count; // Fetch the actual count after the Promise resolves
        clickCounter.textContent = totalCounter;   
    });
}

function updateFromFetchDown() {
    fetchDownCount().then(count => {
        totalCounter = count; // Fetch the actual count after the Promise resolves
        clickCounter.textContent = totalCounter;   
    });
}

function fetchActualCount() {
    //there's a time lag between two so inaccurate results shows when there's no setTimeout
    
    setTimeout(function(){
        fetchDownCount();
    }, 600)
    
    setTimeout(function(){
        updateFromFetch();
    }, 1000)
    
}

fetchActualCount();

async function getCountValue() {
    const count = await fetchUpCount(); // Wait for fetchUpCount to resolve
    return count; // Return the count value
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function refreshActualCount() {
    let tempActualCount = await getCountValue();
    fetchDownCount();
    
    for (let i = totalCounter; i < tempActualCount; i++) {
            await delay(50);
            totalCounter++;
            clickCounter.textContent = totalCounter;
    }
    // console.log(tempActualCount);
}


//Just increment. 
async function incrementCounter() {
    try {
        // Send a request to the URL
        await fetch(url, {
            method: 'GET', // You can use GET if that works for the API
            mode: 'no-cors' // This will prevent CORS issues, but you'll not get a response back
        });
        // Note: Using 'no-cors' will make the response opaque, meaning you won't be able to read it
    } catch (error) {
        console.error('There was a problem incrementing the counter:', error);
    }
}


//button debounce
function throttle(func, delay, immediate = true) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        
        if (immediate && now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }

        // If immediate is false or subsequent calls are too soon, ignore them
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

const throttledRadenActionSlow = throttle(radenAction, 760, true);
const throttledRadenActionFast = throttle(radenAction, 200, true);

function getCurrentAction() {
    if (speedToggle.checked) {
        return throttledRadenActionSlow;  // Return slow action if checked
    } else {
        return throttledRadenActionFast;  // Return fast action if unchecked
    }
}

//The button basically
//mouse click
radenCharacter.addEventListener("click", function(){
    getCurrentAction()();
});
//keyboard press
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling down the page when space is pressed
        getCurrentAction()();
    }
});

function radenAction() {
    clearAllTimeouts();
    radenCharacter.classList.remove("raden-spin-animation");
    
    ctr++; 
    totalCounter++;
    clickCounter.textContent = totalCounter;
    incrementCounter();

    if (ctr % 2 != 0) {
        playAudio(audioMaitake1);
        radenAnimation("まいたけ<br>");
    }
    else if (ctr % 2 === 0) {
        if (ctr === 8) {
            radenCharacter.src = "assets/images/raden-f.webp"
            radenCharacter.classList.add("raden-spin-animation");
            bigText.innerHTML = "";
            playAudio(audioGuruE);
            timeouts.push(setTimeout(function(){
                radenCharacter.classList.remove("raden-spin-animation");
            }, 720));
            ctr = 0;
        }
        else {
            playAudio(audioGuru1);
            radenAnimation("ぐるぐる<br>");
        }
    }   



}

function playAudio(src) {
    let audio = new Audio(src);
    audio.play();
}

function radenAnimation(text) {
    radenCharacter.src = "assets/images/raden-l-1.webp";
    
    // Use timeouts and store their IDs in the array
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-l-2.webp";
        bigText.innerHTML = text;
    }, 120));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.webp";
    }, 240));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-1.webp";
        bigText.innerHTML += text;
    }, 360));
    
    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden-r-2.webp";
    }, 480));

    timeouts.push(setTimeout(function(){
        radenCharacter.src = "assets/images/raden.webp  ";
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


window.addEventListener("load", function(){
    console.log("Load Done");
    fetchActualCount();
    setInterval(refreshActualCount, 2500); // Optionally, update the count every 1min

})

