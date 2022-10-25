import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardLink, CardText, CardTitle } from "reactstrap";
import { getRecipeByIdFromApi } from "../../modules/recipeManager";

export const RecipeDetails = () => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();

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



    return(
        <div className="row justify-content-center">
            <Card style={{width: '30rem'}}>
                <CardBody>
                    <CardTitle tag="h5">{recipe.Title}</CardTitle>
                <div className="recipePhoto">
                    {PhotoSwitcher()}
                </div>
                    <CardText>{recipe.description}</CardText>
                    <CardLink href="#">
                        {recipe.website}
                    </CardLink>
                    {/* {AdminButton()} */}
                </CardBody>
                <Button color="primary" onClick={() => navigate("/Recipes")}>Return</Button>
            </Card>
        </div>
    )
}
