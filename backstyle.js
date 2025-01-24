const STRIVEschool = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIzMmI3NDcwMTAwMTU4YjJhZmEiLCJpYXQiOjE3Mzc3MTAzODYsImV4cCI6MTczODkxOTk4Nn0.RPtjlDt--oxvJSpmA0Fo6zhhWpskj5mdw7LWtohunC4";

function fetchProducts() {
  fetch(STRIVEschool, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`,
    },
  });
}

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
      document.getElementById("productForm").reset();
    })
    .catch((error) => {
      console.error("Errore nell'aggiungere il prodotto:", error);
      alert("Errore nell'aggiungere il prodotto: " + error.message);
    });
});
