import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";
import {OrderState,Order} from "@/types";

export const initialState:OrderState={
  orders: [],
  loading: false,
  error: null,
}

// 🔹 Async thunk to create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders/create", orderData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to create order");
    }
  }
);

// 🔹 Async thunk to fetch all orders (admin)
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch orders");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.orders.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default orderSlice.reducer;
