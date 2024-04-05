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
    if (localStorage.getItem(content+"_id") === null){
        localStorage.setItem(content+"_id", "10")
    }
    else{
        localStorage.setItem(content+"_id",parseInt(localStorage.getItem(content+"_id"))+1)
    }
}
add_book.onclick = () => {
    let content = {
        title: title.value,
        author: author.value,
        year: year.value,
        pages: pages.value,
        chapters: chapters.value,
        genre: get_genres(),
        synopsis: synopsis.value,
        rating: get_rating(),
    }
    const imgPath = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        set_id("book");
        content.img = reader.result;
        localStorage.setItem("book"+localStorage.getItem("book_id"), JSON.stringify(content));
        //document.location.reload();
    }, false);
    if(imgPath) {
        reader.readAsDataURL(imgPath);
    }
}