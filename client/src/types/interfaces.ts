import React from "react";

export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

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
  };
  getItems(): void;
  deleteItem(id: string): void;
}

export interface IItemModal {
  addItem(item: IItem): void;
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

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  }
}

export interface IMsg {
  msg: string | any;
}
