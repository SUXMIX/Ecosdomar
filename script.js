document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // CÓDIGO DO MENU MOBILE (NOVO E MELHORADO)
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // 1. Abrir e fechar o menu ao clicar no botão
    menuToggle.addEventListener('click', () => {
        const isVisible = navList.getAttribute('data-visible') === 'true';
        
        // Alterna o estado de visibilidade
        if (isVisible) {
            navList.setAttribute('data-visible', 'false');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open'); // Libera o scroll
        } else {
            navList.setAttribute('data-visible', 'true');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open'); // Trava o scroll
        }
    });

    // 2. Fechar o menu ao clicar em um dos links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fecha o menu apenas se ele estiver aberto
            if (navList.getAttribute('data-visible') === 'true') {
                navList.setAttribute('data-visible', 'false');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    });


    // ===================================
    // CÓDIGO ORIGINAL (ANIMAÇÕES, ETC.)
    // ===================================

    // Animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section, .test-card, .gallery-item, .video-card, .result-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Efeito da Navbar ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // ================================================================
    // AQUI VOCÊ PODE ADICIONAR SEU CÓDIGO ANTIGO DE LIGHTBOX E MODAIS
    // Por exemplo:
    // const galleryItems = document.querySelectorAll('.gallery-item');
    // galleryItems.forEach(item => { ... });
    // ================================================================
    
    console.log('🚀 Site do Projeto de Ciências carregado com a nova versão do menu!');
});
