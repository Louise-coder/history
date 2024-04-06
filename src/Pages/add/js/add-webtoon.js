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
        if(field_name === "chapters"){
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
                if(field_name === "synopsis"){
                    inputField.style.borderColor = "red";
                }
                else{
                    inputField.style.borderBottomColor = "red";
                }  
                inputError.style.top = "105%";
                return false;
            }
        }
        if(field_name === "synopsis"){
            inputField.style.borderColor = "green";
        }
        else{
            inputField.style.borderBottomColor = "green";
        } 
    }
    inputError.innerHTML = ""
    inputError.style.top = "100%";
    return true;
}

/* Local Storage */
function get_genres(){
    genres = [];
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
add_webtoon.onclick = () => {
    let valTitle = validateInput("title");
    let valAuthor = validateInput("author");
    let valChap = validateInput("chapters");
    let valSyn = validateInput("synopsis");
    let valRat = validateInput("rating");
    if(valTitle && valAuthor && valChap && valSyn && valRat){
        if (confirm("Are you sure you want to add this webtoon?")) {
            let content = {
                title: document.getElementById("title-field").value,
                author: document.getElementById("author-field").value,
                year: document.getElementById("year").value,
                chapters: document.getElementById("chapters-field").value,
                genres: get_genres(),
                synopsis: document.getElementById("synopsis-field").value,
                rating: get_rating(),
            }
            const imgPath = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                set_id("webtoon");
                content.img = reader.result;
                localStorage.setItem("webtoon"+localStorage.getItem("webtoon_id"), JSON.stringify(content));
                alert("Webtoon added successfully!");
                //document.location.reload();
            }, false);
            if(imgPath) {
                reader.readAsDataURL(imgPath);
            }
            else{
                alert("Please upload a picture!");
            }
        }
    }
}