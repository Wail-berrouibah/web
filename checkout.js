// Checkout Page JavaScript
// Features: Order summary, form validation

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const itemsContainer = document.getElementById('order-items');
    itemsContainer.innerHTML = cart.map(item => `
        <div class="mini-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('total').textContent = '$' + subtotal.toFixed(2);
}

function validateForm(e) {
    e.preventDefault();
    const errorMsg = document.getElementById('error-msg');
    
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!firstName || !lastName || !address || !city || !zip) {
        errorMsg.textContent = 'Please fill in all shipping fields.';
        return;
    }

    if (!cardNumber || cardNumber.length < 13) {
        errorMsg.textContent = 'Please enter a valid card number.';
        return;
    }

    if (!expiry || !cvv) {
        errorMsg.textContent = 'Please fill in all payment details.';
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        errorMsg.textContent = 'Your cart is empty.';
        return;
    }

    localStorage.removeItem('cart');
    alert('Order placed successfully!');
    window.location.href = 'index.html';
}

document.getElementById('checkout-form').addEventListener('submit', validateForm);
document.addEventListener('DOMContentLoaded', loadOrderSummary);