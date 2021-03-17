import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { ITarget, ILoginModal, IAuthReduxProps } from '../../types/interfaces';

const LoginModal = ({
  isAuthenticated,
  error,
  login,
  clearErrors
}: ILoginModal) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // check for register error 
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.message);
    } else {
      setMsg(null);
    }
    // if authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, isAuthenticated, modal]);

  const handleToggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  },[clearErrors, modal]);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    login(user);
  };

  const handleChangeEmail = (e: ITarget) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ITarget) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">Login</NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          { msg ? <Alert color="danger">{msg}</Alert> : null }
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input 
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChangeEmail}
              />
              <Label for="password">Password</Label>
              <Input 
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              <Button color="dark" style={{marginTop: '2rem'}} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapsStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapsStateToProps, { login, clearErrors })(LoginModal);
