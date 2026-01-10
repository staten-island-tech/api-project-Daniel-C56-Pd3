const mealsContainer = document.getElementById("meals");
const form = document.getElementById("searchForm");
const input = document.getElementById("areaInput");

async function getData(area) {
  try {
    mealsContainer.innerHTML = "";

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();

    if (!data.meals) {
      throw new Error("No meals found");
    }

    mealsContainer.innerHTML = data.meals
      .map(
        meal => `
        <div class="p-2 rounded-lg shadow-sm bg-white flex flex-col items-center gap-1">
          <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}" 
            class="w-full h-auto object-cover rounded-md"
          />
          <p class="text-xs text-center font-medium">
            ${meal.strMeal}
          </p>
        </div>
      `
      )
      .join("");

  } catch (error) {
    alert(error.message);
  }
}

getData("Chinese");

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!input.value.trim()) {
    alert("Please enter a cuisine");
    return;
  }

  getData(input.value.trim());
});
