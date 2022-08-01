(async function () {
  let currentRate = 1;
  const response = await fetch("../api/products.json");
  const products = await response.json();
  renderProducts(products, currentRate);

  function renderProducts(products, currentRate) {
    const productContainer = document.querySelector(".grid");
    productContainer.innerHTML = "";
    for (const product of products) {
      productContainer.innerHTML += `
            <div class="grid-item">
                    <div class="grid-item__image-container">
                        <img src="${
                          product.image
                        }" class="grid-item__image" alt="${product.title}">
                    </div>
                    <h3 class="grid-item__title">${product.title}</h3>
                    <p class="grid-item__price">${(
                      product.price * currentRate
                    ).toFixed(2)}</p>
                    <div class="grid-item__button-container">
                        <a href="" class="grid-item__button-info">Info</a>
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
    renderProducts(products, currentRate);
  }

  document
    .querySelector(".convert-currency")
    .addEventListener("click", convertCurrency);
})();
