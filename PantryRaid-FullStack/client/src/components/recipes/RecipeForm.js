import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { getAllIngredientsFromApi } from "../../modules/ingredientManager";
import { addNewRecipeToApi } from "../../modules/recipeManager";
import { IngredientCheckBox } from "../ingredients/IngredientCheckBox";
import "./Recipe.css"

export const RecipeForm = () => {
    const [allIngredients, setAllIngredients] = useState([])
    const [ingredientsArray, setIngredientsArray] = useState([])
    const navigate = useNavigate()

    const [newRecipe, setNewRecipe] = useState({
        title: "",
        imageUrl: "",
        website: "",
        description: ""
    })

    const SaveButtonClick = () => {

        const recipeToSendToApi = {
            title: newRecipe.title,
            imageUrl: newRecipe.imageUrl === "" ? null : newRecipe.imageUrl,
            website: newRecipe.website === "" ? null : newRecipe.website,
            description: newRecipe.description,
            ingredients: ingredientsArray
        }

        return addNewRecipeToApi(recipeToSendToApi)
        .then(() => {
            navigate("/Recipes")
        })
    }

    useEffect(() => {
        getAllIngredientsFromApi().then(data => setAllIngredients(data))
    }, []);

    const ingredientSelections = () => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {allIngredients.map((ingredient) => (
                        <IngredientCheckBox ingredient={ingredient} key={ingredient.id} ingredientsArray={ingredientsArray} setIngredientsArray={setIngredientsArray}/>
                    ))}
                </div>
            </div>
        )
    }

    return <div className="container">
    <Form>
        <FormGroup>
            <Label for="title"><h6>Recipe Title</h6></Label>
            <Input
            name="title"
            placeholder="New recipe title here..."
            onChange={(evt) => {
                const copy = {...newRecipe}
                copy.title = evt.target.value
                setNewRecipe(copy)
            }}
            />
        </FormGroup>
        <FormGroup>
            <Label for="directions">
            <h6>Cooking Directions</h6>
            </Label>
            <Input
            name="directions"
            placeholder="Enter detailed step-by-step directions for entire recipe here..."
            type="textarea"
            onChange={(evt) => {
                const copy = {...newRecipe}
                copy.description = evt.target.value
                setNewRecipe(copy)
            }}
            />
        </FormGroup>
        <FormGroup>
            <Label for="exampleSelect">
            <h6>Select Ingredients</h6>
            </Label>
            {ingredientSelections()}
        </FormGroup>
        <FormGroup>
            <Label for="website">
            <h6>Website for recipe</h6>
            </Label>
            <Input
            id="website"
            name="url"
            placeholder="Enter website here..."
            type="url"
            onChange={(evt) => {
                const copy = {...newRecipe}
                copy.website = evt.target.value
                setNewRecipe(copy)
            }}
            />
        </FormGroup>
        <FormGroup>
            <Label for="image">
            <h6>Recipe Image Url</h6>
            </Label>
            <Input
            id="image"
            name="url"
            type="url"
            placeholder="If you have a picture to add to your recipe, please enter that address that here."
            onChange={(evt) => {
                const copy = {...newRecipe}
                copy.imageUrl = evt.target.value
                setNewRecipe(copy)
            }}
            />
        </FormGroup>
        <div className="buttonRow">
            <Button className="recipeButton" color="primary" onClick={() => SaveButtonClick()}>
                <h6>Submit</h6>
            </Button>
            <Button className="recipeButton" color="danger" onClick={() => navigate("/Recipes")}>
                <h6>Cancel</h6>
            </Button>
        </div>
    </Form>
    </div>
}