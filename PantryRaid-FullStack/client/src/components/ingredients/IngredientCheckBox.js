import { Card, CardBody, CardText, CardTitle, Input } from 'reactstrap';
import "./Ingredient.css"

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
            return "info"
        }
    }

    const hasIngredient = () => {
        if(!ingredientsArray){
            return false
        }
        for (const ia of ingredientsArray) {
            if(ia.id === ingredient.id) {
                return true
            }
        }
        return false
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
        <Card id='ingredientCard' color={cardColor()} style={{ width: '12rem' }}>
            <CardBody>
                <CardTitle><h6>{ingredient.name}</h6></CardTitle>
                <Input onChange={checkboxChangeHandler} 
                    checked={hasIngredient()} 
                    type="checkbox" 
                    name='checkbox' 
                    id={ingredient.id}/>
            </CardBody>
        </Card>
    );
}
