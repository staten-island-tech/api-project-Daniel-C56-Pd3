/*async function getData() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();
document.getElementById("meals").innerHTML = data.meals
  .map(
    (meal) => `
    <div class="w-100 p-2 rounded-lg shadow-sm bg-white flex flex-col items-center gap-1">
      <img 
        src="${meal.strMealThumb}" 
        alt="${meal.strMeal}" 
        alt="${meal.idmeal}"
        class="w-100 h-100 object-cover rounded-md"
      />
      <p class="text-xs text-center font-medium leading-tight">
        ${meal.strMeal}
      </p>
    </div>
  `
  )
  .join("");
  } catch (error) {
    console.error(error);
  }
}
getData();*/

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
      <div class="bg-white p-2 rounded shadow flex flex-col items-center">
        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="w-full h-32 object-cover rounded"
        />
        <p class="text-xs text-center mt-1 font-medium">
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
