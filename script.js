function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Tab Navigation Functions
function showTab(tabId, element) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update tab buttons
    const tabButtons = element.parentElement.querySelectorAll('.nav-tab');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked tab
    element.classList.add('active');
}

// Hero Slider Functions
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}
function previousSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Move to previous slide
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}
function currentSlideFunc(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new current slide
    currentSlide = slideIndex - 1;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}
function startSlider() {
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}
// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Banking Functions
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = `$${currentBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
}
function loadTransactions() {
    const transactionsList = document.getElementById('transactions-list');
    if (!transactionsList) return;
    
    transactionsList.innerHTML = '';
    
    transactions.slice(0, 5).forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        transactionsList.appendChild(transactionElement);
    });
}