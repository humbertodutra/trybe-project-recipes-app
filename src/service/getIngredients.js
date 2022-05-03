export const fetchIngredients = async() => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(url).then((response) => response.json());
  console.log(meals);
  return meals;
};

export const fetchPhotoIngredient = async (ingredientName) => {
  const url = `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;
  const result = await fetch(url).then((response) => response.json());
};
