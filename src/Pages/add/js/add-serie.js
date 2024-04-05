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
add_serie.onclick = () => {
    let content = {
        title: title.value,
        producer: producer.value,
        year: year.value,
        episodes: ep.value,
        genres: get_genres(),
        plateform: plateform.value,
        synopsis: synopsis.value,
        rating: get_rating(),
    }
    const imgPath = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        set_id("serie");
        content.img = reader.result;
        localStorage.setItem("serie"+localStorage.getItem("serie_id"), JSON.stringify(content));
        //document.location.reload();
    }, false);
    if(imgPath) {
        reader.readAsDataURL(imgPath);
    }
}