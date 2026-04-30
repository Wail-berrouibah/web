// Product Details Page JavaScript
// Features: Product display, color/storage options, add to cart

let currentProduct = null;
let selectedColor = 'black';
let selectedStorage = '128';
let quantity = 1;

function init() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    currentProduct = getProducts().find(p => p.id === parseInt(productId));

    if (!currentProduct) {
        showError();
        return;
    }

    displayProduct();
    setupEventListeners();
}

function displayProduct() {
    document.title = 'DigitalStore - ' + currentProduct.name;
    
    document.getElementById('category').textContent = currentProduct.category;
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-model').textContent = 'Model-' + currentProduct.id;
    document.getElementById('product-price').textContent = '$' + currentProduct.price.toFixed(2);
    document.getElementById('product-desc').textContent = currentProduct.specs;
    document.getElementById('main-img').src = currentProduct.image || './img/logo.png';
    
    const stock = document.getElementById('stock-status');
    stock.textContent = currentProduct.quantity > 0 ? 'In Stock' : 'Out of Stock';
    stock.className = 'stock-status ' + (currentProduct.quantity > 0 ? 'in-stock' : 'out-stock');

    document.getElementById('spec-brand').textContent = currentProduct.brand;
    document.getElementById('spec-category').textContent = currentProduct.category;
    document.getElementById('spec-specs').textContent = currentProduct.specs;
    document.getElementById('spec-quantity').textContent = currentProduct.quantity;
    document.getElementById('spec-date').textContent = currentProduct.createdAt;

    showOptions();
}

function showOptions() {
    const category = currentProduct.category;
    
    if (category === 'phone') {
        document.getElementById('color-option').style.display = 'block';
        document.getElementById('storage-option').style.display = 'block';
    } else if (category === 'laptop') {
        document.getElementById('storage-option').style.display = 'block';
    }
}

function setupEventListeners() {
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedColor = this.dataset.color;
        });
    });

    document.querySelectorAll('.storage-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.storage-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedStorage = this.dataset.storage;
        });
    });

    document.getElementById('qty-input').addEventListener('change', function() {
        quantity = parseInt(this.value) || 1;
    });

    document.getElementById('add-to-cart').addEventListener('click', addToCart);
}

function addToCart() {
    if (!currentProduct) return;

    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity: quantity,
        color: selectedColor,
        storage: selectedStorage
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(currentProduct.name + ' added to cart!\nQuantity: ' + quantity);
    window.location.href = 'cart.html';
}

function showError() {
    document.getElementById('product-name').textContent = 'Product Not Found';
    document.getElementById('product-desc').textContent = 'This product does not exist.';
}

document.addEventListener('DOMContentLoaded', init);