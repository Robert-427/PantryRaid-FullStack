import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { getAllIngredientsFromApi, getIngredientsByUserFromApi, updateUsersIngredientsInApi } from "../../modules/ingredientManager"
import { IngredientCheckBox } from "./IngredientCheckBox"

export const EditMyIngredients = () => {
    const [ingredientsArray, setIngredientsArray] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        getIngredientsByUserFromApi().then(uIng => setIngredientsArray(uIng))
    }, [])

    useEffect (() => {
        getAllIngredientsFromApi().then(aIng => setAllIngredients(aIng))
    }, [])

    const SaveButtonClick = () => {
        return updateUsersIngredientsInApi(ingredientsArray)
        .then(() => {
            navigate(-1)
        })
    }

    return (
        <div className="container">
            <div>
                <Button color="success" onClick={() => SaveButtonClick()}><h6>Save Updated Ingredients</h6></Button>
                <Button color="danger" onClick={() => navigate(-1)}><h6>Cancel</h6></Button>
            </div>
            <div className="row justify-content-center">
                {allIngredients.map((ingredient) => (
                    <IngredientCheckBox 
                        ingredient={ingredient} 
                        key={ingredient.id}
                        ingredientsArray={ingredientsArray} 
                        setIngredientsArray={setIngredientsArray}
                    />
                ))}
            </div>
        </div>
    )
}