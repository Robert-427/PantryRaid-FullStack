const baseUrl = 'api/Ingredient'

export const getAllIngredientsFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getAllIngredientsByRecipeFromApi = (recipeId) => {
    return fetch(baseUrl+`GetByRecipe/${recipeId}`)
    .then((res) => res.json())
};

export const getIngredientByIdFromApi = (ingredientId) => {
    return fetch(baseUrl+`/${ingredientId}`)
    .then((res) => res.json())
};