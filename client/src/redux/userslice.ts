// redux/userslice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { UserState } from "@/types";

const initialState: UserState = {
  user: null,
  loading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await api.get("/auth/user");
  return res.data; 
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("token"); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
