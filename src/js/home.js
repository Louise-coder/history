//// Script pour la page d'accueil ////


// Déclaration des variables
const title = document.querySelector('.title')
const floor = document.querySelector('.floor')
const bg = document.querySelector('.bg')
const girl = document.querySelector('.girl')
const lanterns = document.querySelector('.lanterns')
const button = document.querySelector('.button')

// Parallax effect
document.addEventListener('scroll', function() {
    let value = window.scrollY
    bg.style.marginBottom = -value * 1.1 + 'px'
    girl.style.marginBottom = -value * 1.2 + 'px'

    button.style.marginTop = value * 0.5 + 'px'

    lanterns.style.marginTop = - value * 3 + 'px'
    floor.style.marginTop = -value *  0.1  + 'px'

})


// Fonction pour animer le logo au clic
document.querySelector('header img').addEventListener('click', function() {
    this.style.animation = 'logoClickAnimation 0.5s';
    setTimeout(() => {this.style.animation = '';}, 500); // Réinitialisation de l'animation après 0.5s
  });


document.addEventListener("DOMContentLoaded", function() {
// Sélectionnez tous les éléments de la barre de navigation
const navLinks = document.querySelectorAll('header nav a');

// Ajoutez un gestionnaire d'événements pour chaque lien de navigation
navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Fonction de défilement fluide
function smoothScroll(event) {
    event.preventDefault();
    const targetId = this.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Durée de l'animation en millisecondes
    let start = null;

    // Fonction de défilement animée
    function scrollAnimation(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOut(progress, startPosition, distance, duration));
        if (progress < duration) {
            window.requestAnimationFrame(scrollAnimation);
        }
    }

    // Fonction de transition d'interpolation de défilement
    function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    window.requestAnimationFrame(scrollAnimation);
}
});

// Fonction pour changer la couleur du titre au survol
document.querySelectorAll('.feature h2').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.color = '#ffffff'; // Changement de couleur au survol
    });

    title.addEventListener('mouseleave', function() {
        this.style.color = '#DDB97F'; // Revenir à la couleur initiale
    });
});