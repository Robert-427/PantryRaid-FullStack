import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import "./Ingredient.css"

export const Ingredient = ({ingredient}) => {
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
            return "primary"
        }
    }
    
  return (
    <Card className='ingredientCard' color ={cardColor()} outline style={{ width: '12rem' }}>
        <CardBody>
            <CardTitle><strong>{ingredient.name}</strong></CardTitle>
            <CardText>
                {ingredient.foodGroup.name}
            </CardText>
      </CardBody>
    </Card>
  );
}
