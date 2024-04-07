document.addEventListener("DOMContentLoaded", function() {
    const navbarLinks = document.querySelectorAll(".navbar-link");
    const articles = document.querySelectorAll("article");
  
    navbarLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetPage = this.dataset.navLink;
        const targetArticle = document.querySelector(`[data-page="${targetPage}"]`);
  
        articles.forEach(article => {
          article.classList.remove("active");
        });
  
        targetArticle.classList.add("active");
  
        // Smooth scroll to the target article
        window.scrollTo({
          top: targetArticle.offsetTop - 50, // Adjust the offset as needed
          behavior: "smooth"
        });
      });
    });
  });
  