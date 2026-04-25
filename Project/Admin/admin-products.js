requireAuth();

let editingProductId = null;

document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveProduct();
});

function renderProducts() {
    const tbody = document.getElementById('products-tbody');
    const search = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    let products = getProducts();

    if (category) {
        products = products.filter(p => p.category === category);
    }
    if (search) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(search) ||
            p.brand.toLowerCase().includes(search) ||
            p.specs.toLowerCase().includes(search)
        );
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddProductModal() {
    editingProductId = null;
    document.getElementById('modal-title').textContent = 'Add Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').style.display = 'block';
}

function editProduct(id) {
    editingProductId = id;
    const product = getProducts().find(p => p.id === id);
    if (product) {
        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-brand').value = product.brand;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-specs').value = product.specs;
        document.getElementById('product-quantity').value = product.quantity;
        document.getElementById('product-modal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function saveProduct() {
    const products = getProducts();
    const productData = {
        name: document.getElementById('product-name').value,
        brand: document.getElementById('product-brand').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        specs: document.getElementById('product-specs').value,
        quantity: parseInt(document.getElementById('product-quantity').value),
        image: '../img/logo.png',
        createdAt: new Date().toISOString().split('T')[0]
    };

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        productData.id = getNextId(products);
        products.push(productData);
    }

    setProducts(products);
    closeModal();
    renderProducts();
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        setProducts(products);
        renderProducts();
    }
}

document.addEventListener('DOMContentLoaded', renderProducts);