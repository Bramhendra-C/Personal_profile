/* --- Scroll Animation (Intersection Observer) --- */
/* IMPORTANT: This makes your text fade in when scrolling */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* --- Mobile Navbar Toggle --- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/* --- Typing Text Effect --- */
const typingText = document.querySelector('.typing-text');
const words = [
    "Computer Science Student",   // Honest & Professional
    "Python Developer",           // Skill-based (Accurate)
    "AI Enthusiast",              // Shows passion
    "Full Stack Developer",       // Skill-based (Accurate)
    "Hackathon Winner"            // Highlights your achievement
];
let wordIndex = 0; // Changed from roleIndex to match logic
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex]; // FIXED: Changed 'roles' to 'words'
    
    if (isDeleting) {
        charIndex--;
        typingText.textContent = currentWord.substring(0, charIndex);
    } else {
        charIndex++;
        typingText.textContent = currentWord.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500); // Pause before typing next word
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200); // Typing speed
    }
}
typeEffect();

/* --- 3D Tilt Effect Initialization --- */
// Checks if library is loaded to prevent errors
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
    });
}

/* --- Scroll Active Link & Sticky Header --- */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Active Link Highlighting
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) activeLink.classList.add('active');
            });
        }
    });
}