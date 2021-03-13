import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { IItem } from '../../types/interfaces';

export const getItems = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    );
};

export const addItem = (item: IItem) => (dispatch: Function) => {
  axios 
    .post('/api/items', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    );
};

export const deleteItem = (id: string) => (dispatch: Function) => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
