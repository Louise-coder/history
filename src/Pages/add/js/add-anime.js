/* FORM VALIDATION */
function validateInput(field_name){
    let inputError = document.getElementById(field_name+"-error");
    if(field_name === "rating"){
        let rating = get_rating();
        if(rating === "0"){
            inputError.innerHTML = "On a scale of 1 to 5, how much do you want to watch it?";
            return false;
        }
    }
    else{
        let inputField = document.getElementById(field_name+"-field");
        if(field_name === "episodes"){
            if(!inputField.value.match(/^[0-9]+$/) || inputField.value === ""){
                inputError.innerHTML = "Please enter a valid number of "+field_name+".";
                inputField.style.borderBottomColor = "red";
                inputError.style.top = "105%";
                return false;
            }
        }
        else{
            if(!inputField.value.match(/^[A-Za-z0-9 -']+$/) || inputField.value === ""){
                inputError.innerHTML = "Please enter a valid "+field_name+".";
                inputField.style.borderBottomColor = "red";
                inputError.style.top = "105%";
                return false;
            }
        }
        inputField.style.borderBottomColor = "green";
    }
    inputError.innerHTML = ""
    inputError.style.top = "100%";
    return true;
}


/* Local Storage */
function get_genres(){
    let genres = [];
    document.getElementsByName("genre").forEach(element => {
        if(element.checked){
            genres.push(element.value);
        }
    });
    return genres;
}
function get_rating(){
    let rating = "0";
    let elements = document.getElementsByName("star");
    for (let element of elements){
        if(element.checked){
            rating = element.id;
            break;
        }
    }
    return rating;
}
function set_id(content){
    let content_id = localStorage.getItem(content+"_id")
    if (content_id === null || parseInt(content_id) < 10){
        localStorage.setItem(content+"_id", "10")
    }
    else{
        localStorage.setItem(content+"_id",parseInt(localStorage.getItem(content+"_id"))+1)
    }
}
add_anime.onclick = () => {
    let valTitle = validateInput("title");
    let valProd = validateInput("producer");
    let valEp = validateInput("episodes");
    let valSyn = validateInput("synopsis");
    let valRat = validateInput("rating");
    if (valTitle && valProd && valEp && valSyn && valRat){
        let content = {
            title: document.getElementById("title-field").value,
            producer: document.getElementById("producer-field").value,
            year: document.getElementById("year").value,
            episodes: document.getElementById("episodes-field").value,
            genres: get_genres(),
            plateform: document.getElementById("plateform").value,
            synopsis: document.getElementById("synopsis-field").value,
            rating: get_rating(),
        }
        const imgPath = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            set_id("anime");
            content.img = reader.result;
            localStorage.setItem("anime"+localStorage.getItem("anime_id"), JSON.stringify(content));
            //document.location.reload();
        }, false);
        if(imgPath !== undefined && imgPath !== null) {
            reader.readAsDataURL(imgPath);
        }
        else{
            alert("Please upload a picture!");
        }
    }
}