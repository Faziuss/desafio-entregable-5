const socket = io();

const d = document;

const formProduct = d.getElementById("formProduct");

formProduct.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = d.getElementById("name").value;
  const stock = d.getElementById("stock").value;
  const description = d.getElementById("description").value;

  await axios.post("/realtimeproducts/add", {
    name,
    stock,
    description,
    id: 5,
  });

  formProduct.reset()
});

const productsContainer = d.getElementById("productsContainer");

socket.on("newProduct", (newProduct) => {
  const $element = d.createElement("div");
  $element.dataset.id = newProduct.id;
  $element.innerHTML = `<li>${newProduct.name}</li>
    <li>${newProduct.stock}</li>
    <li>${newProduct.description}</li>`;
  productsContainer.appendChild($element);
});
