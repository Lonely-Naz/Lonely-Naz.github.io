const startDate = new Date('2025-02-28');
const today = new Date();
const loveDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
document.getElementById('love-days').textContent = loveDays + '天';

function toggleFuture(element) {
    element.classList.toggle('completed');
}

let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carousel-dots');
let autoPlayInterval;

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function moveCarousel(direction) {
    goToSlide(currentSlide + direction);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => moveCarousel(1), 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

createDots();
startAutoPlay();

carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

let isPlaying = false;
const audio = document.getElementById('audio');
const playIcon = document.getElementById('play-icon');
const vinyl = document.getElementById('vinyl');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        vinyl.classList.remove('playing');
    } else {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        vinyl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

audio.addEventListener('timeupdate', function() {
    const percent = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', function() {
    isPlaying = false;
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    vinyl.classList.remove('playing');
    progress.style.width = '0%';
});

function showHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 1200);
}

const nextAnniversary = new Date(today.getFullYear(), 1, 28);
if (today > nextAnniversary) {
    nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
}
const countdownDays = Math.floor((nextAnniversary - today) / (1000 * 60 * 60 * 24));
document.getElementById('countdown').textContent = countdownDays;

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
        const colors = ['#b7d1ec', '#a8b7da', '#9e9cc4'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});