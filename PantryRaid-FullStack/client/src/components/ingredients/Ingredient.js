import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import "./Ingredient.css"

export const Ingredient = ({ingredient, isAdmin}) => {
    const navigate = useNavigate()
    const cardColor = () => {
        if(ingredient.foodGroup.name == "Dairy") {
            return "warning"
        } else if (ingredient.foodGroup.name == "Fruit" || ingredient.foodGroup.name == "Vegetable"){
            return "success"
        } else if (ingredient.foodGroup.name == "Grain") {
            return "secondary"
        } else if (ingredient.foodGroup.name == "Protein") {
            return "danger"
        } else {
            return "info"
        }
    }

  return (
    <Card className='ingredientCard' color ={cardColor()} style={{ width: '12rem' }}>
        <CardBody>
            <CardTitle><h6>{ingredient.name}</h6></CardTitle>
            <CardText className='cardText'>
                {ingredient.foodGroup.name}
                {isAdmin ? <Button color='dark' onClick={n => navigate(`/Ingredients/edit/${ingredient.id}`)}><h6>Edit</h6></Button> : ""}
            </CardText>
      </CardBody>
    </Card>
  );
}
