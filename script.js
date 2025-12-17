document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const viewToggleBtn = document.querySelector('.view-toggle');
    let isGridView = false;

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });

    // Function to toggle between scroll and grid view
    window.togglePortfolioView = function() {
        isGridView = !isGridView;
        portfolioGrid.classList.toggle('grid-view');
        
        // Update button text and icon
        const icon = viewToggleBtn.querySelector('i');
        if (isGridView) {
            viewToggleBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Scroll View';
            scrollLeftBtn.style.display = 'none';
            scrollRightBtn.style.display = 'none';
        } else {
            viewToggleBtn.innerHTML = '<i class="fas fa-th-large"></i> View All Projects';
            scrollLeftBtn.style.display = 'flex';
            scrollRightBtn.style.display = 'flex';
        }
    };

    // Scroll buttons functionality
    // Improved scroll buttons: center the previous/next project card
    function getCards() {
        return Array.from(portfolioGrid.querySelectorAll('.project-card'));
    }

    function getCenteredCardIndex() {
        const cards = getCards();
        const gridCenter = portfolioGrid.scrollLeft + portfolioGrid.clientWidth / 2;
        let closestIndex = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(cardCenter - gridCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closestIndex = i;
            }
        });
        return closestIndex;
    }

    function centerCardAtIndex(index) {
        const cards = getCards();
        if (!cards.length) return;
        const card = cards[Math.max(0, Math.min(index, cards.length -1))];
        const target = card.offsetLeft - (portfolioGrid.clientWidth - card.offsetWidth) / 2;
        portfolioGrid.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }

    scrollLeftBtn.addEventListener('click', () => {
        const current = getCenteredCardIndex();
        centerCardAtIndex(current - 1);
    });

    scrollRightBtn.addEventListener('click', () => {
        const current = getCenteredCardIndex();
        centerCardAtIndex(current + 1);
    });

    // Show/hide scroll buttons based on scroll position
    const updateScrollButtons = () => {
        const isAtStart = portfolioGrid.scrollLeft === 0;
        const isAtEnd = portfolioGrid.scrollLeft + portfolioGrid.clientWidth >= portfolioGrid.scrollWidth;
        
        scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
        scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
    };

    portfolioGrid.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons(); // Initial check

    // Add smooth animations to project cards on load
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
    });

    // Add interactive effects for certifications
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                const btn = this.querySelector('.btn');
                if (btn) {
                    btn.click();
                }
            }
        });
    });

    // Add floating hearts effect when clicking on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createHearts(e);
        });
    });

    // Create floating hearts effect
    function createHearts(e) {
        const heartCount = 10;
        const hearts = [];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💜';
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.opacity = '1';
            heart.style.transition = 'all 0.5s ease';
            
            document.body.appendChild(heart);
            hearts.push(heart);
            
            // Animate heart
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const xOffset = Math.cos(angle) * distance;
                const yOffset = Math.sin(angle) * distance - 50;
                
                heart.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                heart.style.opacity = '0';
            }, 10);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 600);
        }
    }

    // Add sparkle effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function(e) {
            createHearts(e);
        });
    }

    // Add interactive effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('click', function() {
            // Find the associated section content
            const section = this.closest('.section');
            const content = section.querySelector('.certifications-grid') || 
                           section.querySelector('.skills-grid') || 
                           section.querySelector('.portfolio-grid') ||
                           section.querySelector('.about-content') ||
                           section.querySelector('.interests-list');
                           
            if (content) {
                if (content.style.display === 'none') {
                    content.style.display = 'grid';
                    this.textContent = this.textContent.replace(' ▶', ' ▼');
                } else {
                    content.style.display = 'none';
                    this.textContent = this.textContent.replace(' ▼', ' ▶');
                }
            }
        });
    });
});