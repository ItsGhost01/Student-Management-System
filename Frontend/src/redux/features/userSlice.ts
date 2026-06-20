import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}

export interface UserState {
  value: User | null;
  loading: boolean;
}

const initialState: UserState = {
  value: null,
    loading: true
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

     setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

  },
});

export const { login, logout, setLoading } = userSlice.actions;

export default userSlice.reducer;
