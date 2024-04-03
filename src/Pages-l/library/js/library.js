const activePage = window.location.pathname;
console.log(activePage)
const navLinks = document.querySelectorAll('.navigation1 a');
console.log(navLinks);
navLinks.forEach(link => {
    console.log(link.href);
    if(link.href.includes(`${activePage}`)){
        console.log("oui")
        link.classList.add('active');
    }
});