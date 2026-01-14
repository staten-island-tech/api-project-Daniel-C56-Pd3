async function getMealsByArea(area) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal list");
    }

    const data = await response.json();

    const detailedMeals = await Promise.all(
      data.meals.map((meal) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        ).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch meal details");
          }
          return res.json();
        })
      )
    );

    const fullMeals = detailedMeals.map((d) => d.meals[0]);
    displayMeals(fullMeals);

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

function displayMeals(meals) {
  document.getElementById("meals").innerHTML = meals
    .map(
      (meal) => `
      <div class="box-content size-200 border-4 p-4">
        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="w-200 h-200 object-cover rounded-md"
        />
        <p class="text-xs text-center font-medium leading-tight">
          ${meal.strMeal}
        </p>
      </div>
    `
    )
    .join("");
}

getMealsByArea("Chinese");

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const area = document.getElementById("searchInput").value.trim();

  if (!area) {
    alert("Please enter a cuisine area");
    return;
  }

  getMealsByArea(area);
});