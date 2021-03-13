import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IShoppingList, IItemReduxProps } from '../types/interfaces';

const ShoppingList = ({
  item,
  getItems,
  deleteItem
}: IShoppingList) => {

  useEffect(() => {
    getItems();
  }, [getItems]);

  const { items } = item;
  
  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  return (  
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(_id)}
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
