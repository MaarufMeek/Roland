// document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('toggle-Btn');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
        menuToggle.innerHTML = sidebar.classList.contains('expanded') ?
            '&times;' : '☰';
    });
    
    function showDetails(phoneId) {
        // Find the phone by ID
        const phone = phones.find(p => p.id === phoneId);
        if (!phone) return;

        // Get the clicked card
        const card = event.currentTarget.closest('.product-card');
        const cardRect = card.getBoundingClientRect();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'product-overlay';
        overlay.innerHTML = `
        <div class="overlay-content">
            <button class="close-btn">×</button>
            <p>${phone.name}</p>
            <ul>
                <li><strong>Display:</strong> ${phone.specs.display}</li>
                <li><strong>Processor:</strong> ${phone.specs.processor}</li>
                <li><strong>Camera:</strong> ${phone.specs.camera}</li>
                <li><strong>Battery:</strong> ${phone.specs.battery}</li>
            </ul>
        </div>
    `;

        // Set overlay size and position to match the card
        overlay.style.width = `${cardRect.width}px`;
        overlay.style.height = `${cardRect.height}px`;
        overlay.style.top = `${cardRect.top + window.scrollY}px`;
        overlay.style.left = `${cardRect.left + window.scrollX}px`;


        // Append overlay to body
        document.body.appendChild(overlay);

        // Close overlay when clicking the close button
        overlay.querySelector('.close-btn').addEventListener('click', () => {
            overlay.remove();
        });

        // Close overlay when clicking outside the content
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    // Shop Grid Population
    const phones = [
        {
            id: 1,
            name: "iPhone 14 Pro Max",
            price: 999,
            image: "images/14pro.jpg",
            specs: {
                display: "6.7-inch Super Retina XDR",
                processor: "A16 Bionic",
                camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
                battery: "Up to 29 hours video playback"
            }
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            price: 699,
            image: "images/s24.jpeg",
            specs: {
                display: "6.8-inch Dynamic AMOLED 2X",
                processor: "Snapdragon 8 Gen 2",
                camera: "200MP Main, 12MP Ultra Wide, 10MP Telephoto",
                battery: "Up to 26 hours video playback"
            }
        },
        {
            id: 3,
            name: "Tecno Spark 30 Pro",
            price: 899,
            image: "images/Spark-30C.jpg",
            specs: {
                display: "6.78-inch AMOLED",
                processor: "MediaTek Helio G99",
                camera: "108MP Main, 8MP Ultra Wide",
                battery: "Up to 24 hours video playback"
            }
        },
        {
            id: 4,
            name: "Google Pixel 9 Pro",
            price: 899,
            image: "images/p9pro.png",
            specs: {
                display: "6.3-inch OLED",
                processor: "Google Tensor G3",
                camera: "50MP Main, 48MP Ultra Wide, 48MP Telephoto",
                battery: "Up to 27 hours video playback"
            }
        }
    ];

    const container = document.getElementById("shop-container");

    if (container) {
        phones.forEach(phone => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${phone.image}" alt="${phone.name}">
                <div class="details">
                    <h3>${phone.name}</h3>
                    <p>$${phone.price}</p>
                    <button onclick="showDetails(${phone.id})">View Details</button>
                </div>
    `;
            container.appendChild(card);
        });
    }


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const overlay = document.querySelector('.overlay');
    const msgSent = document.querySelector('.msg-sent');
    const closeBtn = document.querySelector('.close-btn');

    // Handle form submission
    if(form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        overlay.classList.add('active'); // Show overlay
        msgSent.classList.add('active'); // Show popup
        form.reset(); // Reset form fields
    });

    // Handle close button click
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active'); // Hide overlay
        msgSent.classList.remove('active'); // Hide popup
    });
    }

});