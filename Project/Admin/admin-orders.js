requireAuth();

function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const orders = getOrders();

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No orders yet</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.status}</td>
            <td>${order.date}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderOrders);