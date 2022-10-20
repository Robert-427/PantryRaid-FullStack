import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const Ingredient = ({ingredient}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{ingredient.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{ingredient.foodGroup.name}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
