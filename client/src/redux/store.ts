// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartslice";
import wishlistReducer from "@/redux/wishlistslice"; 
import userReducer from '@/redux/userslice';
import orderReducer from "./orderslice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, 
    user: userReducer,
     order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
