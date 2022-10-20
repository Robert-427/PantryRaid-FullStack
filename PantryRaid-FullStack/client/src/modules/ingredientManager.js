const baseUrl = 'api/Ingredient'

export const getAllIngredientsFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getIngredientsByUserFromApi = (firebaseUserId) => {
    return fetch(baseUrl+`/GetByUser/${firebaseUserId}`)
    .then((res) => res.json())
}

export const getIngredientByIdFromApi = (ingredientId) => {
    return fetch(baseUrl+`/${ingredientId}`)
    .then((res) => res.json())
};

export const getAllIngredientsByRecipeFromApi = (recipeId) => {
    return fetch(baseUrl+`/GetByRecipe/${recipeId}`)
    .then((res) => res.json())
};

export const addNewIngredientToApi = (ingredient) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    });
};

export const updateIngredintInApi = (ingredient) => {
    return fetch(baseUrl+`/${ingredient.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    });
};