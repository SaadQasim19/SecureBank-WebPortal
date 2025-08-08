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

function createTransactionElement(transaction) {
    const div = document.createElement('div');
    div.className = 'transaction-item';
    
    const isPositive = transaction.amount > 0;
    const amountClass = isPositive ? 'amount-positive' : 'amount-negative';
    const iconClass = isPositive ? 'income' : 'expense';
    
    div.innerHTML = `
        <div class="transaction-icon ${iconClass}">
            <i class="fas ${getTransactionIcon(transaction.type)}"></i>
        </div>
        <div class="transaction-info">
            <div class="transaction-description">${transaction.description}</div>
            <div class="transaction-date">${transaction.date}</div>
        </div>
        <div class="transaction-amount ${amountClass}">
            ${isPositive ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
        </div>
    `;
    
    return div;
}

function getTransactionIcon(type) {
    switch (type) {
        case 'deposit': return 'fa-plus-circle';
        case 'withdrawal': return 'fa-minus-circle';
        case 'transfer': return 'fa-exchange-alt';
        case 'bill': return 'fa-file-invoice-dollar';
        case 'purchase': return 'fa-shopping-cart';
        case 'refund': return 'fa-undo';
        default: return 'fa-circle';
    }
}
//! Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Form Handlers
function handleTransfer(event) {
    event.preventDefault();
    const form = event.target;
    const amount = parseFloat(form.amount.value);
    const recipient = form.recipient.value;
    
    if (amount > 0 && amount <= currentBalance) {
        currentBalance -= amount;
        updateBalance();
        
        // Add transaction
        const newTransaction = {
            id: transactions.length + 1,
            description: `Transfer to ${recipient}`,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            amount: -amount,
            category: 'expense',
            type: 'transfer'
        };
        
        transactions.unshift(newTransaction);
        loadTransactions();
        
        showNotification(`Successfully transferred $${amount.toFixed(2)} to ${recipient}`);
        closeModal('transfer-modal');
        form.reset();
    } else {
        showNotification('Invalid transfer amount', 'error');
    }
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Add form submission handlers
    const transferForm = document.getElementById('transfer-form');
    if (transferForm) {
        transferForm.addEventListener('submit', handleTransfer);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// Spending Analysis Functions
function updateSpendingPeriod(period) {
    const buttons = document.querySelectorAll('.period-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[onclick="updateSpendingPeriod('${period}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update spending data based on period
    updateSpendingData(period);
    showNotification(`Updated spending analysis for ${period}`);
}
function updateSpendingData(period) {
    // Calculate spending based on period
    let totalSpent = 0;
    let transactionCount = 0;
    
    transactions.forEach(transaction => {
        if (transaction.amount < 0) {
            totalSpent += Math.abs(transaction.amount);
            transactionCount++;
        }
    });
    
    const avgDaily = totalSpent / 30; // Assuming monthly data
    
    // Update display elements
    const totalSpentElement = document.getElementById('total-spent');
    const avgDailyElement = document.getElementById('avg-daily');
    
    if (totalSpentElement) {
        totalSpentElement.textContent = `$${totalSpent.toFixed(2)}`;
    }
    
    if (avgDailyElement) {
        avgDailyElement.textContent = `$${avgDaily.toFixed(2)}`;
    }
}

//! Card Management Variables
let cardFrozen = false;
let cardSettings = {
    dailyLimit: 1000,
    atmLimit: 500,
    contactless: true,
    international: true,
    notifications: true
};
//! Card Management Functions

function toggleCardFreeze() {
    cardFrozen = !cardFrozen;
    const status = cardFrozen ? 'frozen' : 'active';
    const message = cardFrozen ? 'Card has been frozen' : 'Card has been activated';
    
    showNotification(message);
    updateCardDisplay();
}

function updateCardDisplay() {
    const statusElement = document.querySelector('.card-status');
    if (statusElement) {
        statusElement.textContent = cardFrozen ? 'Frozen' : 'Active';
        statusElement.className = `status-badge ${cardFrozen ? 'frozen' : 'active'}`;
    }
}

// Investment Functions
function updatePortfolio() {
    showNotification('Portfolio data updated successfully');
}


// Loan Calculator
function calculateLoan() {
    const principal = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const months = parseInt(document.getElementById('loan-term').value) * 12;
    
    if (principal && rate && months) {
        const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;
        
        document.getElementById('monthly-payment').textContent = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById('total-payment').textContent = `$${totalPayment.toFixed(2)}`;
        document.getElementById('total-interest').textContent = `$${totalInterest.toFixed(2)}`;
        
        showNotification('Loan calculation completed');
    } else {
        showNotification('Please fill in all loan details', 'error');
    }
}
