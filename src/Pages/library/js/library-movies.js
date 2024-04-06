// FUNCTION TO DISPLAY ONE MOVIE
function display_movie(myMovie, id){
    const mycontent = document.querySelector(".mycontent");
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let picture = document.createElement("div");
    picture.classList.add("picture");
    picture.style.backgroundImage = "url("+myMovie.img+")";
    let content = document.createElement("div");
    content.classList.add("card-content");
    let title = document.createElement("h3");
    title.textContent = myMovie.title;
    let rating = document.createElement("div");
    rating.classList.add("rating");
    let myrating = parseInt(myMovie.rating[4]);
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
    searchParams.append("type", "movie");
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

// Display all movies in JSON file
fetch('./json/movies.json').then(function(response){
    return response.json();
}).then(function(obj){
    for(let i=1; i<obj.length; i++){
        console.log()
        display_movie(obj[i],i);
    }
});

//Display all movies in LocalStorage
const LSmovieID = localStorage.getItem("movie_id");
if(LSmovieID !== null){
    const movieID = parseInt(LSmovieID);
    for(let i=10; i <= movieID; i++){
        myMovie = localStorage.getItem("movie"+i);
        if (myMovie!==null){
            display_movie(JSON.parse(myMovie), i);
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
    document.location.reload();
}