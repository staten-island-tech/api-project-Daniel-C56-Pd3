const URL = "https://www.themealdb.com/api/json/v1/1/random.php";

async function getData() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    const meal = data.meals[0];

    document.getElementById("api-response").textContent = meal.strMeal;

  } catch (error) {
    console.error(error);
  }
}

getData();
