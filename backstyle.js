const STRIVEschool = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIzMmI3NDcwMTAwMTU4YjJhZmEiLCJpYXQiOjE3Mzc3MTAzODYsImV4cCI6MTczODkxOTk4Nn0.RPtjlDt--oxvJSpmA0Fo6zhhWpskj5mdw7LWtohunC4";

//visualizza come display

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
});

function loadProducts() {
  fetch(STRIVEschool, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      console.log("Prodotti ricevuti:", products);
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Errore nel recupero dei prodotti:", error);
      alert("Errore nel recupero dei prodotti");
    });
}

function displayProducts(products) {
  console.log("Prodotti da visualizzare:", products);
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
        <img src="${product.imageUrl || "https://via.placeholder.com/250"}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="price">€ ${product.price.toFixed(2)}</div>
        </div>
        <div class="actions">
          <button onclick="editProduct('${product._id}')">Modifica</button>
          <button onclick="deleteProduct('${product._id}')">Elimina</button>
        </div>
      `;

    productList.appendChild(productCard);
  });
}

// aggiungere prodotto
document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    price: parseFloat(document.getElementById("price").value),
    imageUrl:
      document.getElementById("imageUrl").value.trim() === "" ? null : document.getElementById("imageUrl").value,
  };
  console.log("Dati inviati:", newProduct);

  fetch(STRIVEschool, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIkey}`,
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(`Errore: ${JSON.stringify(errorData)}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Prodotto aggiunto con successo:", data);
      alert("Prodotto aggiunto con successo!");
      loadProducts();
      document.getElementById("productForm").reset();
    })
    .catch((error) => {
      console.error("Errore nell'aggiungere il prodotto:", error);
      alert("Errore nell'aggiungere il prodotto: " + error.message);
    });
});

function deleteProduct(productId) {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(`${STRIVEschool}${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${APIkey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Errore: ${JSON.stringify(errorData)}`);
          });
        }
        alert("Prodotto eliminato con successo!");
        loadProducts();
      })
      .catch((error) => {
        console.error("Errore nell'eliminare il prodotto:", error);
        alert("Errore nell'eliminare il prodotto: " + error.message);
      });
  }
}
function editProduct(productId) {
  const productName = prompt("Nuovo nome del prodotto:");
  if (productName) {
    fetch(`${STRIVEschool}${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIkey}`,
      },
      body: JSON.stringify({
        name: productName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Prodotto modificato con successo:", data);
        alert("Prodotto modificato con successo!");
        loadProducts();
      })
      .catch((error) => {
        console.error("Errore nel modificare il prodotto:", error);
        alert("Errore nel modificare il prodotto: " + error.message);
      });
  }
}
