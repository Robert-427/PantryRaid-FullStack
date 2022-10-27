import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { getAllIngredientsByRecipeFromApi, getAllIngredientsFromApi } from "../../modules/ingredientManager";
import { getRecipeByIdFromApi, updateRecipeInApi } from "../../modules/recipeManager";
import { IngredientCheckBox } from "../ingredients/IngredientCheckBox";
import "./Recipe.css"

export const RecipeEditForm = () => {
    const [allIngredients, setAllIngredients] = useState([])
    const [ingredientsArray, setIngredientsArray] = useState([])
    const [currentRecipe, setCurrentRecipe] = useState({})
    const navigate = useNavigate()
    const {recipeId} = useParams()

    useEffect(() => {
        getRecipeByIdFromApi(recipeId).then(r => setCurrentRecipe(r))
    }, [])

    useEffect(() => {
        getAllIngredientsByRecipeFromApi(recipeId).then(ri => setIngredientsArray(ri))
    }, [])

    const [newRecipe, setNewRecipe] = useState({
        id: recipeId,
        title: currentRecipe.title,
        imageUrl: currentRecipe.imageUrl,
        website: currentRecipe.website,
        description: currentRecipe.description
    })

    const SaveButtonClick = () => {

        const recipeToSendToApi = {
            id: newRecipe.id,
            title: newRecipe.title,
            imageUrl: newRecipe.imageUrl === "" ? null : newRecipe.imageUrl,
            website: newRecipe.website === "" ? null : newRecipe.website,
            description: newRecipe.description,
            ingredients: ingredientsArray
        }

        return updateRecipeInApi(recipeToSendToApi)
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

    const hasWebsite = () => {
        if (currentRecipe.website === null) {
            return "Enter website here..."
        } else {
            return `${currentRecipe.website}`
        }
    }

    const hasImage = () => {
        if (currentRecipe.imageUrl === null) {
            return "Enter image URL here..."
        } else {
            return `${currentRecipe.imageUrl}`
        }
    }

    return <div className="container">
    <Form>
        <FormGroup>
            <Label for="title">Recipe Title</Label>
            <Input
            name="title"
            placeholder={currentRecipe.title}
            defaultValue={currentRecipe.title}
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
            placeholder={currentRecipe.description}
            defaultValue={currentRecipe.description}
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
            name="url"
            placeholder={hasWebsite()}
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
            Recipe Image Url
            </Label>
            <Input
            id="image"
            name="url"
            type="url"
            placeholder={hasImage()}
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