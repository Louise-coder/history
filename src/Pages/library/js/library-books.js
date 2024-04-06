// FUNCTION TO DISPLAY ONE BOOK
function display_book(myBook, id){
    const mycontent = document.querySelector(".mycontent");
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let picture = document.createElement("div");
    picture.classList.add("picture");
    picture.style.backgroundImage = "url("+myBook.img+")";
    let content = document.createElement("div");
    content.classList.add("card-content");
    let title = document.createElement("h3");
    title.textContent = myBook.title;
    let rating = document.createElement("div");
    rating.classList.add("rating");
    let myrating = parseInt(myBook.rating[4]);
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
    searchParams.append("type", "book");
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

// Display all books in JSON file
fetch('./json/books.json').then(function(response){
    return response.json();
}).then(function(obj){
    for(let i=1; i<obj.length; i++){
        display_book(obj[i],i);
    }
});

//Display all books in LocalStorage
const LSbookID = localStorage.getItem("book_id");
if(LSbookID !== null){
    const bookID = parseInt(LSbookID);
    for(let i=10; i <= bookID; i++){
        myBook = localStorage.getItem("book"+i);
        if (myBook!==null){
            display_book(JSON.parse(myBook), i);
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