import { checkoutPageMetadata } from "@/constants/metadata";
import CheckoutPage from "@/components/checkout/checkout";

export const metadata = checkoutPageMetadata;

export default function checkoutPage() {
  return <CheckoutPage />;
}
