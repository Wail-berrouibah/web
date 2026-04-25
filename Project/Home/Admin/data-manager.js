const DATA_KEY = 'digitalStoreData';

const defaultData = {
    products: [
        {
            id: 1,
            name: "iPhone 15 Pro",
            brand: "Apple",
            price: 999.00,
            category: "phone",
            specs: "256GB, A17 Pro chip, 6.1-inch display",
            quantity: 50,
            image: "../img/logo.png",
            createdAt: "2026-01-15"
        },
        {
            id: 2,
            name: "MacBook Air M2",
            brand: "Apple",
            price: 1199.00,
            category: "laptop",
            specs: "8GB RAM, 256GB SSD, 13.6-inch display",
            quantity: 30,
            image: "../img/logo.png",
            createdAt: "2026-01-20"
        },
        {
            id: 3,
            name: "Samsung Galaxy S24",
            brand: "Samsung",
            price: 850.00,
            category: "phone",
            specs: "128GB, Snapdragon 8 Gen 3, 6.2-inch display",
            quantity: 45,
            image: "../img/logo.png",
            createdAt: "2026-02-01"
        },
        {
            id: 4,
            name: "Dell XPS 13",
            brand: "Dell",
            price: 1300.00,
            category: "laptop",
            specs: "16GB RAM, 512GB SSD, 13.4-inch display",
            quantity: 25,
            image: "../img/logo.png",
            createdAt: "2026-02-10"
        },
        {
            id: 5,
            name: "iPad Pro",
            brand: "Apple",
            price: 799.00,
            category: "tablet",
            specs: "256GB, M2 chip, 11-inch Liquid Retina",
            quantity: 35,
            image: "../img/logo.png",
            createdAt: "2026-02-15"
        },
        {
            id: 6,
            name: "AirPods Pro",
            brand: "Apple",
            price: 249.00,
            category: "accessories",
            specs: "Active Noise Cancellation, Spatial Audio",
            quantity: 100,
            image: "../img/logo.png",
            createdAt: "2026-03-01"
        },
        {
            id: 7,
            name: "Galaxy Tab S9",
            brand: "Samsung",
            price: 849.00,
            category: "tablet",
            specs: "256GB, Snapdragon 8 Gen 2, 11-inch AMOLED",
            quantity: 20,
            image: "../img/logo.png",
            createdAt: "2026-03-10"
        },
        {
            id: 8,
            name: "Sony WH-1000XM5",
            brand: "Sony",
            price: 349.00,
            category: "accessories",
            specs: "Industry-leading noise cancellation, 30hr battery",
            quantity: 40,
            image: "../img/logo.png",
            createdAt: "2026-03-15"
        },
        {
            id: 9,
            name: "MacBook Pro 14",
            brand: "Apple",
            price: 1999.00,
            category: "laptop",
            specs: "16GB RAM, 512GB SSD, M3 Pro chip, 14.2-inch",
            quantity: 15,
            image: "../img/logo.png",
            createdAt: "2026-03-20"
        },
        {
            id: 10,
            name: "Google Pixel 8",
            brand: "Google",
            price: 699.00,
            category: "phone",
            specs: "128GB, Tensor G3, 6.2-inch OLED display",
            quantity: 55,
            image: "../img/logo.png",
            createdAt: "2026-04-01"
        }
    ],
    orders: [],
    users: [],
    admins: [
        {
            username: "admin",
            password: "admin123"
        }
    ]
};

function initData() {
    const stored = localStorage.getItem(DATA_KEY);
    if (!stored) {
        localStorage.setItem(DATA_KEY, JSON.stringify(defaultData));
    }
}

function getData() {
    initData();
    return JSON.parse(localStorage.getItem(DATA_KEY));
}

function saveData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function getProducts() {
    return getData().products;
}

function setProducts(products) {
    const data = getData();
    data.products = products;
    saveData(data);
}

function getOrders() {
    return getData().orders;
}

function setOrders(orders) {
    const data = getData();
    data.orders = orders;
    saveData(data);
}

function getUsers() {
    return getData().users;
}

function setUsers(users) {
    const data = getData();
    data.users = users;
    saveData(data);
}

function getAdmins() {
    return getData().admins;
}

function getNextId(array) {
    if (array.length === 0) return 1;
    return Math.max(...array.map(item => item.id)) + 1;
}

function login(username, password) {
    const admins = getAdmins();
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', username);
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = 'admin-login.html';
}

function isLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'admin-login.html';
    }
}

initData();