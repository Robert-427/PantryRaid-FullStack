import { useEffect, useState } from "react"
import { getToken } from "../../modules/authManager";
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { Ingredient } from "./Ingredient";

export const MyIngredientsList = () => {
    const [ingredients, setIngredients] = useState([])

    const firebaseUserId = getToken()

    useEffect(() => {
        getIngredientsByUserFromApi(firebaseUserId).then(data => setIngredients(data));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {ingredients.map((ingredient) => (
                    <Ingredient ingredient={ingredient} />
                ))}
            </div>
        </div>
    )
}