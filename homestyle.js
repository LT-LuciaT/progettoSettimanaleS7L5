const STRIVEschool = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIzMmI3NDcwMTAwMTU4YjJhZmEiLCJpYXQiOjE3Mzc3MTAzODYsImV4cCI6MTczODkxOTk4Nn0.RPtjlDt--oxvJSpmA0Fo6zhhWpskj5mdw7LWtohunC4";

function fetchProducts() {
  fetch(STRIVEschool, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti");
      }
      return response.json();
    })
    .then((products) => {
      if (document.getElementById("product-list")) {
        displayProducts(products);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Errore nel caricamento dei prodotti");
    });
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-12", "col-md-4", "col-lg-2");

    const productLink = document.createElement("a");
    productLink.href = `dettaglio.html?id=${product._id}`;
    productLink.classList.add("text-decoration-none");

    productCard.innerHTML = `
    <div class="card">
      <img src="${product.imageUrl || "https://via.placeholder.com/250"}" alt="${product.name}">
      <div class="card-body">
      <h5 class="card-title">
            <a href="dettaglio.html?id=${product._id}" class="text-decoration-none text-dark">${product.name}</a>
          </h5>
        <p class="card-text">${product.description}</p>
        <div class="price">€ ${product.price.toFixed(2)}</div>
      </div>
    </div>
  `;

    productList.appendChild(productCard);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});
