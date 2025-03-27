// 3D Hero Effect
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.getElementById('heroContent');
    
    if (heroContent) {
        document.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) { // Only on desktop
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                const tiltAmount = 10; // Max tilt in degrees
                const moveAmount = 20; // Max movement in pixels
                
                // Calculate tilt and movement
                const tiltX = (y - 0.5) * tiltAmount;
                const tiltY = (0.5 - x) * tiltAmount;
                
                const moveX = (0.5 - x) * moveAmount;
                const moveY = (0.5 - y) * moveAmount;
                
                // Apply transform
                heroContent.style.transform = `
                    perspective(1000px) 
                    rotateX(${tiltX}deg) 
                    rotateY(${tiltY}deg)
                    translateX(${moveX}px)
                    translateY(${moveY}px)
                    translateZ(0)
                `;
            }
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', function() {
            heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Make sure menu is closed by default on mobile
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
    }
    
    // Simple toggle for menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    
    // If no carousel on page, exit
    if (!carousel || !slides.length) return;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Set up automatic rotation
    let interval = setInterval(nextSlide, 5000);
    
    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners for buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        nextButton.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }
    
    // Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            nextSlide();
            resetInterval();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            prevSlide();
            resetInterval();
        }
    }
});

// Set minimum date for check-in and check-out
const today = new Date().toISOString().split('T')[0];
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

if (checkInInput && checkOutInput) {
    checkInInput.min = today;
    checkOutInput.min = today;
    
    // Update check-out minimum date when check-in changes
    checkInInput.addEventListener('change', function() {
        checkOutInput.min = this.value;
        if (checkOutInput.value < this.value) {
            checkOutInput.value = this.value;
        }
    });
} 