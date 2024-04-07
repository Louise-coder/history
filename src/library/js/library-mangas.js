// FUNCTION TO DISPLAY ONE MANGA
function display_manga(myManga, id){
    const mycontent = document.querySelector(".mycontent");
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let picture = document.createElement("div");
    picture.classList.add("picture");
    picture.style.backgroundImage = "url("+myManga.img+")";
    let content = document.createElement("div");
    content.classList.add("card-content");
    let title = document.createElement("h3");
    title.textContent = myManga.title;
    let rating = document.createElement("div");
    rating.classList.add("rating");
    let myrating = parseInt(myManga.rating[4]);
    for(let j=id*5; j>(id-1)*5; j--){
        let label = document.createElement("label");
        label.setAttribute("for", "star"+j);
        if (j <= myrating+5*(id-1)){
            label.classList = "af";
        }
        else{
            label.classList = "bef";
        }
        rating.appendChild(label);
    }
    const searchParams = new URLSearchParams();
    searchParams.append("id", id);
    searchParams.append("type", "manga");
    const paramString = searchParams.toString();
    let link = document.createElement('a');
    link.setAttribute("href", "../content/content.html?"+paramString);
    link.classList.add('btn');
    link.textContent = 'See more';
    content.appendChild(title);
    content.appendChild(rating);
    content.appendChild(link);
    newCard.appendChild(picture);
    newCard.appendChild(content);
    mycontent.appendChild(newCard);
}

// Display all mangas in JSON file
fetch('./json/mangas.json').then(function(response){
    return response.json();
}).then(function(obj){
    for(let i=1; i<obj.length; i++){
        console.log()
        display_manga(obj[i],i);
    }
});

//Display all mangas in LocalStorage
const LSmangaID = localStorage.getItem("manga_id");
if(LSmangaID !== null){
    const mangaID = parseInt(LSmangaID);
    for(let i=10; i <= mangaID; i++){
        myManga = localStorage.getItem("manga"+i);
        if (myManga!==null){
            display_manga(JSON.parse(myManga), i);
        }
    }
}
// CLEAR LS
clear.onclick = () =>{
    var result = confirm("Are you sure?");
    if(result == false){
        event.preventDefault();
        return;
    }
    localStorage.clear();
    alert("All content in the Local Storage has been successfully cleared!");
    document.location.reload();
}