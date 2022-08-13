(async function () {
  //Productlist
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
                    <p class="grid-item__price" data-id="${product.id}">$${product.price}</p>
                    <div class="grid-item__button-container">
                        <a href="#${product.info}" class="popup-link grid-item__button-info">Info</a>
                        <button class="grid-item__button-buy" id="${product.id}">Buy →</button>
                    </div>
                </div>`;
    }
  }

  //Popup
  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const popupCloseIcon = document.querySelectorAll(".close-popup");

  if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
      const popupLink = popupLinks[i];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const curentPopup = document.getElementById(popupName);
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

  //Cart
  const buyBtn = document.querySelectorAll(".grid-item__button-buy");
  const cartQuantity = document.querySelector(".cart-icon__count-num");
  const cartProductsList = document.querySelector(".cart__prodacts");
  const cartContent = document.querySelector(".popup__cart");
  const cartEmpty = document.querySelector(".cart__empty");
  const totalPrice = document.querySelector(".cart__total-value");
  let productQuantity;
  let productPrices;
  let deleteBtn;
  let curentProductQuantity = 1;

  renderProduct();

  function renderProduct() {
    for (const button of buyBtn) {
      button.addEventListener("click", function () {
        let productItem = getProductById(button.id);
        if (!cartProductsList.innerHTML.includes(productItem.title)) {
          cartProductsList.innerHTML += generateProductItem(productItem);
          productQuantity = document.querySelectorAll(".cart__prodacts-count");
          productPrices = document.querySelectorAll(".cart__prodacts-price");
          deleteBtn = document.querySelectorAll(
            ".cart__prodacts-litter-bin-icon"
          );
          countTotalPrice(productPrices);
          countProductsPrice();
          printQuantity();
          deleteProductItem();
        }
      });
    }
  }

  function countProductsPrice() {
    for (const num of productQuantity) {
      num.addEventListener("input", (event) => {
        curentProductQuantity = event.target.value;
        for (const price of productPrices) {
          if (num.dataset.id === price.dataset.id) {
            const originPrice = getProductById(price.dataset.id).price;
            price.innerText = (originPrice * curentProductQuantity).toFixed(2);
          }
        }
        countTotalPrice(productPrices);
      });
    }
  }

  function countTotalPrice(arr) {
    let result = 0;
    for (const itemPrice of arr) {
      result += +itemPrice.innerHTML;
    }
    totalPrice.innerText = result.toFixed(2);
  }

  function getProductById(id) {
    return products.find((product) => product.id === id);
  }

  function generateProductItem(item) {
    return `<div class="cart__prodacts-item">
              <div class="cart__prodacts-first-part">
                <div class="cart__prodacts-image-container">
                  <img src="${item.image}" class="cart__prodacts-image" alt="${item.title}">
                </div>
                <p class="cart__prodacts-title">${item.title}</p>
                <input type="number" class="cart__prodacts-count" data-id="${item.id}" value="1" min="1" max="99">
              </div>
              <div class="cart__prodacts-second-part">
                <p class="cart__prodacts-price" data-id="${item.id}">${item.price}</p>
                <div class="cart__prodacts-litter-bin-icon-container">
                  <img src="img/litter-bin-icon.svg" class="cart__prodacts-litter-bin-icon"
                  alt="Image of litter bin">
                </div>
              </div>
            </div>`;
  }

  function printQuantity() {
    let productsListLength = cartProductsList.querySelectorAll(
      ".cart__prodacts-item"
    ).length;
    cartQuantity.innerHTML = productsListLength;
    if (productsListLength > 0) {
      cartEmpty.classList.remove("active");
      cartContent.classList.add("active");
    }
    if (productsListLength === 0) {
      cartEmpty.classList.add("active");
      cartContent.classList.remove("active");
    }
  }

  function deleteProductItem() {
    for (const button of deleteBtn) {
      button.addEventListener("click", (event) => {
        event.target.closest(".cart__prodacts-item").remove();
        productPrices = document.querySelectorAll(".cart__prodacts-price");
        countTotalPrice(productPrices);
        printQuantity();
      });
    }
  }
})();
