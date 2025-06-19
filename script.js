const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Toogle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// close menu when the nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 900) {
            menuOpenButton.click();
        }
    });
});

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        900: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});




// Privacy Policy modal Functionality with current time
const modal = document.getElementById("privacyModal");
const openBtn = document.getElementById("openPrivacy");
const closeBtn = document.querySelector(".close-button");

openBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevents page from jumping if it's a link
    modal.style.display = "block"; // Shows the modal
});

closeBtn.addEventListener("click", function () {
    modal.style.display = "none"; // Hides the modal
});

window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function openModal() {
    document.getElementById("privacyModal").style.display = "block";
    updateTime(); // Update the time immediately when opened
}

function closeModal() {
    document.getElementById("privacyModal").style.display = "none";
}

function updateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    let formattedDate = now.toLocaleString('en-US', options);
    document.getElementById("effectiveDate").textContent = formattedDate;
}

setInterval(updateTime, 1000); // 1000 ms = 1 second




// Toast notification functionality for contact form
document.querySelector(".contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        showToast();
        this.reset(); // optional: reset form after success
    } else {
        alert("Something went wrong!");
    }
});

function showToast() {
    const toast = document.getElementById("form-toast");
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 4000);
}


// Order model functionality
document.addEventListener("DOMContentLoaded", function () {
    const orderButton = document.getElementById("orderButton");
    const orderModal = document.getElementById("orderModal");
    const closeOrderBtn = document.getElementById("closeOrderModal");
    const orderForm = document.getElementById("orderForm");
    const toast = document.getElementById("form-toast");

    function showToast(message = "Order placed successfully!") {
        if (toast) {
            toast.textContent = message;
            toast.classList.remove("hidden");
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 4000);
        }
    }

    if (orderButton && orderModal && closeOrderBtn && orderForm) {
        orderButton.addEventListener("click", () => {
            orderModal.style.display = "flex";
        });

        closeOrderBtn.addEventListener("click", () => {
            orderModal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === orderModal) {
                orderModal.style.display = "none";
            }
        });

        orderForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // prevent default form submission

            const formData = new FormData(orderForm);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (result.success) {
                    showToast("✅ Order placed successfully!");
                    orderForm.reset();
                    orderModal.style.display = "none";
                } else {
                    showToast("❌ Something went wrong. Please try again.");
                }
            } catch (error) {
                showToast("❌ Network error! Please check your connection.");
            }
        });
    }
});


