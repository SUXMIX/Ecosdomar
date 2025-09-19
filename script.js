// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
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

    // Observe all sections and cards for scroll animations
    const elementsToAnimate = document.querySelectorAll('.section, .test-card, .gallery-item, .video-card, .result-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Navbar background change on scroll
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

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            const overlay = this.querySelector('.gallery-overlay p');
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <p>${overlay.textContent}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            `;
            
            const lightboxText = lightbox.querySelector('p');
            lightboxText.style.cssText = `
                color: white;
                margin-top: 1rem;
                font-size: 1.2rem;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -50px;
                right: -15px;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transition: background 0.3s ease;
                text-align: center;
                line-height: 40px;
                padding: 0;
                font-family: Arial, sans-serif;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
            `;
            
            // Show lightbox
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });

    // Video placeholder interactions
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const card = this.closest('.video-card');
            const title = card.querySelector('h3').textContent;
            
            // Create modal for video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <span class="video-modal-close">&times;</span>
                    <h3>${title}</h3>
                    <div class="video-container">
                        <p>Aqui você pode adicionar o embed do seu vídeo do YouTube, Vimeo ou outro player de vídeo.</p>
                        <div class="video-placeholder-large">
                            <div class="play-button-large">▶</div>
                            <p>Clique para reproduzir o vídeo</p>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Style the modal
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.video-modal-content');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                position: relative;
                text-align: center;
            `;
            
            const videoContainer = modal.querySelector('.video-container');
            videoContainer.style.cssText = `
                margin-top: 1rem;
            `;
            
            const videoPlaceholderLarge = modal.querySelector('.video-placeholder-large');
            videoPlaceholderLarge.style.cssText = `
                height: 300px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                margin-top: 1rem;
            `;
            
            const playButtonLarge = modal.querySelector('.play-button-large');
            playButtonLarge.style.cssText = `
                width: 80px;
                height: 80px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
            `;
            
            const closeBtn = modal.querySelector('.video-modal-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 1.5rem;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: #f0f0f0;
                transition: background 0.3s ease;
            `;
            
            // Show modal
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1.2)';
            marker.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1)';
            marker.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });
    });

    // Add stagger animation to gallery items
    const galleryItemsAnim = document.querySelectorAll('.gallery-item');
    galleryItemsAnim.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add floating animation to cards
    const cards = document.querySelectorAll('.test-card, .result-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        // Add subtle floating animation
        setInterval(() => {
            if (card.matches(':hover')) return;
            
            card.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 2}px)`;
        }, 50);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // ======== MENU HAMBÚRGUER RESPONSIVO ========

    const navList = document.querySelector('.nav-list');

    // Criar botão menu-toggle (hambúrguer)
    const menuToggle = document.createElement('button');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span class="hamburger"></span>';

    // Inserir botão antes da nav-list
    navList.parentNode.insertBefore(menuToggle, navList);

    let menuOpen = false;

    // Função para abrir menu
    function openMobileMenu() {
        navList.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        menuOpen = true;
    }

    // Função para fechar menu
    function closeMobileMenu() {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuOpen = false;
    }

    // Alternar menu ao clicar no botão
    menuToggle.addEventListener('click', () => {
        if (menuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Fechar menu ao clicar em um link (em mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen && window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Fechar menu ao clicar fora (em mobile)
    document.addEventListener('click', (e) => {
        if (menuOpen && !navList.contains(e.target) && e.target !== menuToggle) {
            closeMobileMenu();
        }
    });

    // Ajustar visibilidade do menu e botão ao redimensionar
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            if (!menuOpen) {
                navList.classList.remove('active');
            } else {
                navList.classList.add('active');
            }
        } else {
            menuToggle.style.display = 'none';
            navList.classList.remove('active');
            menuOpen = false;
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    console.log('🚀 Site do Projeto de Ciências carregado com sucesso!');
});
