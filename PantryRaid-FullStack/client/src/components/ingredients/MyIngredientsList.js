import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { getUsableRecipesFromApi } from "../../modules/recipeManager";
import { Recipe } from "../recipes/Recipe";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"

export const MyIngredientsList = () => {
    const [ingredients, setIngredients] = useState([])
    const [usableRecipes, setUsableRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientsByUserFromApi().then(data => setIngredients(data));
    }, []);

    useEffect(() => {
        getUsableRecipesFromApi().then(recipes => setUsableRecipes(recipes));
    }, []);

    return (
        <div>
            <Button color="primary" onClick={() => navigate(`/myIngredients/edit`)}>Change My Ingredients</Button>
            <div className="myPantryContainer">
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