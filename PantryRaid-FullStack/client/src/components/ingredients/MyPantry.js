import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { getUsableRecipesFromApi } from "../../modules/recipeManager";
import { Recipe } from "../recipes/Recipe";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"

export const MyPantry = () => {
    const [ingredients, setIngredients] = useState([])
    const [usableRecipes, setUsableRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientsByUserFromApi().then(data => setIngredients(data));
    }, []);

    useEffect(() => {
        getUsableRecipesFromApi().then(recipes => setUsableRecipes(recipes));
    }, []);

    const noIngredientsOnHand = () => {
        if(ingredients.length === 0 || ingredients == null) {
            return <div>
                <h3>Looks like your pantry is empty. Try adding some ingredients you have at home.</h3>
            </div>
        }
    }

    const noAvailableRecipes = () => {
        if(usableRecipes.length === 0 || usableRecipes == null) {
            return <div>
                <h3>You have no recipes you can make until you get more ingredients.</h3>
            </div>
        }
    }

    return (
        <div className="pantry">
            <div className="title">
            <h1 className="header">My Ingredients</h1>
            <h1 className="header">Recipes I Can Make</h1>
            </div>
            <Button color="primary" onClick={() => navigate(`/myIngredients/edit`)}><h6>Change My Ingredients</h6></Button>
            <div className="myPantryContainer">
                <div className="ingredients">
                    {noIngredientsOnHand()}
                    {ingredients.map((ingredient) => (
                        <Ingredient ingredient={ingredient} key={`ingredient-${ingredient.id}`}/>
                        ))}
                </div>
                <div className="recipes">
                    {noAvailableRecipes()}
                    {usableRecipes.map((recipe) => (
                        <Recipe recipe={recipe} key={`recipe-${recipe.id}`} /> 
                        ))}
                </div>
            </div>
        </div>
    )
}