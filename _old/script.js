// Scroll-aware navigation
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
}, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Staggered reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// 3D perspective tilt on book cards (Stripe Press style)
const cards = document.querySelectorAll('.book-card');

cards.forEach(card => {
    let rafId = null;

    card.addEventListener('mouseenter', () => {
        card.classList.add('tilt-active');
        card.classList.remove('tilt-reset');
    });

    card.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Normalize to -1 to 1
            const rotateY = ((x - centerX) / centerX) * 4;   // max 4deg
            const rotateX = ((centerY - y) / centerY) * 3;    // max 3deg
            const translateY = -2;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`;
            rafId = null;
        });
    });

    card.addEventListener('mouseleave', () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        card.classList.remove('tilt-active');
        card.classList.add('tilt-reset');
        card.style.transform = '';
    });
});
