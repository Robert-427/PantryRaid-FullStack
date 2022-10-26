import { getToken } from "./authManager";

const baseUrl = '/api/Ingredient'


export const getAllIngredientsFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getIngredientsByUserFromApi = () => {
    return getToken().then((token) => {
        return fetch(baseUrl+`/GetByUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occured while getting ingredients"
                )
            }
        })
    })
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