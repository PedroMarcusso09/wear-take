const cartList = document.querySelector(".cart-list")
const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const cartQuantity = document.querySelector(".quantity-number")
const cartTotal = document.querySelector(".total-number")
const cartEmpty = document.querySelector('.cart-empty')
const addItems = document.querySelector(".add-items")
const ulMainCards = document.querySelector(".main-cards ul")

let cart = []


function createProductElement(product) {
  const li = document.createElement("li")
  li.classList.add("product-card")

  const img = document.createElement("img")
  img.src = product.img;
  img.alt = product.title;

  const span = document.createElement("span")
  span.className = "cardTipo product-tag"
  span.textContent = product.tag.join(", ")

  const h3 = document.createElement("h3")
  h3.textContent = product.nameItem

  const p = document.createElement("p")
  p.textContent = product.description

  const strong = document.createElement("strong")
  strong.textContent = `R$${product.value}`

  const button = document.createElement("button")
  button.className = "add-to-cart"
  button.dataset.id = product.id
  button.textContent = "Adicionar ao Carrinho"

  li.appendChild(img)
  li.appendChild(span)
  li.appendChild(h3)
  li.appendChild(p)
  li.appendChild(strong)
  li.appendChild(button)

  return li
}

function renderProducts(products) {
  ulMainCards.innerHTML = ""

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const li = createProductElement(product)
    ulMainCards.appendChild(li)
  }
}


const ulHeaderMenu = document.querySelector(".header-menu")
function filterProducts(event, filter) {
    // Previne o comportamento padrão do evento de clique
    event.preventDefault();
  
    console.log("Filtering products with category:", filter)
  
    const filteredProducts = []
  
    for (let i = 0; i < data.length; i++) {
      const product = data[i]
  
      if (filter === "Todos" || product.tag.includes(filter)) {
        filteredProducts.push(product)
      }
    }
  
    renderProducts(filteredProducts)
  }
  
ulHeaderMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const filter = event.target.getAttribute("data-filter")
      filterProducts(event, filter)
    }
  }
)
  
  ulMainCards.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const productId = parseInt(event.target.dataset.id)
      addToCart(productId)
      updateCart()
    }
  }
)
  
function addToCart(productId) {
  let itemInCart = false
  let i = 0

  while (!itemInCart && i < cart.length) {
    if (cart[i].id === productId) {
      cart[i].quantity++
      itemInCart = true
    }
    i++
  }

  if (!itemInCart) {
    cart.push({ id: productId, quantity: 1 })
  }
  const productElement = ulMainCards.querySelector(`[data-id="${productId}"]`)
  if (productElement) {
    const img = productElement.querySelector("img")
    if (img) {
      img.classList.add("added-to-cart")
    }
  }
}

function updateCart() {
  cartList.innerHTML = ""
  let totalQuantity = 0
  let totalPrice = 0

  if (cart.length === 0) {
    cartEmpty.style.display = "flex"
  } else {
    cartEmpty.style.display = "none"
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const product = data.find((product) => product.id === item.id);
    const li = document.createElement("li")
    li.innerHTML = `
    <div class="cart-item-info">
      <img src="${product.img}" alt="${product.title}">
      <div class="product-details">
        <h3>${product.nameItem}</h3>
        <strong>R$${product.value}</strong>
        <button class="remove-from-cart" data-id="${product.id}">Remover</button>
      </div>
    </div>
  `
    cartList.appendChild(li)
    totalQuantity += item.quantity
    totalPrice += item.quantity * product.value;
}

  if (totalQuantity > 0) {
    const elements = document.querySelectorAll(".hidden")
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("hidden")
    }
  } else {
    const elements = document.querySelectorAll(".quantity-text, .quantity-number, .total-text, .total-number")
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("hidden")
    }
  }
  cartQuantity.textContent = totalQuantity;
  cartTotal.textContent = `R$${totalPrice.toFixed(2)}`
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId)

  if (itemIndex > -1) {
    cart[itemIndex].quantity--;

    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1)
    }
  }

  updateCart();
}

function searchProducts(searchTerm) {
  const searchTermLower = searchTerm.toLowerCase()

  const filteredProducts = data.filter((product) =>
    product.nameItem.toLowerCase().includes(searchTermLower)
  );

  renderProducts(filteredProducts)
}

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.trim()
    searchProducts(searchTerm);
  }
});

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value
  searchProducts(searchTerm)
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart")) {
    const productId = parseInt(event.target.dataset.id)
    removeFromCart(productId)
  }
});

renderProducts(data)

