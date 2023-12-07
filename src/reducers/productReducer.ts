// Import necessary modules
import {createSlice} from '@reduxjs/toolkit';
import CoffeeData from '../data/CoffeeData';
import { combineReducers } from 'redux';
import BeansData from '../data/BeansData';

type InitialStateType = {
  CartPrice: String;
  CoffeeList: any;
  BeanList: any;
  FavoritesList: any[];
  CartList: any[];
  OrderHistoryList: any[];
};
// Initial state
const initialState: InitialStateType = {
  CoffeeList: CoffeeData,
  BeanList: BeansData,
  CartPrice: '0',
  FavoritesList: [],
  CartList: [],
  OrderHistoryList: [],
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {id, prices} = action.payload;
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id == id) {
          found = true;
          let size = false;
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == prices[0].size) {
              size = true;
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
          if (size == false) {
            state.CartList[i].prices.push(action.payload.prices[0]);
          }
          state.CartList[i].prices.sort((a: any, b: any) => {
            if (a.size > b.size) {
              return -1;
            }
            if (a.size < b.size) {
              return 1;
            }
            return 0;
          });

          break;
        }
      }

      if (found == false) {
        state.CartList.push(action.payload);
      }
    },
    calculateCartPrice: state => {
      // Implement the logic for calculateCartPrice
      let totalprice = 0;
      for (let i = 0; i < state.CartList.length; i++) {
        let tempprice = 0;
        for (let j = 0; j < state.CartList[i].prices.length; j++) {
          tempprice =
            tempprice +
            parseFloat(state.CartList[i].prices[j].price) *
              state.CartList[i].prices[j].quantity;
        }

        state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
        totalprice = totalprice + tempprice;
      }
      state.CartPrice = totalprice.toFixed(2).toString();
    },
    incrementCartItemQuantity: (state, action) => {
      const {size, id} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id == id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == size) {
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    decrementCartItemQuantity: (state, action) => {
      const {size, id} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id == id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size == size) {
              if (state.CartList[i].prices.length > 1) {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList[i].prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    addToOrderHistoryListFromCart: state => {
      // Implement the logic for addToOrderHistoryListFromCart
      let temp = state.CartList.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + parseFloat(currentValue.ItemPrice),
        0,
      );
      if (state.OrderHistoryList.length > 0) {
        state.OrderHistoryList.unshift({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      } else {
        state.OrderHistoryList.push({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      }
      state.CartList = [];
    },
    // ... other cart-related actions
  },
});

// Favorites slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavoriteList: (state, action) => {
      const {id, type} = action.payload;
      if (type === 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == false) {
              state.CoffeeList[i].favourite = true;
              state.FavoritesList.unshift(state.CoffeeList[i]);
            } else {
              state.CoffeeList[i].favourite = false;
            }
            break;
          }
        }
      } else if (type === 'Bean') {
        for (let i = 0; i < state.BeanList.length; i++) {
          if (state.BeanList[i].id == id) {
            if (state.BeanList[i].favourite == false) {
              state.BeanList[i].favourite = true;
              state.FavoritesList.unshift(state.BeanList[i]);
            } else {
              state.BeanList[i].favourite = false;
            }
            break;
          }
        }
      }
    },
    deleteFromFavoriteList: (state, action) => {
      // Implement the logic for deleteFromFavoriteList
      const {id, type} = action.payload;
      if (type === 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id == id) {
            if (state.CoffeeList[i].favourite == true) {
              state.CoffeeList[i].favourite = false;
            } else {
              state.CoffeeList[i].favourite = false;
            }
            break;
          }
        }
      } else if (type === 'Bean') {
        for (let i = 0; i < state.BeanList.length; i++) {
          if (state.BeanList[i].id == id) {
            if (state.BeanList[i].favourite == true) {
              state.BeanList[i].favourite = false;
            } else {
              state.BeanList[i].favourite = false;
            }
            break;
          }
        }
      }
      let spliceIndex = -1;
      for (let i = 0; i < state.FavoritesList.length; i++) {
        if (state.FavoritesList[i].id == id) {
          spliceIndex = i;
          break;
        }
      }
      state.FavoritesList.splice(spliceIndex, 1);
    },
    // ... other favorites-related actions
  },
});



// Export the reducer for integration into the store
const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  favorites: favoritesSlice.reducer,
});

// Export the combined rootReducer
export default rootReducer;

// Export the reducers
export const {addToCart, calculateCartPrice,incrementCartItemQuantity,decrementCartItemQuantity,addToOrderHistoryListFromCart} = cartSlice.actions;

export const {addToFavoriteList, deleteFromFavoriteList} =
  favoritesSlice.actions;


