document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchMeals);
});

function searchMeals() {
  const searchText = document.getElementById("searchText").value;
  const resultsContainer = document.getElementById("resultsContainer");

  resultsContainer.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((response) => response.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => console.error("Error fetching meals:", error));
}

function displayMeals(meals) {
  const resultsContainer = document.getElementById("resultsContainer");

  if (!meals) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info">
                    <h3>${meal.strMeal}</h3>
                    <button onclick="showRecipe('${meal.strMeal}', '${meal.idMeal}')">View Recipe</button>
                </div>
            `;
    resultsContainer.appendChild(mealDiv);
  });
}

function showRecipe(mealName, mealId) {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  // Fetch detailed information about the meal
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      modalTitle.textContent = mealName;
      modalBody.innerHTML = `<p>${meal.strInstructions}</p>`;
      modal.style.display = "flex";
    })
    .catch((error) => console.error("Error fetching meal details:", error));
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
