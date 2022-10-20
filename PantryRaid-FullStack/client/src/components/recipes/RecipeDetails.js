import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardLink, CardText, CardTitle } from "reactstrap";
import { getRecipeByIdFromApi } from "../../modules/recipeManager";

export const RecipeDetails = () => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        getRecipeByIdFromApi(recipeId).then(data => setRecipe(data));
    }, [recipeId]);

    return(
        <Card style={{width: '18rem'}}>
            <CardBody>
                <CardTitle tag="h5">{recipe.Title}</CardTitle>
            </CardBody>
            <img
                alt="Card cap"
                src={recipe.imageUrl}
                width="100%"
                />
            <CardBody>
                <CardText>{recipe.description}</CardText>
                <CardLink href="#">
                    {recipe.website}
                </CardLink>
            </CardBody>
        </Card>
    )
}