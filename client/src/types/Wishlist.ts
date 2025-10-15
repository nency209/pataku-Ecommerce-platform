type WishlistItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt?: string; // optional if you want
};


export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}