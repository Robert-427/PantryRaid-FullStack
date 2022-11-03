import { useEffect, useState } from "react"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row, UncontrolledDropdown } from "reactstrap";
import { addNewIngredientToApi, getAllFoodGroupsFromApi, getAllIngredientsFromApi } from "../../modules/ingredientManager";
import { Ingredient } from "./Ingredient";
import "./Ingredient.css"
import { Error } from "./Modal";

export const AllIngredients = ({isAdmin}) => {
    const [ingredients, setIngredients] = useState([]);
    const [foodGroups, setFoodGroups] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [newIngredient, setNewIngredient] = useState({
        name: "",
        foodGroupId: 0,
        foodGroupName: ""
    });

    const getIngredients = () => {
        getAllIngredientsFromApi().then(data => setIngredients(data))
    }

    useEffect(() => {
        getIngredients()
    }, []);
    
    useEffect(() => {
        getAllFoodGroupsFromApi().then(foodGroups => setFoodGroups(foodGroups))
    }, []);

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        )
        newIngredient.foodGroupId = 0
    };

    const groupSelctor = () => {
        if (newIngredient.foodGroupId == 0) {
            return "Select..."
        } else {
            return `${newIngredient.foodGroupName}`
        }
    }

    const isValid = () => {
        if(newIngredient.id === 0 || newIngredient.name === ""){
            {toggle()}
        } else {
            {SaveButtonClick()}
        }
    }

    const SaveButtonClick = () => {
        const ingredientToSendToApi = {
            name: newIngredient.name,
            foodGroupId: newIngredient.foodGroupId
        }
        return addNewIngredientToApi(ingredientToSendToApi)
        .then(() => getIngredients())
        .then(() => handleReset())
    }

    const adminControls = () => {
        if(isAdmin) {
            return <div className="row justify-content-center">
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="FoodGroup"><h6>Select Food Group</h6></Label>
                            <UncontrolledDropdown className="me-2" direction="down">
                                <DropdownToggle caret color="light" >
                                    {groupSelctor()}
                                </DropdownToggle>
                                <DropdownMenu className="sort-dropdown">
                                    {foodGroups.map(foodGroup => {
                                        return (
                                            <DropdownItem 
                                                key={foodGroup.id} 
                                                value={foodGroup.id} 
                                                name={foodGroup.name} 
                                                className="foodGroup--name" 
                                                onClick={(evt) => {
                                                    const copy = {...newIngredient}
                                                    copy.foodGroupId = evt.target.value
                                                    copy.foodGroupName = evt.target.name
                                                    setNewIngredient(copy)
                                                }}
                                            >
                                                {foodGroup.name}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="Name"><h6>New Ingredient</h6></Label>
                            <Input 
                                id="newIngredient" 
                                name="newIngredient"
                                placeholder="Enter New Ingredient Name Here..."
                                onChange={(evt) => {
                                    const copy = {...newIngredient}
                                    copy.name = evt.target.value
                                    setNewIngredient(copy)
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={1}>
                        <Button color="success" onClick={isValid}><h6>Save Ingredient</h6></Button>
                    </Col>
                </Row>
                <Error className={"errorModal"} modal={modal} toggle={toggle} />
            </div>
        }
    };

    return (
        <div className="container">
            {adminControls()}
            <div className="row justify-content-center">
                {ingredients.map((ingredient) => (
                    <Ingredient ingredient={ingredient} key={ingredient.id} isAdmin={isAdmin}/>
                ))}
            </div>
        </div>
    )
}