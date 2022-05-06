const initState = () => {
  const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (recipesInStorage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {}, cocktails: { [idRecipe]: [] },
    }));
  }

  if (arrayIngredients.filterIngredients) {
    const allIngredients = arrayIngredients.filterIngredients.map((elem, i) => (
      arrayIngredients.filterMens[i]
        ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : `${elem[1]}`
    ));

    const numberAllIng = allIngredients.length;
    const recipesId = recipesInStorage.cocktails;
    const isThere = Object.keys(recipesId).includes(idRecipe);
    if (isThere) {
      const aux = allIngredients.map((elem) => (
        recipesInStorage.cocktails[idRecipe].includes(elem)
      ));
      return aux;
    }
    return new Array(numberAllIng).fill(false);
  }
};

export default initState;
