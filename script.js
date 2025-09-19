document.addEventListener('DOMContentLoaded', function() {
    
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

    // ===================================
    // NOVO CÓDIGO DO MENU MOBILE
    // ===================================
    
    // Inserir o botão do menu no HTML via JS
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    const navbarContainer = document.querySelector('.navbar .container');
    navbarContainer.appendChild(menuToggle);

    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Função para abrir/fechar menu
    const toggleMenu = () => {
        document.body.classList.toggle('menu-open');
    };

    // Evento de clique no botão
    menuToggle.addEventListener('click', toggleMenu);

    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });

    // ===================================
    // INTERAÇÕES DA PÁGINA (Lightbox, Vídeos, etc.)
    // Seu código original para estas funcionalidades pode ser mantido aqui
    // ...
    // ===================================

    console.log('🚀 Site do Projeto de Ciências carregado com sucesso!');
});
