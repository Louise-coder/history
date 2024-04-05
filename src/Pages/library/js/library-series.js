// FUNCTION TO DISPLAY ONE SERIE
function display_serie(mySerie, i){
    const mycontent = document.querySelector(".mycontent");
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let picture = document.createElement("div");
    picture.classList.add("picture");
    picture.style.backgroundImage = "url("+mySerie.img+")";
    let content = document.createElement("div");
    content.classList.add("card-content");
    let title = document.createElement("h3");
    title.textContent = mySerie.title;
    let rating = document.createElement("div");
    rating.classList.add("rating");
    let myrating = parseInt(mySerie.rating[4]);
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

// Display all series in JSON file
fetch('./json/series.json').then(function(response){
    return response.json();
}).then(function(obj){
    for(let i=1; i<obj.length; i++){
        console.log()
        display_serie(obj[i],i);
    }
});

//Display all series in LocalStorage
const LSserieID = localStorage.getItem("serie_id");
if(LSserieID !== null){
    const serieID = parseInt(LSserieID);
    for(let i=1; i <= serieID; i++){
        const mySerie = JSON.parse(localStorage.getItem("serie"+i));
        display_serie(mySerie, i);
    }
}