/* async function getData() {
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
getData()
const mealCardContainer = document.querySelector("#card-container");

detailedMeals.forEach((meal) => {
  mealCardContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="bg-white p-4 rounded-xl shadow flex flex-col gap-2 hover:shadow-lg transition" 
         data-category="${meal.strCategory}" 
         data-area="${meal.strArea}">
      
      <h2 class="text-xl font-bold">${meal.strMeal}</h2>
      
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded">
      
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      
      <button class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Save Recipe
      </button>
    </div>`
  );
}); */

async function getData() { 
  try{
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese");
  if (response.status !=200){
    throw new Error(response);
  }
  else{
  const data = await response.json();
  console.log(data)
  
  }
} catch (error){
    console.log(error);
  }
}
getData()

const mealCardContainer = document.querySelector(".container");
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese")
  .then(res => res.json())
  .then(data => {
    document.getElementById("meals").innerHTML =
  data.meals.map(meal => `
    <div class="bg-blue p-2  rounded shadow w-16">
      <p class="text-xs text-center mt-1">${meal.strMeal}</p>
      <img src="${meal.strMealThumb}" class="w-16 h-16"/>
    </div>
  `)

  });
