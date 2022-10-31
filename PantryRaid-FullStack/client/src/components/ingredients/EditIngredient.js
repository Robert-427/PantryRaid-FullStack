import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row, UncontrolledDropdown } from "reactstrap"
import { getAllFoodGroupsFromApi, getIngredientByIdFromApi, updateIngredintInApi } from "../../modules/ingredientManager"

export const EditIngredient = () => {
    const [ingredient, setIngredient] = useState({})
    const [foodGroups, setFoodGroups] = useState([])
    const {ingredientId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientByIdFromApi(ingredientId).then(data => setIngredient(data))
    }, [])

    useEffect(() => {
        getAllFoodGroupsFromApi().then(foodGroups => setFoodGroups(foodGroups))
    }, [])

    const SaveButtonClick = () => {
        const ingredientToSendToApi = {
            id: ingredientId,
            name: ingredient.name,
            foodGroupId: ingredient.foodGroupId
        }

        return updateIngredintInApi(ingredientToSendToApi)
        .then(() => {navigate(-1)})
    }

    return (
        <div  className="container">
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <Label for="foodGroupSelector"><h6>Food Group</h6></Label>
                        <UncontrolledDropdown className="me-2" direction="down">
                            <DropdownToggle caret color="light" >
                                {ingredient.foodGroup?.name}
                            </DropdownToggle>
                            <DropdownMenu className="sort-dropdown">
                                {foodGroups.map(foodGroup => {
                                    return (
                                        <DropdownItem key={foodGroup.id} value={foodGroup.id} name={foodGroup.name} className="foodGroup--name" 
                                        onClick={(evt) => {
                                            const copy = {...ingredient}
                                            copy.foodGroupId = evt.target.value
                                            copy.foodGroup.id = evt.target.value
                                            copy.foodGroup.name = evt.target.name
                                            setIngredient(copy)
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
                        <Label for="ingredientName"><h6>Ingredient</h6></Label>
                        <Input
                            id={ingredientId}
                            name="ingredientName"
                            defaultValue={ingredient.name}
                            onChange={(evt) => {
                                const copy = {...ingredient}
                                copy.name = evt.target.value
                                setIngredient(copy)
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button color="success" onClick={SaveButtonClick}><h6>Save Changes</h6></Button>
            <Button color="danger" onClick={()=>navigate(-1)}><h6>Cancel</h6></Button>
        </div>
    )
}