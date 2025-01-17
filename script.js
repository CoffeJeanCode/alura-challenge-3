document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  // Cargar productos desde localStorage al iniciar
  loadProducts();

  // Escuchar eventos de eliminación de productos
  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const productCard = event.target.closest(".product-card");
      const productName =
        productCard.querySelector(".product-name").textContent;
      deleteProduct(productName);
      console.log(productCard);
      productCard.remove();
    }
  });

  // Función para cargar productos desde localStorage
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach((product) => addProductToDOM(product));
  }

  // Función para añadir un producto al DOM
  function addProductToDOM(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    console.log(product);
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
              <p class="product-name">${product.name}</p>
              <p class="product-price">$${product.price}</p>
            </div>
            <button class="delete-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4.00022H14V2.33022C13.9765 1.69004 13.7002 1.08528 13.2315 0.648511C12.7629 0.211745 12.1402 -0.0213881 11.5 0.000218771H8.49997C7.85973 -0.0213881 7.23703 0.211745 6.7684 0.648511C6.29977 1.08528 6.02343 1.69004 5.99997 2.33022V4.00022H0.99997C0.734753 4.00022 0.480399 4.10558 0.292863 4.29311C0.105326 4.48065 -3.05176e-05 4.735 -3.05176e-05 5.00022C-3.05176e-05 5.26544 0.105326 5.51979 0.292863 5.70733C0.480399 5.89486 0.734753 6.00022 0.99997 6.00022H1.99997V17.0002C1.99997 17.7959 2.31604 18.5589 2.87865 19.1215C3.44126 19.6842 4.20432 20.0002 4.99997 20.0002H15C15.7956 20.0002 16.5587 19.6842 17.1213 19.1215C17.6839 18.5589 18 17.7959 18 17.0002V6.00022H19C19.2652 6.00022 19.5195 5.89486 19.7071 5.70733C19.8946 5.51979 20 5.26544 20 5.00022C20 4.735 19.8946 4.48065 19.7071 4.29311C19.5195 4.10558 19.2652 4.00022 19 4.00022ZM7.99997 14.0002C7.99997 14.2654 7.89461 14.5198 7.70708 14.7073C7.51954 14.8949 7.26519 15.0002 6.99997 15.0002C6.73475 15.0002 6.4804 14.8949 6.29286 14.7073C6.10533 14.5198 5.99997 14.2654 5.99997 14.0002V10.0002C5.99997 9.735 6.10533 9.48065 6.29286 9.29311C6.4804 9.10558 6.73475 9.00022 6.99997 9.00022C7.26519 9.00022 7.51954 9.10558 7.70708 9.29311C7.89461 9.48065 7.99997 9.735 7.99997 10.0002V14.0002ZM7.99997 2.33022C7.99997 2.17022 8.20997 2.00022 8.49997 2.00022H11.5C11.79 2.00022 12 2.17022 12 2.33022V4.00022H7.99997V2.33022ZM14 14.0002C14 14.2654 13.8946 14.5198 13.7071 14.7073C13.5195 14.8949 13.2652 15.0002 13 15.0002C12.7348 15.0002 12.4804 14.8949 12.2929 14.7073C12.1053 14.5198 12 14.2654 12 14.0002V10.0002C12 9.735 12.1053 9.48065 12.2929 9.29311C12.4804 9.10558 12.7348 9.00022 13 9.00022C13.2652 9.00022 13.5195 9.10558 13.7071 9.29311C13.8946 9.48065 14 9.735 14 10.0002V14.0002Z" fill="white"/>
              </svg>
            </button>
        `;
    productList.appendChild(productCard);
  }

  // Función para añadir un producto a localStorage y al DOM
  function addProduct(name, price, image) {
    const newProduct = { name, price, image };
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    addProductToDOM(newProduct);
  }

  // Función para eliminar un producto de localStorage
  function deleteProduct(name) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter((product) => product.name !== name);
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Ejemplo: añadir un producto de prueba (puedes reemplazarlo con el formulario real)
  document
    .querySelector("#add-product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#product-name").value;
      const price = document.querySelector("#product-price").value;
      const image = document.querySelector("#product-image").value;

      if (name && price && image) {
        addProduct(name, price, image);
        document.querySelector("#add-product-form").reset();
      }
    });
});
