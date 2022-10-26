import { useEffect, useState } from "react"
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { getUsableRecipesFromApi } from "../../modules/recipeManager";
import { Recipe } from "../recipes/Recipe";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"

export const MyIngredientsList = () => {
    const [ingredients, setIngredients] = useState([])
    const [usableRecipes, setUsableRecipes] = useState([])

    useEffect(() => {
        getIngredientsByUserFromApi().then(data => setIngredients(data));
    }, []);

    useEffect(() => {
        getUsableRecipesFromApi().then(recipes => setUsableRecipes(recipes));
    }, []);

    return (
        <div className="myPantryContainer">
            <div className="row justify-content-center">
                <div className="ingredients">
                    {ingredients.map((ingredient) => (
                        <Ingredient ingredient={ingredient} key={`ingredient-${ingredient.id}`}/>
                    ))}
                </div>
                <div className="recipes">
                    {usableRecipes.map((recipe) => (
                        <Recipe recipe={recipe} key={`recipe-${recipe.id}`} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}