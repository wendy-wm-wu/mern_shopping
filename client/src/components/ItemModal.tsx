import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';
import { ITarget, IItemModal, IItemReduxProps } from '../types/interfaces';

const ItemModal = ({
  addItem
}: IItemModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const handleToggle = () => {
    setModal(!modal);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newItem = { name };

    addItem(newItem);

    handleToggle();
  };

  const handleChangeName = (e: ITarget) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={handleToggle}
      >
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input 
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Button color="dark" style={{marginTop: '2rem'}} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapsStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
});

export default connect(mapsStateToProps, { addItem })(ItemModal);
