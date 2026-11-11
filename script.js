// Store cart items in an array
let cart = [];

// 1. Live Search Functionality
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const productCards = document.querySelectorAll(".product");

function filterProducts() {
    const query = searchInput.value.toLowerCase().trim();

    productCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Filter as the user types or clicks the Search button
searchInput.addEventListener("input", filterProducts);
searchBtn.addEventListener("click", filterProducts);

// 2. Add to Cart Functionality
const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseInt(button.getAttribute("data-price"));

        // Check if item already exists in cart
        const existingItem = cart.find((item) => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartUI();
    });
});

// 3. Update Cart Display & Total
function updateCartUI() {
    cartItemsList.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
            <button onclick="removeItem(${index})" style="margin-left: 10px; padding: 4px 8px; background: crimson;">Remove</button>
        `;
        cartItemsList.appendChild(li);
    });

    cartCount.textContent = totalItems;
    cartTotalDisplay.textContent = total;
}

// 4. Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 5. Checkout Button
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some organic products first.");
    } else {
        alert(`Thank you for shopping at Fresh Organic Store! Total Paid: ₹${cartTotalDisplay.textContent}`);
        cart = [];
        updateCartUI();
    }
});
