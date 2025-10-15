 interface CartState {
  items: any[];
  loading: boolean;
}

export const initialState: CartState = {
  items: [],
  loading: false,
}