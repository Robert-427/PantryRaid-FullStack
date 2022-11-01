import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardLink, CardText, CardTitle } from "reactstrap";
import { getIngredientsByUserFromApi } from "../../modules/ingredientManager"
import { getRandomUsableRecipeFromApi, getUsableRecipesFromApi } from "../../modules/recipeManager";
import { Recipe } from "../recipes/Recipe";
import { RecipeDetails } from "../recipes/RecipeDetails";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"

export const MyPantry = () => {
    const [ingredients, setIngredients] = useState([])
    const [usableRecipes, setUsableRecipes] = useState([])
    const [randomRecipe, setRandomRecipe] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientsByUserFromApi().then(data => setIngredients(data));
    }, []);

    useEffect(() => {
        getUsableRecipesFromApi().then(recipes => setUsableRecipes(recipes));
    }, []);

    const randomize = () => {
        getRandomUsableRecipeFromApi()
            .then(random => {
                const singleRecipe = random[0]
                setRandomRecipe(singleRecipe)
            })
    }

    useEffect(() => {
        randomize()
    }, [])

    const PhotoSwitcher = () => {
        if(randomRecipe.imageUrl == null){
            return <img src={process.env.PUBLIC_URL + "/RecipePhoto.jpg"} alt="No Image Found" width={400} />
        } else {
            return <img src={randomRecipe.imageUrl} width={400} />
        }
    }

    const noIngredientsOnHand = () => {
        if(ingredients.length === 0 || ingredients == null) {
            return <div>
                <h3>Looks like your pantry is empty. Try adding some ingredients you have at home.</h3>
            </div>
        }
    }

    const noAvailableRecipes = () => {
        if(usableRecipes.length === 0 || usableRecipes == null) {
            return <div>
                <h3>You have no recipes you can make until you get more ingredients.</h3>
            </div>
        }
    }

    return (
        <div className="pantry">
            <div className="title">
            <h1 className="header">My Ingredients</h1>
            <h1 className="header">Recipes I Can Make</h1>
            </div>
            <Button color="primary" onClick={() => navigate(`/myIngredients/edit`)}><h6>Change My Ingredients</h6></Button>
            <div className="myPantryContainer">
                <div className="ingredients">
                    {noIngredientsOnHand()}
                    {ingredients.map((ingredient) => (
                        <Ingredient ingredient={ingredient} key={`ingredient-${ingredient.id}`}/>
                        ))}
                </div>
                <div className="recipes">
                    {noAvailableRecipes()}
                    <div className="row justify-content-center">
                    <Card color="secondary" style={{width: '30rem'}}>
                    <Button color="primary" onClick={() => randomize()}><h6>Get New Random Recipe I Can Make</h6></Button>
                        <CardBody>
                            <CardTitle><h5>{randomRecipe.title}</h5></CardTitle>
                        <div className="recipePhoto">
                            {PhotoSwitcher()}
                        </div>
                            <CardText>{randomRecipe.description}</CardText>
                            <CardLink href="#">
                                {randomRecipe.website}
                            </CardLink>
                        </CardBody>
                    </Card>
                </div>
                    {usableRecipes.map((recipe) => (
                        <Recipe recipe={recipe} key={`recipe-${recipe.id}`} /> 
                        ))}
                </div>
            </div>
        </div>
    )
}