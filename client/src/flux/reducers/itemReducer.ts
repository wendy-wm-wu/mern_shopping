import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';
import { v4 as uuid } from 'uuid';
import { IItem, IAction, IState } from '../../types/interfaces';

const initialState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Steak' },
    { id: uuid(), name: 'Water' }
  ],
}
 
export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_ITEMS: 
      return {
        ...state,
      };
    default: 
      return state;
  }
}
