import { useEffect, useState } from "react"
import { getAllIngredientsFromApi } from "../../modules/ingredientManager";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"

export const AllIngredients = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getAllIngredientsFromApi().then(data => setIngredients(data))
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {ingredients.map((ingredient) => (
                    <Ingredient ingredient={ingredient} key={ingredient.id} />
                ))}
            </div>
        </div>
    )
}