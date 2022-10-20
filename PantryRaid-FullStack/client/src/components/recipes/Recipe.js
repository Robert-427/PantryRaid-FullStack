import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle } from 'reactstrap';

export const Recipe = ({recipe}) => {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem' }}>
            <CardImg varient="top" src={recipe.imageUrl} />
            <CardBody>
                <CardTitle tag="h5">{recipe.title}</CardTitle>
                <Button varient="primary" onClick={n => navigate(`/Recipes/details/${recipe.id}`)}>Details</Button>
            </CardBody>
        </Card>
    );
}
