import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
import { IAction } from '../../types/interfaces';

const initialState = {
  msg: {},
  status: null,
  id: null
}

interface IState {
  msg: string | any;
  status: number | null;
  id: any
}

export default function(state: IState = initialState, action: IAction) {
  switch(action.type) {
    case GET_ERRORS: 
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS: 
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
