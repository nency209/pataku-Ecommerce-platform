import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { Order } from "@/types";

export function OrderStatus({ orders }: { orders: Order[] }) {
  const orderStatusData = [
    {
      name: "Paid",
      value: orders.filter((o) => o.paymentStatus === "paid").length,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: orders.filter((o) => o.paymentStatus === "pending").length,
      color: "#F59E0B",
    },
    {
      name: "Processing",
      value: orders.filter((o) => o.status === "processing").length,
      color: "#3B82F6",
    },
    {
      name: "Shipped",
      value: orders.filter((o) => o.status === "shipped").length,
      color: "#8B5CF6",
    },
    {
      name: "Cancelled",
      value: orders.filter((o) => o.status === "cancelled").length,
      color: "#EF4444",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Distribution of current orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-3">
          {orderStatusData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <span>{item.name}</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${
                      orders.length ? (item.value / orders.length) * 100 : 0
                    }%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
