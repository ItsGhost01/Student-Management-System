import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserState {
  value: User | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
