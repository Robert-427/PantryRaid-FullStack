import { useEffect, useState } from "react"
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { Ingredient } from "./Ingredient";

export const MyIngredientsList = () => {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getIngredientsByUserFromApi().then(data => setIngredients(data));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {ingredients.map((ingredient) => (
                    <Ingredient ingredient={ingredient} key={ingredient.id}/>
                ))}
            </div>
        </div>
    )
}