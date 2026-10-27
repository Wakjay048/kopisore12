// Data Menu Produk (Dengan URL gambar yang presisi dan jelas)
const menuData = [
    {
        id: 1,
        name: 'Espresso',
        category: 'coffee',
        price: 18000,
        desc: 'Konsentrat kopi murni dengan aroma kuat dan krema tebal.',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=85',
        featured: true
    },
    {
        id: 2,
        name: 'Americano',
        category: 'coffee',
        price: 22000,
        desc: 'Espresso dipadukan dengan air panas, rasa yang clean dan menyegarkan.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=85',
        featured: false
    },
    {
        id: 3,
        name: 'Cafe Latte',
        category: 'coffee',
        price: 28000,
        desc: 'Espresso dipadukan dengan steamed milk lembut dan sentuhan latte art.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6mdtJYsxX3HujiSIBcfb6p4nJWXXht1-gAviLAbkNA&s=10',
        featured: true
    },
    {
        id: 4,
        name: 'Cappuccino',
        category: 'coffee',
        price: 27000,
        desc: 'Keseimbangan sempurna espresso, steamed milk, dan busa susu tebal.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=85',
        featured: false
    },
    {
        id: 5,
        name: 'Caramel Macchiato',
        category: 'coffee',
        price: 32000,
        desc: 'Espresso dengan sirup vanila, susu, dan topping saus karamel manis.',
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=85',
        featured: true
    },
    {
        id: 6,
        name: 'Matcha Latte',
        category: 'non-coffee',
        price: 28000,
        desc: 'Bubuk matcha Jepang murni yang diseduh dengan susu segar lembut.',
        image: 'https://www.romylondonuk.com/wp-content/uploads/2026/07/matcha-latte-thumbnail.jpg',
        featured: false
    },
    {
        id: 7,
        name: 'Classic Chocolate',
        category: 'non-coffee',
        price: 25000,
        desc: 'Cokelat premium kaya rasa yang disajikan hangat atau dingin.',
        image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=85',
        featured: false
    },
    {
        id: 8,
        name: 'Butter Croissant',
        category: 'pastry',
        price: 20000,
        desc: 'Pastry khas Prancis berlapis dengan rasa mentega yang gurih renyah.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=85',
        featured: true
    },
    {
        id: 9,
        name: 'Cinnamon Roll',
        category: 'pastry',
        price: 23000,
        desc: 'Roti gulung kayu manis lembut dilapisi cream cheese frosting manis.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=85',
        featured: false
    }
];

// Data Galeri Foto
const galleryData = [
    { url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80', title: 'Suasana Kedai Utama' },
    { url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', title: 'Proses Manual Brew' },
    { url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80', title: 'Latte Art Presisi' },
    { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', title: 'Area Tempat Duduk Mezzanine' },
    { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', title: 'Pastry Fresh Daily' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', title: 'Momen Bersantai Sore' }
];

// State Keranjang
let cart = [];

// Helper Format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Inisialisasi Event saat DOM Dimuat
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderMenu('all');
    renderGallery();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setupNavigation();
    setupMobileMenu();
    setupScrollAnimations();
    setupCartEvents();
    setupLightbox();
    setupReservationForm();
});

// Render Menu Function
function renderMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filtered = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card fade-in visible';
        card.innerHTML = `
            <div class="menu-card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
                ${item.featured ? '<span class="badge-featured">Unggulan</span>' : ''}
            </div>
            <div class="menu-card-content">
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-desc">${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">${formatRupiah(item.price)}</span>
                    <button class="btn btn-primary btn-sm" id="btn-cart-${item.id}" onclick="addAndNotify(${item.id})">
                        + Pesan
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderMenu(e.target.dataset.category);
        };
    });
}

// Render Gallery Function
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    galleryData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item fade-in visible';
        div.onclick = () => openLightbox(index);
        div.innerHTML = `
            <img src="${item.url}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <i data-lucide="zoom-in"></i>
            </div>
        `;
        galleryGrid.appendChild(div);
    });
    lucide.createIcons();
}

// Tambah ke Keranjang (Tanpa Membuka Popup Secara Otomatis)
function addToCart(id) {
    const product = menuData.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
}

// Fungsi Bantuan untuk Feedback Visual pada Tombol Pesan
function addAndNotify(id) {
    addToCart(id);
    const btn = document.getElementById(`btn-cart-${id}`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Berhasil';
        btn.style.backgroundColor = '#25D366';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 1000);
    }
}

function updateCartQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartBody = document.getElementById('cartBody');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartBadge.textContent = totalQty;
    cartSubtotal.textContent = formatRupiah(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); margin-top: 40px;">Belum ada produk yang dipilih.</p>';
        return;
    }

    cartBody.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatRupiah(item.price)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <strong>${formatRupiah(item.price * item.qty)}</strong>
        `;
        cartBody.appendChild(div);
    });
}

function openCartDrawer() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('mobileOverlay').classList.add('open');
}

function closeCartDrawer() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('open');
}

function setupCartEvents() {
    document.getElementById('openCartBtn').onclick = openCartDrawer;
    document.getElementById('closeCartBtn').onclick = closeCartDrawer;
    document.getElementById('mobileOverlay').onclick = () => {
        closeCartDrawer();
        closeMobileMenu();
    };

    document.getElementById('checkoutBtn').onclick = () => {
        if (cart.length === 0) return;

        const customerNameInput = document.getElementById('customerName');
        const nameError = document.getElementById('cartNameError');
        const customerName = customerNameInput.value.trim();

        // Validasi nama pemesan
        if (!customerName) {
            customerNameInput.classList.add('invalid');
            nameError.style.display = 'block';
            customerNameInput.focus();
            return;
        } else {
            customerNameInput.classList.remove('invalid');
            nameError.style.display = 'none';
        }

        // Format pesan sesuai permintaan
        let text = `*Nama Pemesan = ${customerName}*\n\n`;
        text += `Halo Kopi Senja, saya ingin memesan:\n`;

        cart.forEach((item, index) => {
            text += `${index + 1}. ${item.name} x${item.qty} (${formatRupiah(item.price * item.qty)})\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        text += `\nTotal Subtotal: ${formatRupiah(total)}`;

        const waUrl = `https://wa.me/6285269911214?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
    };

    // Hilangkan pesan error saat pengguna mulai mengetik nama
    document.getElementById('customerName').oninput = (e) => {
        if (e.target.value.trim()) {
            e.target.classList.remove('invalid');
            document.getElementById('cartNameError').style.display = 'none';
        }
    };
}

function setupNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.onscroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
}

function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileOverlay');

    hamburgerBtn.onclick = () => {
        navLinks.classList.toggle('open');
        overlay.classList.toggle('open');
    };

    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = () => closeMobileMenu();
    });

    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeCartDrawer();
            closeLightbox();
        }
    };
}

function closeMobileMenu() {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('open');
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

let currentImageIndex = 0;
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    img.src = galleryData[index].url;
    caption.textContent = galleryData[index].title;

    modal.classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightboxModal').classList.remove('open');
}

function setupLightbox() {
    document.getElementById('lightboxClose').onclick = closeLightbox;
}

function setupReservationForm() {
    const form = document.getElementById('reservationForm');
    const dateInput = document.getElementById('resDate');

    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    form.onsubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('resName');
        const phone = document.getElementById('resPhone');
        const date = document.getElementById('resDate');
        const time = document.getElementById('resTime');
        const guests = document.getElementById('resGuests');
        const notes = document.getElementById('resNotes').value;

        document.querySelectorAll('.form-control').forEach(el => el.classList.remove('invalid'));

        if (!name.value.trim()) {
            name.classList.add('invalid');
            isValid = false;
        }

        if (!phone.value.trim() || phone.value.length < 10) {
            phone.classList.add('invalid');
            isValid = false;
        }

        if (!date.value || date.value < today) {
            date.classList.add('invalid');
            isValid = false;
        }

        if (!time.value) {
            time.classList.add('invalid');
            isValid = false;
        }

        if (!guests.value) {
            guests.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            const text = `Halo Kopi Senja, saya ingin konfirmasi Reservasi Meja:\n\n` +
                         `- Nama: ${name.value.trim()}\n` +
                         `- WhatsApp: ${phone.value.trim()}\n` +
                         `- Tanggal: ${date.value}\n` +
                         `- Waktu: ${time.value} WIB\n` +
                         `- Jumlah Tamu: ${guests.value}\n` +
                         (notes ? `- Catatan: ${notes}\n` : '') +
                         `\nMohon konfirmasi ketersediaan meja. Terima kasih!`;

            const waUrl = `https://wa.me/6285269911214?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
            form.reset();
        }
    };
}
