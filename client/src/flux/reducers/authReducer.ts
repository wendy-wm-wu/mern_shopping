import { setItemsLoading } from '../actions/itemActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

interface IState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: object | null;
}

export default function(state: IState = initialState, action: any) {
  switch(action.type) {
    case USER_LOADING: 
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED: 
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS: 
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.access_token);
      return {
        ...state,
        ...action.payload,
        token: action.payload.access_token,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
