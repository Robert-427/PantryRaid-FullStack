import { getToken } from "./authManager";

const baseUrl = `/api/Recipe`

export const getAllRecipesFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getRecipeByIngredientFromApi = (ingredientId) => {
    return fetch(baseUrl+ `/GetByIngredient/${ingredientId}`)
    .then((res) => res.json())
};

export const getRecipeByIdFromApi = (recipeId) => {
    return fetch(baseUrl+`/GetByRecipe/${recipeId}`)
    .then((res) => res.json())
}

export const getUsableRecipesFromApi = () => {
    return getToken().then((token) => {
        return fetch(baseUrl+`/GetUsableRecipes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occured while getting recipes"
                )
            }
        })
    })
}

export const getRandomUsableRecipeFromApi = () => {
    return getToken().then((token) => {
        return fetch(baseUrl+`/GetRandomUsableRecipe`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }else {
                throw new Error(
                    "An unknown error occured while getting random recipe"
                )
            }
        })
    })
}

export const addNewRecipeToApi = (recipe) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });
};

export const updateRecipeInApi = (recipe) => {
    return fetch(baseUrl+`/${recipe.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });
};

export const deleteRecipeFromApi = (recipeId) => {
    return fetch(baseUrl+`/${recipeId}`, {
        method: "DELETE"
    });
};