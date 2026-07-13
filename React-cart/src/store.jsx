import { configureStore, createSlice } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
const initialState = {
  items: [],
  cartItems: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items || [];
      state.cartItems = action.payload.cartItems || 0;
      state.showCart = false;
    },
    addItem(state, action) {
      state.items.push(action.payload);
      state.cartItems++;
    },
    removeItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        item.quantity--;
      }

      state.cartItems--;
    },

    decrement(state) {
      state.cartItems--;
    },

    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    increaseQnty(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity++;
        state.cartItems++;
      }
    },
    decreaseQnty(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity--;
        state.cartItems--;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiReducer,
  },
});

export const cartActions = cartSlice.actions;
export default store;
