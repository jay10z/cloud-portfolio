// =========================================
// 1. MOBILE MENU TOGGLE
// =========================================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav-links li a");

function toggleMenu() {
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll"); // Prevent background scrolling
}

if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
}

if (closeMenu) {
    closeMenu.addEventListener("click", toggleMenu);
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("active")) {
            toggleMenu();
        }
    });
});

// =========================================
// 2. DARK MODE TOGGLE
// =========================================
const modeToggleBtn = document.querySelector(".mode-toggle");
const modeIcon = modeToggleBtn.querySelector("i");
const body = document.body;

// Check local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
}

modeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    }
});

// =========================================
// 3. TYPEWRITER EFFECT
// =========================================
const textElement = document.querySelector(".typewriter-text");
const texts = ["Software Engineering Student", "Cybersecurity Enthusiast", "Web Developer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    if (textElement) {
        textElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait before typing next phrase
    } else {
        setTimeout(type, 100);
    }
})();

// =========================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// =========================================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(".section-title, .skill-card, .project-card, .hero-text, .hero-img-container");
elementsToAnimate.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
});

// Add CSS class for animation via JS to keep CSS clean(er) or just modify style directly above
// Let's add a global style for the animation trigger
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        body.no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
