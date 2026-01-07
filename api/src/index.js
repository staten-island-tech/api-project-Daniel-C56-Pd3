async function getData() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal list");
    }

    const data = await response.json();

    const detailedMeals = await Promise.all(
      data.meals.map((meal) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        ).then((res) => res.json())
      )
    );

    const fullMeals = detailedMeals.map((d) => d.meals[0]);
    console.log(fullMeals);
  } catch (error) {
    console.error(error);
  }
}

getData();

const mealCardContainer = document.querySelector(".container");

fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then((response) => response.json())
  .then((data) => {
    data.meals.forEach((meal) => {
      mealCardContainer.insertAdjacentHTML(
        "afterbegin",
        `
        <div 
          class="card" 
          data-category="${meal.strCategory}" 
          data-area="${meal.strArea}"
        >
          <h2>${meal.strMeal}</h2>
          <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}"
          >
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <button class="btn_meal">Save Recipe</button>
        </div>
        `
      );
    });
  });
