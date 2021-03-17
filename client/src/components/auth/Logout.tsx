import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../flux/actions/authActions';
import { ILogoutProps } from '../../types/interfaces'

export const Logout = ({ logout }: ILogoutProps) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
