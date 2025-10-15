import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
} from "recharts";
import { Product } from "@/types";

export function TopProducts({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Products with highest sales</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={products}
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Sales trend */}
            <Area
              type="monotone"
              dataKey="sales"
              fill="#8884d8"
              stroke="#8884d8"
              fillOpacity={0.3}
            />

            {/* Sales bar */}
            <Bar dataKey="sales" barSize={30} fill="#413ea0" />

            {/* Revenue line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 5, fill: "red" }}
            />

            {/* Count line */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
