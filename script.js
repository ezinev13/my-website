document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const viewToggleBtn = document.querySelector('.view-toggle');
    let isGridView = false;

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
    scrollLeftBtn.addEventListener('click', () => {
        portfolioGrid.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        portfolioGrid.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
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
});