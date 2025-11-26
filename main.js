import { exercises } from './data.js';
import './style.css';

const app = document.querySelector('#app');
let currentIndex = -1; // -1: Landing, 0...n: Exercises, n+1: Congrats
let touchStartX = 0;
let touchEndX = 0;

// Load weights from local storage
const getStoredWeights = () => {
  const stored = localStorage.getItem('workout_weights');
  return stored ? JSON.parse(stored) : {};
};

const saveWeight = (id, weight) => {
  const weights = getStoredWeights();
  weights[id] = weight;
  localStorage.setItem('workout_weights', JSON.stringify(weights));
};

// Render Functions
const renderLanding = () => {
  app.innerHTML = `
    <div id="landing-view" class="view active">
      <h1>Workout Planner</h1>
      <button class="start-btn" id="start-btn">START WORKOUT</button>
    </div>
  `;
  document.getElementById('start-btn').addEventListener('click', nextSlide);
  // Also allow clicking anywhere on landing as per request "When I click the screen"
  document.getElementById('landing-view').addEventListener('click', (e) => {
    if (e.target.id !== 'start-btn') nextSlide();
  });
};

const renderExercise = (index) => {
  const exercise = exercises[index];
  const weights = getStoredWeights();
  const currentWeight = weights[exercise.id] || '';

  // Generate progress dots
  const dotsHtml = exercises.map((_, i) =>
    `<div class="dot ${i === index ? 'active' : ''}"></div>`
  ).join('');

  const html = `
    <div class="view active" id="exercise-view">
      <div class="exercise-card">
        <div class="category-badge">${exercise.category}</div>
        <h2 class="exercise-title">${exercise.name}</h2>
        
        <img src="${exercise.image}" alt="${exercise.name}" class="exercise-image" onerror="this.src='https://placehold.co/600x400?text=${exercise.name}'">
        
        <div class="exercise-details">
          <div class="stat-row">
            ${exercise.sets ? `
            <div class="stat">
              <span class="stat-value">${exercise.sets}</span>
              <span class="stat-label">Sets</span>
            </div>` : ''}
            
            ${exercise.reps ? `
            <div class="stat">
              <span class="stat-value">${exercise.reps}</span>
              <span class="stat-label">Reps</span>
            </div>` : ''}
            
            ${exercise.duration ? `
            <div class="stat">
              <span class="stat-value">${exercise.duration}</span>
              <span class="stat-label">Duration</span>
            </div>` : ''}
          </div>

          <div class="weight-input-container">
            <label class="stat-label" for="weight-${exercise.id}">Weight</label>
            <input type="number" id="weight-${exercise.id}" class="weight-input" value="${currentWeight}" placeholder="0">
            <span class="stat-label">kg</span>
          </div>
        </div>
      </div>
      
      <div class="progress-dots">
        ${dotsHtml}
      </div>
      
      <div class="swipe-hint">← Swipe to navigate →</div>
    </div>
  `;
  app.innerHTML = html;

  // Weight input listener
  const input = document.getElementById(`weight-${exercise.id}`);
  input.addEventListener('input', (e) => {
    saveWeight(exercise.id, e.target.value);
  });

  setupSwipe();
};

const renderCongrats = () => {
  app.innerHTML = `
    <div id="congrats-view" class="view active">
      <div class="congrats-icon">🎉</div>
      <h1>Workout Complete!</h1>
      <p>Great job on finishing your workout.</p>
      <button class="start-btn" id="finish-btn">FINISH</button>
    </div>
  `;
  document.getElementById('finish-btn').addEventListener('click', resetApp);
  document.getElementById('congrats-view').addEventListener('click', (e) => {
    if (e.target.id !== 'finish-btn') resetApp();
  });
};

// Navigation Logic
const nextSlide = () => {
  currentIndex++;
  updateView();
};

const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateView();
  }
};

const resetApp = () => {
  currentIndex = -1;
  updateView();
};

const updateView = () => {
  if (currentIndex === -1) {
    renderLanding();
  } else if (currentIndex < exercises.length) {
    renderExercise(currentIndex);
  } else {
    renderCongrats();
  }
};

// Swipe Logic
const setupSwipe = () => {
  const view = document.getElementById('exercise-view');
  if (!view) return;

  view.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  view.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
};

const handleSwipe = () => {
  const threshold = 50;
  const swipeDistance = touchStartX - touchEndX;

  if (swipeDistance > threshold) {
    // Swiped Left -> Next
    nextSlide();
  } else if (swipeDistance < -threshold) {
    // Swiped Right -> Prev
    prevSlide();
  }
};

// Init
renderLanding();
