const yearSelect = document.getElementById("year");
const seasonSelect = document.getElementById("season");

function populateYears(){
    let year = new Date().getFullYear();
    for(let i = 0; i < 101; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

function populateSeason(){
    let ep = 1;
    for(let i = 0; i < 5; i++){
        const option = document.createElement("option");
        option.textContent = ep + i;
        seasonSelect.appendChild(option);
    }
}

populateYears();
populateSeason();

let profilePic = document.getElementById("anime-pic");
let inputFile = document.getElementById("input-file");
inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}


