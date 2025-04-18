document.addEventListener('DOMContentLoaded', () => {
    // Product Data
    const phones = [
        {
            id: 1,
            name: "iPhone 14 Pro Max",
            price: 16230,
            brand: "apple",
            image: "images/14pro.jpg",
            link: "details.html?id=1"
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            price: 11120,
            brand: "samsung",
            image: "images/s24.jpeg",
            link: "details.html?id=2"
        },
        {
            id: 3,
            name: "Tecno Spark 30 Pro",
            price: 4000,
            brand: "tecno",
            image: "images/Spark-30C.jpg",
            link: "details.html?id=3"
        },
        {
            id: 4,
            name: "Google Pixel 9 Pro",
            price: 13000,
            brand: "google",
            image: "images/p9pro.png",
            link: "details.html?id=4"
        },
        {
            id: 5,
            name: "Samsung Galaxy S25 Ultra",
            price: 20300,
            brand: "samsung",
            image: "images/s25.jpg",
            link: "details.html?id=5"
        },
        {
            id: 6,
            name: "Tecno Camon 30",
            price: 4500,
            brand: "tecno",
            image: "images/camon30.jpg",
            link: "details.html?id=6"
        },
        {
            id: 7,
            name: "Samsung Galaxy A55",
            price: 6800,
            brand: "samsung",
            image: "images/a55.jpg",
            link: "details.html?id=7"
        },
        {
            id: 8,
            name: "Infinix Hot 50",
            price: 4700,
            brand: "infinix",
            image: "images/hot50.png",
            link: "details.html?id=8"
        },
        {
            id: 9,
            name: "Infinix Note 40",
            price: 3800,
            brand: "infinix",
            image: "images/inote40.jpg",
            link: "details.html?id=9"
        },
        {
            id: 10,
            name: "iPhone 13 mini",
            price: 9000,
            brand: "apple",
            image: "images/13mini.jpg",
            link: "details.html?id=10"
        },
        {
            id: 11,
            name: "iPhone 16 mini",
            price: 17200,
            brand: "apple",
            image: "images/16mini.jpg",
            link: "details.html?id=11"
        }
    ];

    // Cart Management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartTable() {
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<tr><td colspan="4">Your cart is empty</td></tr>';
            } else {
                cart.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>GHS ${item.price.toLocaleString()}</td>
                        <td>${item.quantity}</td>
                        <td>GHS ${(item.price * item.quantity).toLocaleString()}</td>
                    `;
                    cartItems.appendChild(row);
                });
            }
        }
    }

    function updateCartBadge() {
        const badge = document.getElementById('cart-count');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Sum quantities
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'flex' : 'none';

    }

    // Product Grid
    const productGrid = document.getElementById('product-grid');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');

    function displayProducts(filteredPhones) {
        if (productGrid) {
            productGrid.innerHTML = '';
            filteredPhones.forEach(phone => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-duration', '800');
                card.innerHTML = `
                    <img src="${phone.image}" alt="${phone.name}">
                    <div class="details">
                        <h3>${phone.name}</h3>
                        <p>GHS ${phone.price.toLocaleString()}</p>
                        <button class="order-btn" data-id="${phone.id}">Add to Cart</button>
                `;
                productGrid.appendChild(card);
            });

            // Add event listeners for order buttons
            document.querySelectorAll('.order-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const phoneId = parseInt(button.getAttribute('data-id'));
                    const phone = phones.find(p => p.id === phoneId);
                    if (phone) {
                        const existingItem = cart.find(item => item.id === phoneId);
                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            cart.push({
                                id: phone.id,
                                name: phone.name,
                                price: phone.price,
                                quantity: 1
                            });
                        }
                        saveCart();
                        updateCartTable();
                        updateCartBadge();
                    }
                });
            });
        }
    }

    function filterProducts() {
        const selectedBrand = brandFilter ? brandFilter.value : '';
        const selectedPrice = priceFilter ? priceFilter.value : '';

        let filteredPhones = phones;

        if (selectedBrand) {
            filteredPhones = filteredPhones.filter(phone => phone.brand === selectedBrand);
        }

        if (selectedPrice) {
            filteredPhones = filteredPhones.filter(phone => {
                if (selectedPrice === '0-5000') return phone.price < 5000;
                if (selectedPrice === '5000-10000') return phone.price >= 5000 && phone.price <= 10000;
                if (selectedPrice === '10000+') return phone.price > 10000;
                return true;
            });
        }

        displayProducts(filteredPhones);
    }

    // Initial display
    if (productGrid) {
        displayProducts(phones);
    }

    // Filter event listeners
    if (brandFilter) {
        brandFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // Initial cart and badge display
    updateCartTable();
    updateCartBadge();

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Smooth scroll to cart section when clicking the cart icon
    document.querySelector('.cart-icon a').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#cart').scrollIntoView({ behavior: 'smooth' });
    });
});