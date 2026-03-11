document.addEventListener("DOMContentLoaded", () => {
    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll(".reveal");

    const scrollReveal = () => {
        revealElements.forEach((el) => {
            const elTop = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.85;

            if (elTop < triggerPoint) {
                el.classList.add("visible");
            }
        });
    };

    // Scroll-to-Top Button Logic
    const scrollToTopBtn = document.getElementById("scrollToTop");

    const toggleScrollToTop = () => {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("show");
            } else {
                scrollToTopBtn.classList.remove("show");
            }
        }
    };

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Sticky Navbar Glass Effect Enhancement
    const navGlass = document.querySelector(".navbar.glass");
    
    const navScrollEffect = () => {
        if (navGlass) {
            if (window.scrollY > 50) {
                navGlass.style.marginTop = "0.5rem";
                navGlass.style.background = "rgba(255, 255, 255, 0.25)";
            } else {
                navGlass.style.marginTop = "0";
                navGlass.style.background = "rgba(255, 255, 255, 0.15)";
            }
        }
    };

    // Mobile Menu Logic
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
        });
    }

    // Slider Logic
    const slides = document.querySelectorAll(".slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    let slideIndex = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    if (next) {
        next.addEventListener("click", () => {
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        });
    }

    if (prev) {
        prev.addEventListener("click", () => {
            slideIndex--;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            showSlide(slideIndex);
        });
    }

    // Auto Slide
    if (slides.length > 0) {
        setInterval(() => {
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        }, 5000);
    }

    // Initial check on load
    scrollReveal();

    // Event Listeners
    window.addEventListener("scroll", () => {
        scrollReveal();
        toggleScrollToTop();
        navScrollEffect();
    });

    // Handle smooth scroll clicks for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If mobile menu is open, close it
                if (navLinks) {
                    navLinks.classList.remove("mobile-active");
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
