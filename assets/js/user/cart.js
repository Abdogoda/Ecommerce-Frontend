// Get cart from localStorage or initialize an empty cart
function getCart() {
  // Clean up any old cartItems data and migrate to cart
  const oldCartItems = localStorage.getItem("cartItems");
  const currentCart = localStorage.getItem("cart");

  if (oldCartItems && !currentCart) {
    localStorage.setItem("cart", oldCartItems);
    localStorage.removeItem("cartItems");
  }

  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge quantity
function updateCartBadge() {
  let cart = getCart();
  let totalQuantity = cart.reduce(
    (sum, item) => sum + parseInt(item.quantity),
    0,
  );
  let cartBadge = document.getElementById("cart-badge");

  if (cartBadge) {
    if (totalQuantity > 0) {
      cartBadge.innerText = totalQuantity;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.classList.add("hidden");
    }
  } else {
    console.error("Cart badge element not found!");
  }
}

// Add product to cart
function addToCart(productId, name, price, quantity = 1, image = "") {
  let cart = getCart();
  let existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    const newProduct = { id: productId, name, price, quantity, image };
    cart.push(newProduct);
  }

  saveCart(cart);
  updateCartBadge();
  displayCartButton();

  // Show success message
  if (typeof showToast === "function") {
    showToast("success", `${name} added to cart!`);
  } else {
  }
}

// Remove product from cart
function removeFromCart(productId) {
  let cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  displayCartButton();
  displayCartItems(); // Update the UI
}

// Update product quantity in cart
function updateCartItem(productId, quantity) {
  let cart = getCart();
  let product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity = quantity > 0 ? quantity : 1;
  }

  saveCart(cart);
  updateCartBadge();
  displayCartItems(); // Refresh cart items
}

// Get total price of cart
function getTotalPrice() {
  let cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Clear the entire cart
function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge();
  displayCartButton();
  displayCartItems();
  closeModal("clearCartModal");
}

// Display cart items in the cart page
function displayCartItems() {
  let cart = getCart();
  let cartContainer = document.getElementById("cart-items");
  let subTotalPriceContainer = document.getElementById("cart-subtotal");
  let totalPriceContainer = document.getElementById("cart-total");

  if (!cartContainer || !subTotalPriceContainer || !totalPriceContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-center text-gray-600'>Your cart is empty.</p>";
    subTotalPriceContainer.innerText = "$0.00";
    totalPriceContainer.innerText = "$0.00";
    return;
  }

  cart.forEach((item) => {
    cartContainer.innerHTML += `
                <div class="cart-item flex justify-between items-center border-b border-gray-700 py-3">
                    <div class="flex items-center gap-4">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded">
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-blue-400">$${item.price}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <input type="number" value="${item.quantity}" min="1" 
                            class="w-14 text-center bg-gray-700 border border-gray-600 p-1 rounded text-gray-300"
                            onchange="updateCartItem(${item.id}, this.value)">
                        <button class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded" 
                            onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `;
  });

  subTotalPriceContainer.innerText = `$${getTotalPrice().toFixed(2)}`;
  totalPriceContainer.innerText = `$${parseFloat(getTotalPrice().toFixed(2)) + 25.0}`; // Assuming a flat shipping fee of $25.00
}

function displayCartButton() {
  let checkoutButton = document.getElementById("checkoutButton");
  let clearCartButton = document.getElementById("clearCartButton");
  let cart = getCart();

  if (!checkoutButton || !clearCartButton) return;

  if (cart.length > 0) {
    checkoutButton.classList.remove("hidden");
    clearCartButton.classList.remove("hidden");
  } else {
    checkoutButton.classList.add("hidden");
    clearCartButton.classList.add("hidden");
  }
}

function getCartItemsWithQuantity() {
  let cart = getCart();
  return cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
}

// Initialize cart badge & items on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  displayCartItems();
  displayCartButton();
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItem = updateCartItem;
window.updateCartBadge = updateCartBadge;
window.clearCart = clearCart;
window.getCart = getCart;
window.getTotalPrice = getTotalPrice;
window.getCartItemsWithQuantity = getCartItemsWithQuantity;
