const yearSelect = document.getElementById("year");

function populateYears(){
    let year = new Date().getFullYear();
    for(let i = 0; i < 101; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

populateYears();

let profilePic = document.getElementById("anime-pic");
let inputFile = document.getElementById("input-file");
inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}


