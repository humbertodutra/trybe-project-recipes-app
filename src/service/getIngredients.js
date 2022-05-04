export const fetchIngredients = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const fetchRecipesByIngredients = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await fetch(url).then((response) => response.json());
  console.log(meals);
  return meals;
};

export const fetchDrinksIngredients = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};
