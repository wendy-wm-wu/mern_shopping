export interface IItem {
  id?: string;
  name: string;
}

export interface IExistingItem {
  id: string;
  name: string;
}

export interface IShoppingList {
  item: {
    items: IExistingItem[];
  };
  getItems(): void;
}

export interface IState {
  items: IItem[];
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IItemReduxProps {
  item: {
    items: IExistingItem[];
  }
}
