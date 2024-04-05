const LSanimeID = localStorage.getItem("anime_id");
const mycontent = document.querySelector(".mycontent");

if(LSanimeID !== null){
    const animeID = parseInt(LSanimeID);
    for(let i=1; i <= animeID; i++){
        const myAnime = JSON.parse(localStorage.getItem("anime"+i));
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        let picture = document.createElement("div");
        picture.classList.add("picture");
        picture.style.backgroundImage = "url("+myAnime.img+")";
        let content = document.createElement("div");
        content.classList.add("card-content");
        let title = document.createElement("h3");
        title.textContent = myAnime.title;
        let rating = document.createElement("div");
        rating.classList.add("rating");
        let myrating = parseInt(myAnime.rating[4]);
        for(let j=i*5; j>(i-1)*5; j--){
            let label = document.createElement("label");
            label.setAttribute("for", "star"+j);
            if (j <= myrating){
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
}