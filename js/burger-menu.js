(function () {
  const iconBurger = document.querySelector(".navbar__burger-menu");
  const navBody = document.querySelector(".navigation-wrapper");
  iconBurger.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    iconBurger.classList.toggle("active");
    navBody.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".navigation-pages__link");
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      if (iconBurger.classList.contains("active")) {
        document.body.classList.remove("lock");
        iconBurger.classList.remove("active");
        navBody.classList.remove("active");
      }
    });
  });
})();
