import { useEffect, useState } from "react"
import { getAllRecipesFromApi } from "../../modules/recipeManager"
import { Recipe } from "./Recipe";

export const AllRecipes = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getAllRecipesFromApi().then(data => setRecipes(data));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {recipes.map((recipe) => (
                    <Recipe recipe={recipe} />
                ))}
            </div>
        </div>
    )
}