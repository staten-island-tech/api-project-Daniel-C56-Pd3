async function getData() { 
  try{
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
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
