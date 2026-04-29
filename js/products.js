// Products Page JavaScript
// Features: Product listing, filtering, and sorting

let allProducts = [];

function loadProducts() {
    allProducts = getProducts();
    renderProductGrid(allProducts);
}

function renderProductGrid(products) {
    const container = document.getElementById('product-list');
    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    container.innerHTML = products.map(product => `
        <div class="shop-item">
            <img src="${product.image || './img/logo.png'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <a href="details.html?id=${product.id}" class="btn-view">View Details</a>
        </div>`).join('');
}

function sortProducts() {
    const sortBy = document.getElementById('sort-logic').value;
    let sorted = [...allProducts];
    switch(sortBy) {
        case 'low': sorted.sort((a,b) => a.price - b.price); break;
        case 'high': sorted.sort((a,b) => b.price - a.price); break;
        case 'name': sorted.sort((a,b) => a.name.localeCompare(b.name)); break;
        case 'newest': sorted.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    }
    renderProductGrid(sorted);
}

function filterProducts() {
    const categoryCheckboxes = document.querySelectorAll('.filter-group:first-of-type input[type="checkbox"]:checked');
    const categories = [...categoryCheckboxes].map(c => c.value);
    const brandCheckboxes = document.querySelectorAll('.filter-group:nth-of-type(2) input[type="checkbox"]:checked');
    const brands = [...brandCheckboxes].map(c => c.value);
    const priceRange = document.getElementById('price-filter').value;

    let filtered = allProducts.filter(p => {
        const catMatch = categories.length === 0 || categories.includes(p.category);
        const brandMatch = brands.length === 0 || brands.some(b => p.brand.toLowerCase().includes(b.toLowerCase()));

        let priceMatch = true;
        if (priceRange !== 'all') {
            if (priceRange === '0-500') priceMatch = p.price <= 500;
            else if (priceRange === '501-1000')
                priceMatch = p.price > 500 && p.price <= 1000;
            else if (priceRange === '1000+')
                priceMatch = p.price > 1000;
        }

        return catMatch && brandMatch && priceMatch;
    });

    renderProductGrid(filtered);
}

document.addEventListener('DOMContentLoaded', loadProducts);