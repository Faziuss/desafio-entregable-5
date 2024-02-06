const socket = io();

const d = document;

const formProduct = d.getElementById("formProduct");

formProduct.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {

  const name = d.getElementById("name").value;
  const stock = d.getElementById("stock").value;
  const description = d.getElementById("description").value;

  await axios.post("/realtimeproducts/add", {
    name,
    stock: stock,
    description
  });

  formProduct.reset();
  } catch (error) {
    console.log(error);
  }
  
});

const productsContainer = d.getElementById("productsContainer");

socket.on("newProduct", (newProduct) => {
  const $element = d.createElement("div");
  $element.dataset.id = newProduct.id;
  $element.innerHTML = `<li>${newProduct.name}</li>
    <li>${newProduct.stock}</li>
    <li>${newProduct.description}</li>
    <button onclick="removeProduct(${newProduct.id})">Eliminar Producto</button>`;

  productsContainer.appendChild($element);
});

const removeProduct = async (pid) => {
  await axios.delete(`/realtimeproducts/remove/${pid}`);
  console.log(pid, "eliminado con exito");
};

socket.on("deleteProduct", (id) => {
  const $product = d.querySelector(`[data-id="${id}"]`);
  $product.remove();
});
