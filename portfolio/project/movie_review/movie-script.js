// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// Initialize mobile menu state on page load
document.addEventListener('DOMContentLoaded', () => {
    if (mobileMenu && navMenu) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(20, 20, 20, 0.98)';
        navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(20, 20, 20, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
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

// Rating display
const ratingInput = document.getElementById('movie-rating');
const ratingValue = document.getElementById('rating-value');

if (ratingInput && ratingValue) {
    ratingInput.addEventListener('input', () => {
        ratingValue.textContent = ratingInput.value;
    });
}

// Sample movie data
const sampleMovies = [
    { id: 1, title: '인터스텔라', year: 2014, genre: 'sf', rating: 4.8, poster: '🚀' },
    { id: 2, title: '다크 나이트', year: 2008, genre: 'action', rating: 4.7, poster: '🦇' },
    { id: 3, title: '타이타닉', year: 1997, genre: 'romance', rating: 4.5, poster: '🚢' },
    { id: 4, title: '아바타', year: 2009, genre: 'sf', rating: 4.3, poster: '🌍' },
    { id: 5, title: '쇼생크 탈출', year: 1994, genre: 'drama', rating: 4.9, poster: '⛓️' },
    { id: 6, title: '기생충', year: 2019, genre: 'drama', rating: 4.6, poster: '🏠' },
    { id: 7, title: '미션 임파서블', year: 2018, genre: 'action', rating: 4.2, poster: '💥' },
    { id: 8, title: '인사이드 아웃', year: 2015, genre: 'animation', rating: 4.4, poster: '🧠' }
];

// Sample reviews data
const sampleReviews = [
    {
        id: 1,
        movieTitle: '인터스텔라',
        movieYear: 2014,
        movieGenre: 'sf',
        rating: 5,
        reviewTitle: '우주의 경이로움을 담은 걸작',
        content: '크리스토퍼 놀란 감독의 역작이자 SF 영화의 새로운 지평을 연 작품입니다. 시간과 공간, 사랑과 인간성에 대한 깊은 철학적 고찰이 담겨있어요.',
        reviewerName: '김영화',
        date: '2024-01-15'
    },
    {
        id: 2,
        movieTitle: '다크 나이트',
        movieYear: 2008,
        movieGenre: 'action',
        rating: 5,
        reviewTitle: '히어로 영화의 완벽한 형태',
        content: '히스 레저의 조커 연기는 역사에 남을 명연기입니다. 다크한 분위기 속에서 정의와 악의 경계에 대한 깊은 질문을 던지는 영화.',
        reviewerName: '이액션',
        date: '2024-01-14'
    },
    {
        id: 3,
        movieTitle: '기생충',
        movieYear: 2019,
        movieGenre: 'drama',
        rating: 4,
        reviewTitle: '계급 사회를 날카롭게 파고드는 봉준호 감독의 역작',
        content: '한국 영화 최초로 칸 영화제 황금종려상을 수상한 작품답게, 사회적 메시지와 엔터테인먼트를 완벽하게 조화시켰습니다.',
        reviewerName: '박드라마',
        date: '2024-01-13'
    }
];

// Initialize local storage
function initializeStorage() {
    if (!localStorage.getItem('movies')) {
        localStorage.setItem('movies', JSON.stringify(sampleMovies));
    }
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify(sampleReviews));
    }
}

// Load movies from storage
function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    return movies;
}

// Load reviews from storage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews;
}

// Save to local storage
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Display movies
function displayMovies(movies = loadMovies()) {
    const moviesGrid = document.getElementById('movies-grid');
    if (!moviesGrid) return;

    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <i class="fas fa-film"></i>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-genre">${getGenreLabel(movie.genre)}</span>
                </div>
                <div class="movie-rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.rating}</span>
                </div>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}

// Display reviews
function displayReviews(reviews = loadReviews()) {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="review-movie-info">
                    <h3>${review.movieTitle} (${review.movieYear})</h3>
                    <div class="review-meta">
                        <span class="movie-genre">${getGenreLabel(review.movieGenre)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                    <span>${review.rating}/5</span>
                </div>
            </div>
            <h4 class="review-title">${review.reviewTitle}</h4>
            <p class="review-content">${review.content}</p>
            <div class="review-footer">
                <span class="reviewer-name">작성자: ${review.reviewerName}</span>
                <span class="review-date">${formatDate(review.date)}</span>
            </div>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Get genre label in Korean
function getGenreLabel(genre) {
    const genreLabels = {
        'action': '액션',
        'drama': '드라마',
        'comedy': '코미디',
        'thriller': '스릴러',
        'romance': '로맨스',
        'sf': 'SF',
        'horror': '공포',
        'animation': '애니메이션'
    };
    return genreLabels[genre] || genre;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
}

// Search movies
function searchMovies() {
    const searchInput = document.getElementById('movie-search');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const movies = loadMovies();
    
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    
    displayMovies(filteredMovies);
}

// Filter reviews
function filterReviews() {
    const genreFilter = document.getElementById('genre-filter');
    const ratingFilter = document.getElementById('rating-filter');
    
    if (!genreFilter || !ratingFilter) return;

    const selectedGenre = genreFilter.value;
    const selectedRating = parseInt(ratingFilter.value);
    
    const reviews = loadReviews();
    
    let filteredReviews = reviews;
    
    if (selectedGenre !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.movieGenre === selectedGenre
        );
    }
    
    if (selectedRating !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.rating >= selectedRating
        );
    }
    
    displayReviews(filteredReviews);
}

// Get recommendations based on user preferences
function getRecommendations() {
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    const yearPreference = document.getElementById('year-preference').value;
    
    if (checkboxes.length === 0) {
        alert('최소 하나 이상의 장르를 선택해주세요.');
        return;
    }
    
    const selectedGenres = Array.from(checkboxes).map(cb => cb.value);
    const movies = loadMovies();
    
    let recommendedMovies = movies.filter(movie => 
        selectedGenres.includes(movie.genre)
    );
    
    if (yearPreference === 'recent') {
        recommendedMovies = recommendedMovies.filter(movie => movie.year >= 2010);
    } else if (yearPreference === 'classic') {
        recommendedMovies = recommendedMovies.filter(movie => movie.year < 2010);
    }
    
    // Sort by rating
    recommendedMovies.sort((a, b) => b.rating - a.rating);
    
    displayRecommendations(recommendedMovies.slice(0, 6));
}

// Display recommendations
function displayRecommendations(movies) {
    const recommendationsGrid = document.getElementById('recommendations-grid');
    if (!recommendationsGrid) return;

    recommendationsGrid.innerHTML = '';
    
    if (movies.length === 0) {
        recommendationsGrid.innerHTML = '<p>추천할 영화가 없습니다.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const recommendationCard = document.createElement('div');
        recommendationCard.className = 'recommendation-card';
        recommendationCard.innerHTML = `
            <div class="recommendation-poster">
                <i class="fas fa-film"></i>
            </div>
            <h4 class="recommendation-title">${movie.title}</h4>
            <p class="recommendation-match">${Math.round(movie.rating * 20)}% 매치</p>
        `;
        recommendationsGrid.appendChild(recommendationCard);
    });
}

// Handle review form submission
function handleReviewSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const review = {
        id: Date.now(),
        movieTitle: formData.get('movie-title'),
        movieYear: parseInt(formData.get('movie-year')),
        movieGenre: formData.get('movie-genre'),
        rating: parseInt(formData.get('movie-rating')),
        reviewTitle: formData.get('review-title'),
        content: formData.get('review-content'),
        reviewerName: formData.get('reviewer-name'),
        date: new Date().toISOString().split('T')[0]
    };
    
    const reviews = loadReviews();
    reviews.unshift(review);
    saveToStorage('reviews', reviews);
    
    // Check if movie exists, if not add it
    const movies = loadMovies();
    const existingMovie = movies.find(m => 
        m.title.toLowerCase() === review.movieTitle.toLowerCase()
    );
    
    if (!existingMovie) {
        const newMovie = {
            id: Date.now(),
            title: review.movieTitle,
            year: review.movieYear,
            genre: review.movieGenre,
            rating: review.rating,
            poster: '🎬'
        };
        movies.push(newMovie);
        saveToStorage('movies', movies);
    }
    
    // Reset form
    e.target.reset();
    document.getElementById('rating-value').textContent = '3';
    
    // Show success message
    alert('리뷰가 성공적으로 게시되었습니다!');
    
    // Refresh displays
    displayReviews();
    displayMovies();
    
    // Scroll to reviews section
    document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    displayMovies();
    displayReviews();
    
    // Set up event listeners
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', searchMovies);
    }
    
    const searchInput = document.getElementById('movie-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchMovies();
            }
        });
    }
    
    const genreFilter = document.getElementById('genre-filter');
    const ratingFilter = document.getElementById('rating-filter');
    if (genreFilter) genreFilter.addEventListener('change', filterReviews);
    if (ratingFilter) ratingFilter.addEventListener('change', filterReviews);
    
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
});
