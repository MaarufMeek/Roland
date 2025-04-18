document.addEventListener('DOMContentLoaded', () => {
    // Cart Display
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');

    function updateCartTable() {
        if (cartItems) {
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<tr><td colspan="4">Your cart is empty</td></tr>';
            } else {
                let total = 0;
                cart.forEach(item => {
                    const row = document.createElement('tr');
                    const subtotal = item.quantity * item.price;
                    total += subtotal;
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>$${item.price.toLocaleString()}</td>
                        <td>${item.quantity}</td>
                        <td>$${subtotal.toLocaleString()}</td>
                    `;
                    cartItems.appendChild(row);
                });

                let rowTotals = document.createElement("tr");
                rowTotals.innerHTML = `
                    <td><strong>Total</strong></td>
                    <td></td>
                    <td></td>
                    <td><strong>$${total.toLocaleString()}</strong></td>
                `;
                cartItems.appendChild(rowTotals);
            }
        }
    }

    updateCartTable();

    // Form Submission
    const checkoutForm = document.getElementById('checkout-form');
    const overlay = document.querySelector('.overlay');
    const orderSuccess = document.querySelector('.order-success');
    const closeBtn = document.querySelector('.order-success .close-btn');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();

            if (name && phone && address) {
                // Calculate total amount
                const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

                // Create order object
                const order = {
                    id: Date.now(), // Unique ID based on timestamp
                    name: name,
                    phone: phone,
                    products: cart.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        subtotal: item.quantity * item.price
                    })),
                    amount: totalAmount,
                    date: formatDateTimeToDDMMYYYY(new Date().toISOString())
                };

                // Store order in localStorage
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));

                // Clear cart and show success
                localStorage.removeItem('cart');
                overlay.classList.add('active');
                orderSuccess.classList.add('active');
                checkoutForm.reset();
                updateCartTable(); // Update table to show empty cart
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            orderSuccess.classList.remove('active');
            window.location.href = 'index.html';
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && orderSuccess.classList.contains('active')) {
            overlay.classList.remove('active');
            orderSuccess.classList.remove('active');
            window.location.href = 'index.html';
        }
    });
});

function formatDateTimeToDDMMYYYY(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}



