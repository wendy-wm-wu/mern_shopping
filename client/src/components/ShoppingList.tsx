import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IShoppingList, IItemReduxProps } from '../types/interfaces';

const ShoppingList = ({
  getItems,
  item
}: IShoppingList) => {

  const [items, setItems] = useState(item.items);

  useEffect(() => {
    getItems();
  }, [getItems]);

  // const { items } = item;
  return (  
    <Container>
      <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            setItems([...items, { id: uuid(), name }]);
          }
        }} 
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => setItems(items.filter(item => item.id !== id))}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
