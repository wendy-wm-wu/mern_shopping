export interface IItem {
  _id?: string;
  name: string;
}

export interface IExistingItem {
  _id: string;
  name: string;
}

export interface IShoppingList {
  item: {
    items: IExistingItem[];
  }
}