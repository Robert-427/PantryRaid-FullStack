import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle } from 'reactstrap';

export const Recipe = ({recipe}) => {
    const navigate = useNavigate();
    return (
        <Card className='recipeCard' style={{ width: '18rem' }}>
            <CardBody >
                <CardTitle tag="h5">{recipe.title}</CardTitle>
                <Button color="primary" onClick={n => navigate(`/Recipes/details/${recipe.id}`)}>Details</Button>
            </CardBody>
        </Card>
    );
}
