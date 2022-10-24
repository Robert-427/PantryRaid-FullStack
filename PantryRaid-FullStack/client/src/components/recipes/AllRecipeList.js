import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getAllRecipesFromApi } from "../../modules/recipeManager"
import { Recipe } from "./Recipe";

export const AllRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllRecipesFromApi().then(data => setRecipes(data));
    }, []);

    return (
        <div className="container">
            <Button className="AddRecipe" color="success" onClick={() => navigate("/Recipes/new")}>Add New Recipe</Button>
            <div className="row justify-content-center">
                {recipes.map((recipe) => (
                    <Recipe recipe={recipe} key={recipe.id} />
                ))}
            </div>
        </div>
    )
}