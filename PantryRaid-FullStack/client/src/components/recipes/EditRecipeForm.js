import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { getAllIngredientsByRecipeFromApi, getAllIngredientsFromApi } from "../../modules/ingredientManager";
import { getRecipeByIdFromApi, updateRecipeInApi } from "../../modules/recipeManager";
import { IngredientCheckBox } from "../ingredients/IngredientCheckBox";
import "./Recipe.css"

export const RecipeEditForm = () => {
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [ingredientsArray, setIngredientsArray] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const navigate = useNavigate()
    const {recipeId} = useParams()

    useEffect(() => {
        getRecipeByIdFromApi(recipeId).then(r => setCurrentRecipe(r))
    }, [])
    
    useEffect(() => {
        getAllIngredientsByRecipeFromApi(recipeId).then(ri => setIngredientsArray(ri))
    }, [])
    
    useEffect(() => {
        getAllIngredientsFromApi().then(data => setAllIngredients(data))
    }, []);

    const SaveButtonClick = () => {

        const recipeToSendToApi = {
            id: currentRecipe.id,
            title: currentRecipe.title,
            imageUrl: currentRecipe.imageUrl === "" ? null : currentRecipe.imageUrl,
            website: currentRecipe.website === "" ? null : currentRecipe.website,
            description: currentRecipe.description,
            ingredients: ingredientsArray
        }

        return updateRecipeInApi(recipeToSendToApi)
        .then(() => {
            navigate(-1)
        })
    }

    const ingredientSelections = () => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {allIngredients.map((ingredient) => (
                        <IngredientCheckBox 
                            ingredient={ingredient} 
                            key={ingredient.id} 
                            ingredientsArray={ingredientsArray} 
                            setIngredientsArray={setIngredientsArray}/>
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
                const copy = {...currentRecipe}
                copy.title = evt.target.value
                setCurrentRecipe(copy)
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
                const copy = {...currentRecipe}
                copy.description = evt.target.value
                setCurrentRecipe(copy)
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
                const copy = {...currentRecipe}
                copy.website = evt.target.value
                setCurrentRecipe(copy)
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
                const copy = {...currentRecipe}
                copy.imageUrl = evt.target.value
                setCurrentRecipe(copy)
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
            <Button className="recipeButton" color="danger" onClick={() => navigate(-1)}>
                Cancel
            </Button>
        </div>
    </Form>
    </div>
}