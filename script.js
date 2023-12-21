const mealNameElement = document.getElementById("meal-name");
const mealImagePreviewElement = document.getElementById("meal-image-preview");
const mealImageElement = document.getElementById("meal-image");
const recipeContentElement = document.getElementById("recipe-content");

function fetchRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      const randomMeal = data.meals[0];
      mealNameElement.innerText = randomMeal.strMeal;
      mealImagePreviewElement.src = randomMeal.strMealThumb;
      mealImageElement.src = randomMeal.strMealThumb;
      currentRecipe = randomMeal.strInstructions;
      currentIngredients = getIngredientsList(randomMeal);
    })
    .catch((error) => console.error("Error fetching random meal:", error));
}

function viewImage() {
  document.getElementById("image-modal").style.display = "block";
}

function viewRecipe() {
  recipeContentElement.innerHTML = `
        <span class="close recipe-close" onclick="closeModal('recipe-modal')">&times;</span>
        <div class="recipe-box">
            <p>${currentRecipe}</p>
            <div class="ingredients-list">
                <h3>Ingredients:</h3>
                <ul>${currentIngredients}</ul>
            </div>
        </div>`;
  document.getElementById("recipe-modal").style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function getIngredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`<li>${measure} ${ingredient}</li>`);
    }
  }
  return ingredients.join("");
}

// Code to load random meal //
fetchRandomMeal();

function scrollToMealPage() {
  document.getElementById("meal-page").style.display = "block";
  document
    .getElementById("meal-page")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function searchMeal() {
  var searchQuery = document.getElementById("searchInput").value;
  window.location.href =
    "results.html?search=" + encodeURIComponent(searchQuery);
}
