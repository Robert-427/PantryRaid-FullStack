import { Card, CardBody, CardText, CardTitle, Input } from 'reactstrap';

export const IngredientCheckBox = ({ingredient}) => {

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
    <Card className='ingredientCard' color={cardColor()} outline style={{ width: '12rem' }}>
        <CardBody>
            <CardTitle><strong>{ingredient.name}</strong></CardTitle>
            <Input type="checkbox" />  Is Required
      </CardBody>
    </Card>
  );
}
