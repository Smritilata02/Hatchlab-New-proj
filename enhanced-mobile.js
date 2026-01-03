/* ================= ENHANCED MOBILE & RESPONSIVE FUNCTIONALITY ================= */
/* JavaScript enhancements for mobile and MacBook Air optimization */

(function() {
    'use strict';

    // ================= DEVICE DETECTION ================= //
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\b(?:Tablet|Tab)\b)/i.test(navigator.userAgent);
    const isMacBookAir = window.screen.width >= 1366 && window.screen.width <= 1440 && window.screen.height >= 768 && window.screen.height <= 900;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ================= HEADER SCROLL BEHAVIOR ================= //
    let lastScrollTop = 0;
    let scrollTimeout;
    const header = document.querySelector('.main-header');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for enhanced styling
        if (scrollTop > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // Auto-hide header on mobile when scrolling down
        if (isMobile && window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header?.style.setProperty('transform', 'translateY(-100%)', 'important');
            } else {
                header?.style.setProperty('transform', 'translateY(0)', 'important');
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Clear timeout and set new one
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (isMobile && window.innerWidth <= 768) {
                header?.style.setProperty('transform', 'translateY(0)', 'important');
            }
        }, 1000);
    }

    // ================= VIEWPORT HEIGHT FIX FOR MOBILE ================= //
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // ================= TOUCH OPTIMIZATION ================= //
    function optimizeForTouch() {
        if (isTouch) {
            document.body.classList.add('touch-device');
            
            // Add touch-friendly classes
            const touchElements = document.querySelectorAll('.header-nav a, .get-in-touch-btn, .contact-btn, .initiative-btn, .arrow-btn');
            touchElements.forEach(el => {
                el.classList.add('touch-optimized');
            });
            
            // Prevent double-tap zoom on buttons
            const buttons = document.querySelectorAll('button, .btn, .contact-btn, .initiative-btn');
            buttons.forEach(button => {
                button.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    this.click();
                });
            });
        }
    }

    // ================= MACBOOK AIR OPTIMIZATIONS ================= //
    function optimizeForMacBookAir() {
        if (isMacBookAir) {
            document.body.classList.add('macbook-air');
            
            // Optimize animations for better performance
            const animatedElements = document.querySelectorAll('.word, .hero p, .about-word');
            animatedElements.forEach(el => {
                el.style.willChange = 'transform, opacity';
            });
        }
    }

    // ================= RESPONSIVE IMAGE LOADING ================= //
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Optimize image rendering
            img.style.imageRendering = 'auto';
            if (window.devicePixelRatio > 1) {
                img.style.imageRendering = '-webkit-optimize-contrast';
            }
        });
    }

    // ================= MODAL ENHANCEMENTS ================= //
    function enhanceModals() {
        const modal = document.getElementById('contactModal');
        const openBtn = document.getElementById('getInTouchBtn');
        const closeBtn = document.querySelector('.close-contact-modal');
        
        if (modal && openBtn && closeBtn) {
            // Enhanced modal opening
            openBtn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'flex';
                modal.classList.add('modal-opening');
                document.body.style.overflow = 'hidden';
                
                // Focus management for accessibility
                setTimeout(() => {
                    closeBtn.focus();
                }, 100);
            });
            
            // Enhanced modal closing
            function closeModal() {
                modal.classList.add('modal-closing');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('modal-opening', 'modal-closing');
                    openBtn.focus(); // Return focus to trigger
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeModal);
            
            // Close on backdrop click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    closeModal();
                }
            });
        }
    }

    // ================= PERFORMANCE OPTIMIZATIONS ================= //
    function optimizePerformance() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setViewportHeight();
                
                // Re-check device type on resize
                if (window.innerWidth <= 768) {
                    document.body.classList.add('mobile-view');
                } else {
                    document.body.classList.remove('mobile-view');
                }
            }, 250);
        });
        
        // Optimize scroll events
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ================= ACCESSIBILITY ENHANCEMENTS ================= //
    function enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #fcd703;
            color: #000;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if not exists
        const main = document.querySelector('.main, .content, .hero-sec');
        if (main && !main.id) {
            main.id = 'main-content';
        }
        
        // Enhance focus management
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            el.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });
    }

    // ================= LOADING OPTIMIZATION ================= //
    function optimizeLoading() {
        // Add loading class to header initially
        if (header) {
            header.classList.add('loading');
        }
        
        // Remove loading class when page is ready
        window.addEventListener('load', function() {
            if (header) {
                header.classList.remove('loading');
                header.classList.add('loaded');
            }
        });
        
        // Preload critical resources
        const criticalImages = document.querySelectorAll('.header-logo img, .footer-logo img');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }

    // ================= ORIENTATION CHANGE HANDLING ================= //
    function handleOrientationChange() {
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                setViewportHeight();
                
                // Force reflow to fix iOS Safari issues
                document.body.style.height = '100.1%';
                setTimeout(() => {
                    document.body.style.height = '';
                }, 100);
            }, 100);
        });
    }

    // ================= INITIALIZATION ================= //
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Initialize all optimizations
        setViewportHeight();
        optimizeForTouch();
        optimizeForMacBookAir();
        optimizeImages();
        enhanceModals();
        optimizePerformance();
        enhanceAccessibility();
        optimizeLoading();
        handleOrientationChange();
        
        // Add device classes to body
        if (isMobile) document.body.classList.add('mobile-device');
        if (isTablet) document.body.classList.add('tablet-device');
        if (isMacBookAir) document.body.classList.add('macbook-air-device');
        if (isTouch) document.body.classList.add('touch-device');
        
        // Add initial viewport class
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        }
        
        console.log('Enhanced mobile & responsive functionality initialized');
    }

    // Start initialization
    init();

})();

// ================= CSS ADDITIONS FOR ENHANCED FUNCTIONALITY ================= //
const enhancedStyles = `
    <style>
        /* Skip link styles */
        .skip-link:focus {
            top: 6px !important;
        }
        
        /* Touch device optimizations */
        .touch-device .header-nav a,
        .touch-device .get-in-touch-btn {
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Focus states */
        .focused {
            outline: 2px solid #fcd703 !important;
            outline-offset: 2px !important;
        }
        
        /* Modal animations */
        .contact-modal.modal-opening {
            animation: modalFadeIn 0.3s ease-out;
        }
        
        .contact-modal.modal-closing {
            animation: modalFadeOut 0.3s ease-out;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes modalFadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
        
        /* Viewport height fix */
        .mobile-view {
            min-height: calc(var(--vh, 1vh) * 100);
        }
        
        /* Performance optimizations */
        .macbook-air-device .word,
        .macbook-air-device .hero p,
        .macbook-air-device .about-word {
            will-change: transform, opacity;
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }
        }
    </style>
`;

// Inject enhanced styles
document.head.insertAdjacentHTML('beforeend', enhancedStyles);