// FUNCTION TO DISPLAY ONE SERIE
function display_movie(myMovie, i){
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
    for(let j=i*5; j>(i-1)*5; j--){
        let label = document.createElement("label");
        label.setAttribute("for", "star"+j);
        if (j <= myrating+5*(i-1)){
            label.classList = "af";
        }
        else{
            label.classList = "bef";
        }
        rating.appendChild(label);
    }
    let link = document.createElement('a');
    link.setAttribute("href", 'card');
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
    for(let i=1; i <= movieID; i++){
        const myMovie = JSON.parse(localStorage.getItem("movie"+i));
        display_movie(myMovie, i);
    }
}