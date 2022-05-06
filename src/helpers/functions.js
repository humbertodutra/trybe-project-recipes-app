const initState = (arrayIngredients, idRecipe, type) => {
  const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (type === 'meals') {
    if (recipesInStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [idRecipe]: [] }, cocktails: {},
      }));
    }
  } else if (recipesInStorage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { [idRecipe]: [] }, meals: {},
    }));
  }

  if (arrayIngredients.filterIngredients) {
    const allIngredients = arrayIngredients.filterIngredients.map((elem, i) => (
      arrayIngredients.filterMens[i]
        ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : `${elem[1]}`
    ));

    const numberAllIng = allIngredients.length;
    const recipesId = recipesInStorage[type];
    const isThere = Object.keys(recipesId).includes(idRecipe);
    if (isThere) {
      const aux = allIngredients.map((elem) => (
        recipesInStorage[type][idRecipe].includes(elem)
      ));
      return aux;
    }
    return new Array(numberAllIng).fill(false);
  }
};

export default initState;
