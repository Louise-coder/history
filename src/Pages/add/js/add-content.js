/* Populate inputs */
const yearSelect = document.getElementById("year");

function populateYears(){
    let year = new Date().getFullYear();
    for(let i = 0; i < 150; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

populateYears();

/* Upload picture */
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(inputFile.files[0])
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent = "";
    imageView.style.border = 0;
}
dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
});