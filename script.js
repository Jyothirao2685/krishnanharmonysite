// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Offset for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations (fade in)
    const animateElements = document.querySelectorAll('.card, .feature-item, .zone-card, .fact-box');
    
    // Initial hidden state
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));

    // Image Modal Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const closeBtn = document.querySelector(".close-modal");
    
    if (modal && modalImg && closeBtn) {
        // Open modal when clicking zoomable images
        document.querySelectorAll('.zoomable').forEach(container => {
            container.addEventListener('click', function(e) {
                const img = this.tagName === 'IMG' ? this : this.querySelector('img');
                if(img) {
                    modal.style.display = "block";
                    modalImg.src = img.src;
                    document.body.style.overflow = "hidden"; // Prevent background scrolling
                }
            });
        });

        // Close modal logic
        const closeModal = () => {
            modal.style.display = "none";
            modalImg.classList.remove('zoomed');
            document.body.style.overflow = "auto";
        };

        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Toggle zoom inside modal
        modalImg.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.style.display === "block") {
                closeModal();
            }
        });
    }
});
