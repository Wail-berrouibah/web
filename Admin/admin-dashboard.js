requireAuth();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-products').textContent = getProducts().length;
    document.getElementById('total-orders').textContent = getOrders().length;
    document.getElementById('total-users').textContent = getUsers().length;
});

function filterDashboard() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const resultsContainer = document.getElementById('search-results');

    if (!searchInput && !categoryFilter) {
        resultsContainer.classList.remove('active');
        return;
    }

    let products = getProducts();

    if (categoryFilter) {
        products = products.filter(p => p.category === categoryFilter);
    }

    if (searchInput) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchInput) ||
            p.brand.toLowerCase().includes(searchInput) ||
            p.specs.toLowerCase().includes(searchInput)
        );
    }

    resultsContainer.classList.add('active');

    if (products.length === 0) {
        resultsContainer.innerHTML = `
            <h3>Search Results</h3>
            <p class="no-results">No devices found matching your criteria.</p>
        `;
        return;
    }

    resultsContainer.innerHTML = `
        <h3>Search Results (${products.length} found)</h3>
        <table class="results-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.brand}</td>
                        <td>${p.category}</td>
                        <td>$${p.price.toFixed(2)}</td>
                        <td>${p.quantity}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}