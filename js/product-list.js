(async function () {
  let currentRate = 1;
  const response = await fetch("products.json");
  const products = await response.json();

  let unlock = true;
  const timeout = 800;
  renderProducts(products);

  function renderProducts(products) {
    const productContainer = document.querySelector(".grid");
    productContainer.innerHTML = "";
    for (const product of products) {
      productContainer.innerHTML += `
                <div class="grid-item">
                    <div class="grid-item__image-container">
                        <img src="${product.image}" class="grid-item__image" alt="${product.title}">
                    </div>
                    <h3 class="grid-item__title">${product.title}</h3>
                    <p class="grid-item__price">${product.price}</p>
                    <div class="grid-item__button-container">
                        <a href="#${product.info}" class="popup-link grid-item__button-info">Info</a>
                        <a href="" class="grid-item__button-buy">Buy →</a>
                    </div>
                </div>`;
    }
  }

  async function convertCurrency() {
    const currency = document.querySelector(".currency-value").value;
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const ratesData = await response.json();
    currentRate = ratesData.rates[currency];
    const productPrice = document.querySelectorAll(".grid-item__price");
    for (let price of productPrice) {
      price.innerHTML = (price.innerText * currentRate).toFixed(2);
    }
  }

  document
    .querySelector(".convert-currency")
    .addEventListener("click", convertCurrency);

  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const popupCloseIcon = document.querySelectorAll(".close-popup");

  if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
      const popupLink = popupLinks[i];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const curentPopup = document.getElementById(popupName);
        console.log("fs");
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
      const el = popupCloseIcon[i];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      curentPopup.classList.add("open");
      bodyLock();
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__wrapper")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector("body").offsetWidth + "px";
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
})();
