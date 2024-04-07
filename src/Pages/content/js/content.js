// RETRIEVING PARAMETERS
const params = new URL(window.location.href).searchParams;
const paramsObject = {};
params.forEach((value, key) => {
    paramsObject[key] = value;
});

//RETRIEVING CONTENT OBJECT
if(parseInt(paramsObject.id) < 10){
    get_content_from_json(paramsObject);
}
else{
    get_content_from_ls(paramsObject);
}

// DISPLAYING THE PAGE
function get_content_from_json(params){
    fetch('../library/json/'+params.type+'s.json').then(function(response){
        return response.json();
    }).then(function(obj){
        for(let i=1; i<obj.length; i++){
            if (i === parseInt(params.id)){
                display_content(obj[i], params);
            }
        }
    });
}
function get_content_from_ls(params){
    const myContent = JSON.parse(localStorage.getItem(params.type+params.id));
    display_content(myContent, params);
}
function display_content(myContent, params){
    console.log(myContent);
    // AJUSTING THE BACK BUTTON TO THE CORRECT PAGE
    const back = document.querySelector('.Btn');
    back.href = "../library/library-"+params.type+"s.html";
    // DISPLAYING THE PAGE
    const container = document.querySelector(".mycontent");
    // left panel
    let pic = document.createElement("div");
    pic.classList.add("pic");
    let img = document.createElement("div");
    img.classList.add("img");
    let rating = document.createElement("div");
    rating.classList.add("rating");
    let myrating = parseInt(myContent.rating[4]);
    for(let j=5; j>0; j--){
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
    img.style.backgroundImage = "url("+myContent.img+")";
    pic.appendChild(img);
    pic.appendChild(rating);
    let data = document.createElement("div");
    data.classList.add("data");
    container.appendChild(pic);
    // right panel
    if(parseInt(params.id) >= 10){
        let del = document.createElement("div");
        del.classList.add("del");
        let button = document.createElement("a");
        button.classList.add("clearbutton");
        button.id = "del";
        button.textContent = "delete";
        del.appendChild(button);
        data.appendChild(del);
    }
    let title = document.createElement("h1");
    title.textContent = myContent.title;
    data.appendChild(title);
    let type = document.createElement("h2");
    type.textContent = params.type;
    data.appendChild(type);
    
    let genres = document.createElement("ul");
    (myContent.genres).forEach(item=>{
        const element = document.createElement('li');
        element.textContent = item;
        genres.appendChild(element);
    });
    data.appendChild(genres);
    let synopsis = document.createElement("div");
    synopsis.classList.add("synopsis");
    let synopsisTitle = document.createElement("h2");
    synopsisTitle.textContent = "Synopsis";
    let synopsisContent = document.createElement("p");
    synopsisContent.textContent = myContent.synopsis;
    synopsis.appendChild(synopsisTitle);
    synopsis.appendChild(synopsisContent);
    data.appendChild(synopsis);
    let both = document.createElement("div");
    both.classList.add("both");
    let panel1 = document.createElement("div");
    panel1.classList.add("panel");
    let panel2 = document.createElement("div");
    panel2.classList.add("panel");
    let year = document.createElement("div");
    year.classList.add("section");
    let yearTitle = document.createElement("h4");
    yearTitle.textContent = "Year";
    let yearContent = document.createElement("p");
    yearContent.textContent = myContent.year;
    year.appendChild(yearTitle);
    year.appendChild(yearContent);
    panel1.appendChild(year);
    if(params.type === "anime" || params.type === "movie" || params.type === "serie"){
        let producer = document.createElement("div");
        producer.classList.add("section");
        let producerTitle = document.createElement("h4");
        producerTitle.textContent = "Producer";
        let producerContent = document.createElement("p");
        producerContent.textContent = myContent.producer;
        producer.appendChild(producerTitle);
        producer.appendChild(producerContent);
        panel1.appendChild(producer);
        if(params.type !== "movie"){
            let episodes = document.createElement("div");
            episodes.classList.add("section");
            let epTitle = document.createElement("h4");
            epTitle.textContent = "Episodes";
            let epContent = document.createElement("p");
            epContent.textContent = myContent.episodes;
            episodes.appendChild(epTitle);
            episodes.appendChild(epContent);
            panel2.appendChild(episodes);
        }
        let plateform = document.createElement("div");
        plateform.classList.add("section");
        let plTitle = document.createElement("h4");
        plTitle.textContent = "Plateform";
        let plContent = document.createElement("p");
        plContent.textContent = myContent.plateform;
        plateform.appendChild(plTitle);
        plateform.appendChild(plContent);
        panel2.appendChild(plateform);
    }
    else{
        let author = document.createElement("div");
        author.classList.add("section");
        let authorTitle = document.createElement("h4");
        authorTitle.textContent = "Author";
        let authorContent = document.createElement("p");
        authorContent.textContent = myContent.author;
        author.appendChild(authorTitle);
        author.appendChild(authorContent);
        panel1.appendChild(author);
        if(params.type === "book"){
            let pages = document.createElement("div");
            pages.classList.add("section");
            let epTitle = document.createElement("h4");
            epTitle.textContent = "Nb of pages";
            let epContent = document.createElement("p");
            epContent.textContent = myContent.pages;
            pages.appendChild(epTitle);
            pages.appendChild(epContent);
            panel2.appendChild(pages);
        }
        if (params.type === "manga"){
            let volume = document.createElement("div");
            volume.classList.add("section");
            let epTitle = document.createElement("h4");
            epTitle.textContent = "Volume";
            let epContent = document.createElement("p");
            epContent.textContent = myContent.volume;
            volume.appendChild(epTitle);
            volume.appendChild(epContent);
            panel2.appendChild(volume);
        }
        let chapters = document.createElement("div");
        chapters.classList.add("section");
        let plTitle = document.createElement("h4");
        plTitle.textContent = "Nb of chapters";
        let plContent = document.createElement("p");
        plContent.textContent = myContent.chapters;
        chapters.appendChild(plTitle);
        chapters.appendChild(plContent);
        panel2.appendChild(chapters);
    }
    both.appendChild(panel1);
    both.appendChild(panel2);
    data.appendChild(both);
    container.appendChild(data);
}
console.log(paramsObject.type+paramsObject.id);

// DELETE BUTTON
const deleteButton = document.getElementById("del")
deleteButton.addEventListener('click', function() {
    var result = confirm("Are you sure you want to delete this content?");
    if(result == false){
        event.preventDefault();
        return;
    }
    localStorage.removeItem(paramsObject.type+paramsObject.id);
    deleteButton.href = "../library/library-"+paramsObject.type+"s.html";
});