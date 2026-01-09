async function getData() {
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

getData();

