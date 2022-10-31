import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardLink, CardText, CardTitle } from "reactstrap";
import { getAllIngredientsByRecipeFromApi } from "../../modules/ingredientManager";
import { getRecipeByIdFromApi } from "../../modules/recipeManager";
import { Ingredient } from "../ingredients/Ingredient";

export const RecipeDetails = ({isAdmin}) => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllIngredientsByRecipeFromApi(recipeId).then(ingData => setRecipeIngredients(ingData))
    }, [recipeId])

    useEffect(() => {
        getRecipeByIdFromApi(recipeId).then(data => setRecipe(data));
    }, [recipeId]);

    const PhotoSwitcher = () => {
        if(recipe.imageUrl == null){
            return <img src={process.env.PUBLIC_URL + "/RecipePhoto.jpg"} alt="No Image Found" width={400} />
        } else {
            return <img src={recipe.imageUrl} width={400} />
        }
    }

    const adminControls = () => {
        if(isAdmin == true) {
            return <Button color="success" onClick={() => navigate(`/Recipes/Edit/${recipeId}`)}><h6>Edit</h6></Button>
        } else {
            return ""
        }
    }

    return(
        <div className="recipeContainer">
            <div className="recipeCard">
                <div className="row justify-content-center">
                    <Card color="secondary" style={{width: '30rem'}}>
                        <CardBody>
                            <CardTitle><h5>{recipe.Title}</h5></CardTitle>
                        <div className="recipePhoto">
                            {PhotoSwitcher()}
                        </div>
                            <CardText>{recipe.description}</CardText>
                            <CardLink href="#">
                                {recipe.website}
                            </CardLink>
                        </CardBody>
                        <Button color="primary" onClick={() => navigate(-1)}><h6>Return</h6></Button>
                        {adminControls()}
                    </Card>
                </div>
            </div>
            <div className="ingredientCards">
                <div className="row justify-content-center">
                    {recipeIngredients.map((ingredient) => (
                        <Ingredient ingredient={ingredient} key={ingredient.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
