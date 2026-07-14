import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
const initialState = {
  items: [],
  cartItems: 0,
  showCart: false,
};

export const sendCartData = createAsyncThunk(
  "cart/sendCartData",
  async (cart, { rejectValueWith }) => {
    try {
      const res = await fetch(
        "https://expense-tracker-a04e2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      return "Cart data sent successfully!";
    } catch (err) {
      return rejectValueWith(err.message);
    }
  },
);

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

    extraReducers: (builder) => {
      builder.addCase(sendCartData.pending, (state) => {
        state.notification = {
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        };
      })

      .addCase(sendCartData.fulfilled, (state) => {
        state.notification = {
          status: "success",
          title: "Success!",
          message: "Cart data sent successfully!",
        };
      })

      .addCase(sendCartData.rejected, (state, action) => {
        state.notification = {
          status: "error",
          title: "Error!",
          message: action.payload || "Sending cart data failed!",
        };
      })


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
