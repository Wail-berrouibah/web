requireAuth();

function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    const users = getUsers();

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No users yet</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>${user.joined}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderUsers);