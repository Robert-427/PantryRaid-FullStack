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
            <Label for="title">Recipe Title</Label>
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
            Cooking Directions
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
            Select Ingredients
            </Label>
            {ingredientSelections()}
        </FormGroup>
        <FormGroup>
            <Label for="website">
            Website for recipe
            </Label>
            <Input
            id="website"
            name="website"
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
            <Label for="exampleFile">
            Recipe Image Url
            </Label>
            <Input
            id="exampleFile"
            name="file"
            type="url"
            onChange={(evt) => {
                const copy = {...newRecipe}
                copy.imageUrl = evt.target.value
                setNewRecipe(copy)
            }}
            />
            <FormText>
            If you have a picture to add to your recipe, please enter that address that here.
            </FormText>
        </FormGroup>
        <div className="buttonRow">
            <Button className="recipeButton" color="primary" onClick={() => SaveButtonClick()}>
                Submit
            </Button>
            <Button className="recipeButton" color="danger" onClick={() => navigate("/Recipes")}>
                Cancel
            </Button>
        </div>
    </Form>
    </div>
}