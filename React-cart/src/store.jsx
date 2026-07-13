import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartItems: 0,
  showCart: false,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.cartItems++;
    },
    removeItem(state,action){
    const item = state.items.find((item)=> item.id === action.payload);

    state.cartItems--;
    if(item.quantity === 1){
     state.items =  state.items.filter((item)=> item.id !== action.payload);
    }else{
      state.cartItems--;
      item.quantity--;
    }
    },

    decrement(state) {
      state.cartItems--;
    },

    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    increaseQnty(state, action) {
      const item = state.items.find((item) => item.title == action.payload);
      
      if (item) {
        item.quantity++;
        state.cartItems++;
      }
    },
     decreaseQnty(state, action) {
      const item = state.items.find((item) => item.id == action.payload);
      
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
  },
});

export const cartActions = cartSlice.actions;
export default store;
