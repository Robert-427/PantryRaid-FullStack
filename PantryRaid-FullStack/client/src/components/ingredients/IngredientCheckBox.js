import { useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Input } from 'reactstrap';

export const IngredientCheckBox = ({ingredient, ingredientsArray, setIngredientsArray}) => {

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

    const checkboxChangeHandler = (event) => {
        const ingredientCopy = {...ingredient}
        const ingredientsArrayCopy = structuredClone(ingredientsArray)
        if(event.target.checked) {
            ingredientsArrayCopy.push(ingredientCopy)
            setIngredientsArray(ingredientsArrayCopy)
        } else {
            setIngredientsArray(ingredientsArrayCopy.filter((ing) => ing.id !== ingredient.id))
        }
    }

  return (
    <Card className='ingredientCard' color={cardColor()} outline style={{ width: '12rem' }}>
        <CardBody>
            <CardTitle><strong>{ingredient.name}</strong></CardTitle>
            <Input onChange={checkboxChangeHandler} type="checkbox" name='checkbox' value={ingredient} />  Is Required
      </CardBody>
    </Card>
  );
}
