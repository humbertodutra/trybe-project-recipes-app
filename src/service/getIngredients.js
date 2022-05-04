const fetchIngredients = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};
export default fetchIngredients;
