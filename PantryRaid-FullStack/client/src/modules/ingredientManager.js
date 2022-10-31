import { getToken } from "./authManager";

const baseUrl = '/api/Ingredient'

export const getAllIngredientsFromApi = () => {
    return fetch(baseUrl)
    .then((res) => res.json())
};

export const getAllFoodGroupsFromApi = () => {
    return fetch(baseUrl+`/FoodGroups`)
    .then((res) => res.json())
}

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

export const getAllIngredientsByRecipeFromApi = (recipeId) => {
    return fetch(baseUrl+`/GetByRecipe/${recipeId}`)
    .then((res) => res.json())
};

export const getIngredientByIdFromApi = (ingredientId) => {
    return fetch(baseUrl+`/${ingredientId}`)
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
    return getToken().then((token) => {
        return fetch(baseUrl+`/${ingredient.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredient),
        }).then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occured while updating user's ingredients"
                )
            }
        })
    })
}

export const updateUsersIngredientsInApi = (ingredients) => {
    return getToken().then((token) => {
        return fetch(baseUrl+`/UpdateUsersIngredients`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredients),
        }).then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occured while updating user's ingredients"
                )
            }
        })
    })
}