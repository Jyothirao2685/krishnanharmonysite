// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

function closeMenu() {
    if(window.innerWidth <= 768) {
        document.getElementById('navLinks').classList.remove('active');
    }
}

// Tab Functionality for Unit Plans
function openTab(tabId) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Remove active class from all contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and target content
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Hero Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
    if(slides.length === 0) return;
    
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active-slide');
    });
    
    slides[slideIndex].style.display = 'block';
    setTimeout(() => {
        slides[slideIndex].classList.add('active-slide');
    }, 50);
}

function moveHero(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

// Auto slide every 5 seconds
setInterval(() => {
    moveHero(1);
}, 5000);

// Initialize slider on load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
});
