// Cart Page JavaScript
// Features: Cart management, quantity update, remove items

let cart = [];

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="product.html">Continue shopping</a></p>';
        document.getElementById('checkout-btn').style.display = 'none';
        updateTotals();
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image || './img/logo.png'}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-model">Model: ${item.storage ? item.storage + 'GB' : 'Model-' + item.id}</p>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="item-qty">
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" onchange="updateQuantity(this)">
            </div>
            <button class="btn-remove" data-index="${index}" onclick="removeItem(${index})">Remove</button>
        </div>
    `).join('');

    updateTotals();
}

function updateQuantity(input) {
    const index = parseInt(input.dataset.index);
    const newQty = parseInt(input.value);
    
    if (newQty < 1) {
        removeItem(index);
        return;
    }

    cart[index].quantity = newQty;
    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('total').textContent = '$' + subtotal.toFixed(2);
}

document.addEventListener('DOMContentLoaded', loadCart);