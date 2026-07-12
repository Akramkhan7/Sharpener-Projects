import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated : !!localStorage.getItem("token"),
    token : localStorage.getItem("token") || "",
    userID : localStorage.getItem("userId") || "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;