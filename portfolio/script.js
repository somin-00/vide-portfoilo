// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect - Light mode
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(225, 232, 237, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(225, 232, 237, 0.6)';
    }
});

// Smooth scrolling for navigation links
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

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = [
        '.about-text',
        '.about-stats',
        '.skill-category',
        '.project-card',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
        });
    });
    
    // Initial reveal check
    reveal();
});

// Listen for scroll events
window.addEventListener('scroll', reveal);

// Typing Effect for Hero Title
function typeWriter() {
    const text = "안녕하세요, Your Name입니다";
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    let index = 0;
    heroTitle.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            heroTitle.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 500);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', typeWriter);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('모든 필드를 채워주세요.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('유효한 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#48bb78';
            break;
        case 'error':
            notification.style.background = '#f56565';
            break;
        default:
            notification.style.background = '#667eea';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Project Card Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill Item Animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in-up');
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const text = counter.innerText.trim();
        const numbers = text.match(/\d+/);
        
        // 숫자가 있는 경우에만 애니메이션 적용
        if (numbers && numbers.length > 0) {
            const target = parseInt(numbers[0]);
            const originalText = text;
            
            const animate = () => {
                const count = parseInt(counter.innerText.replace(/\D/g, '') || '0');
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        }
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Parallax Effect for Hero Section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Active Navigation Link
function updateActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // 섹션이 화면에 보이거나 스크롤이 섹션을 지나갔을 때
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // 최하단에 도달했을 때 마지막 섹션을 활성화
    const lastSection = sections[sections.length - 1];
    if (scrollPosition >= document.body.offsetHeight - 50) {
        current = lastSection.getAttribute('id');
    }
    
    // 스크롤이 최상단이거나 아무 섹션도 활성화되지 않았을 때 Home 활성화
    if (!current && pageYOffset < 100) {
        current = 'home';
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// 스크롤 이벤트 리스너
window.addEventListener('scroll', updateActiveNav);

// 페이지 로드 시 초기 활성화
document.addEventListener('DOMContentLoaded', updateActiveNav);

// Add active link style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
        background: var(--primary-color) !important;
        height: 3px !important;
    }
`;
document.head.appendChild(style);

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project Slider - New Implementation
class ProjectSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.project-item');
        this.totalSlides = this.slides.length;
        this.sliderWrapper = document.querySelector('.slider-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        
        // 화면 크기 감지 (세 단계로 구분)
        this.updateScreenSize();
        
        console.log('New slider initialized:', {
            slides: this.totalSlides,
            isMobile: this.isMobile,
            isSmallMobile: this.isSmallMobile
        });
        
        this.init();
    }
    
    updateScreenSize() {
        const width = window.innerWidth;
        this.isMobile = width <= 768;
        this.isSmallMobile = width <= 480;
    }
    
    init() {
        if (!this.sliderWrapper || this.totalSlides === 0) {
            console.log('Slider initialization failed');
            return;
        }
        
        this.updateSlider();
        this.bindEvents();
        this.autoPlay();
    }
    
    bindEvents() {
        // 버튼 이벤트
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        // 닷 이벤트
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });
    }
    
    updateSlider() {
        if (!this.sliderWrapper) return;
        
        // 활성 슬라이드 클래스 업데이트
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        if (this.isSmallMobile) {
            // 소형 화면 (≤480px): 고정 너비 280px 기반 중앙 정렬
            const slideWidth = 280; // CSS 고정 너비
            const gap = 12.8; // CSS gap: 0.8rem ≈ 12.8px
            const containerWidth = this.sliderWrapper.parentElement.offsetWidth;
            
            // 중앙 정렬 계산
            let offset = -(this.currentSlide * (slideWidth + gap)) + (containerWidth - slideWidth) / 2;
            
            // 왼쪽으로 더 이동시키기 위해 보정 값 조정
            offset -= 2; // 오른쪽 치우침 보정
            
            this.sliderWrapper.style.transform = `translateX(${offset}px)`;
            
        } else if (this.isMobile) {
            // 일반 모바일 (>480px & ≤768px): 고정 너비 320px 기반 중앙 정렬
            const slideWidth = 320; // CSS 고정 너비
            const containerWidth = this.sliderWrapper.parentElement.offsetWidth;
            
            // 중앙 정렬 계산
            let offset = -(this.currentSlide * slideWidth) + (containerWidth - slideWidth) / 2;
            
            // 왼쪽으로 더 이동시키기 위해 보정 값 조정
            offset -= 20; // 오른쪽 치우침 보정
            
            this.sliderWrapper.style.transform = `translateX(${offset}px)`;
            
        } else {
            // PC (>768px): 선택된 슬라이드 중앙 정렬
            const activeSlide = this.slides[this.currentSlide];
            const activeWidth = 400; // 활성 슬라이드 너비
            const inactiveWidth = 280; // 비활성 슬라이드 너비
            const gap = 24; // 1.5rem 간격
            
            // 선택된 슬라이드까지의 거리 계산
            let offset = 0;
            for (let i = 0; i < this.currentSlide; i++) {
                offset += inactiveWidth + gap;
            }
            
            // 중앙 정렬 보정
            const containerWidth = this.sliderWrapper.parentElement.offsetWidth;
            const centerOffset = (containerWidth - activeWidth) / 2 - 30;
            offset -= centerOffset;
            
            this.sliderWrapper.style.transform = `translateX(${-offset}px)`;
        }
        
        // 닷 업데이트 (모든 화면에서 1:1 매칭)
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // 버튼 상태 업데이트
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            this.prevBtn.style.cursor = this.currentSlide === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.5' : '1';
            this.nextBtn.style.cursor = this.currentSlide === this.totalSlides - 1 ? 'not-allowed' : 'pointer';
        }
        
        console.log('Slider updated:', {
            currentSlide: this.currentSlide,
            isMobile: this.isMobile,
            isSmallMobile: this.isSmallMobile
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateSlider();
            this.resetAutoPlay();
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
            this.resetAutoPlay();
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlider();
            this.resetAutoPlay();
        }
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.goToSlide(0);
            }
        }, 5000);
    }
    
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlay();
    }
}

// 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing new slider...');
    const slider = new ProjectSlider();
    
    // 창 크기 변경 감지
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            slider.updateScreenSize(); // 화면 크기 업데이트
            slider.updateSlider();
        }, 250);
    });
});

// Console Welcome Message
console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #718096;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #a0aec0;');
