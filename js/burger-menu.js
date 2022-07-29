(function () {
  const iconBurger = document.querySelector(".navbar__burger-menu");
  const navBody = document.querySelector(".navigation-wrapper");
  iconBurger.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    iconBurger.classList.toggle("active");
    navBody.classList.toggle("active");
  });

  const navLinks = document.querySelector(".navigation-pages__link");
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (_) => {
      if (iconBurger.classList.contains("active")) {
        document.body.classList.remove("lock");
        navBody.classList.remove("active");
        iconBurger.classList.remove("active");
      }
    });
  });
})();
