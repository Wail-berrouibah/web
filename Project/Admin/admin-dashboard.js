requireAuth();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-products').textContent = getProducts().length;
    document.getElementById('total-orders').textContent = getOrders().length;
    document.getElementById('total-users').textContent = getUsers().length;
});