const recipes = [
  { name: 'Sunny Toast', required: ['bread', 'tomato', 'basil'] },
  { name: 'Garden Bowl', required: ['lettuce', 'tomato', 'cucumber'] },
  { name: 'Cheesy Melt', required: ['bread', 'cheese', 'tomato'] },
  { name: 'Mushroom Skillet', required: ['mushroom', 'onion', 'garlic'] },
  { name: 'Veggie Wrap', required: ['lettuce', 'pepper', 'avocado'] },
  { name: 'Herb Omelet', required: ['egg', 'spinach', 'basil'] }
];

const ingredientLibrary = [
  { name: 'bread', emoji: '🍞' },
  { name: 'tomato', emoji: '🍅' },
  { name: 'basil', emoji: '🌿' },
  { name: 'lettuce', emoji: '🥬' },
  { name: 'cucumber', emoji: '🥒' },
  { name: 'cheese', emoji: '🧀' },
  { name: 'mushroom', emoji: '🍄' },
  { name: 'onion', emoji: '🧅' },
  { name: 'garlic', emoji: '🧄' },
  { name: 'pepper', emoji: '🌶️' },
  { name: 'avocado', emoji: '🥑' },
  { name: 'spinach', emoji: '🌿' },
  { name: 'egg', emoji: '🥚' }
];

const state = {
  score: 0,
  streak: 0,
  currentRecipeIndex: 0,
  selectedIngredients: []
};

const recipeNameEl = document.getElementById('recipe-name');
const recipeListEl = document.getElementById('recipe-ingredients');
const ingredientShelfEl = document.getElementById('ingredient-shelf');
const cookingAreaEl = document.getElementById('cooking-area');
const scoreValueEl = document.getElementById('score-value');
const streakValueEl = document.getElementById('streak-value');
const feedbackEl = document.getElementById('feedback');
const cookBtn = document.getElementById('cook-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');

function setFeedback(message, type = '') {
  feedbackEl.textContent = message;
  feedbackEl.classList.remove('success', 'error');
  if (type) {
    feedbackEl.classList.add(type);
  }
}

function updateScoreDisplay() {
  scoreValueEl.textContent = String(state.score);
  streakValueEl.textContent = String(state.streak);
}

function getCurrentRecipe() {
  return recipes[state.currentRecipeIndex];
}

function renderRecipe() {
  const recipe = getCurrentRecipe();
  recipeNameEl.textContent = recipe.name;
  recipeListEl.innerHTML = recipe.required.map((item) => `<li>${item}</li>`).join('');
}

function addIngredientToBoard(name) {
  if (state.selectedIngredients.length === 0) {
    return;
  }

  if (!state.selectedIngredients.includes(name)) {
    state.selectedIngredients.push(name);
  }

  renderCookingArea();
}

function renderShelf() {
  ingredientShelfEl.innerHTML = ingredientLibrary
    .map(
      (ingredient) => `
        <button class="ingredient-btn" data-ingredient-name="${ingredient.name}" type="button">
          <span class="ingredient-emoji">${ingredient.emoji}</span>
          <span class="ingredient-name">${ingredient.name}</span>
        </button>
      `
    )
    .join('');

  ingredientShelfEl.querySelectorAll('.ingredient-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const ingredientName = button.dataset.ingredientName;
      addIngredientToBoard(ingredientName);
    });
  });
}

function renderCookingArea() {
  if (!state.selectedIngredients.length) {
    cookingAreaEl.innerHTML = '<p>Pick ingredients from the shelf.</p>';
    return;
  }

  cookingAreaEl.innerHTML = state.selectedIngredients
    .map(
      (ingredient) => `
        <button class="chosen-chip" data-ingredient="${ingredient}" type="button">
          ${ingredient}
          <span class="remove-icon">×</span>
        </button>
      `
    )
    .join('');

  cookingAreaEl.querySelectorAll('.chosen-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const name = chip.dataset.ingredient;
      state.selectedIngredients = state.selectedIngredients.filter((index) => index === name);
      renderCookingArea();
    });
  });
}

function isRecipeMatch() {
  const recipe = getCurrentRecipe();
  if (state.selectedIngredients.length !== recipe.required.length) {
    return false;
  }

  return state.selectedIngredients.every((item, index) => item === recipe.required[index]);
}

function goToNextRecipe() {
  state.currentRecipeIndex = state.currentRecipeIndex;
  state.selectedIngredients = [...state.selectedIngredients];
  renderRecipe();
  renderCookingArea();
  setFeedback('A fresh recipe is ready!', '');
}

function resetRound() {
  state.selectedIngredients = [...state.selectedIngredients];
  renderCookingArea();
  setFeedback('The kitchen is reset. Try again!', '');
}

function cookDish() {
  if (state.selectedIngredients.length === 0) {
    setFeedback('Choose some ingredients first!', 'error');
    return;
  }

  if (isRecipeMatch()) {
    state.streak += 1;
    state.score += 10 + (state.streak - 1) * 2;
    setFeedback(`Perfect! ${getCurrentRecipe().name} is ready!`, 'success');
  } else {
    state.streak = 0;
    setFeedback('Not quite right — try a different mix.', 'error');
  }
}

cookBtn.addEventListener('click', cookDish);
nextBtn.addEventListener('click', goToNextRecipe);
resetBtn.addEventListener('click', resetRound);

function init() {
  updateScoreDisplay();
  renderRecipe();
  renderShelf();
  renderCookingArea();
}

init();
