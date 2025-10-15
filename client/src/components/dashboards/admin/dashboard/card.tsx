import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export function KpiCards({ kpis }: { kpis: any }) {
  const data = [
    {
      title: "Today's Sales",
      value: `₹${kpis.todaySales.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      color: "bg-green-50 hover:bg-green-100",
    },
    {
      title: "Total Orders",
      value: kpis.totalOrders,
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Conversion Rate",
      value: `${kpis.conversionRate.toFixed(2)}%`,
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      title: "Avg Order Value",
      value: `₹${kpis.avgOrderValue.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 hover:bg-orange-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.map((kpi, idx) => (
        <Card key={idx} className={`${kpi.color} transition-colors`}>
          <CardHeader className="flex items-center justify-between">
            {kpi.icon}
            <div>
              <CardTitle className="text-xl font-bold">{kpi.value}</CardTitle>
              <CardDescription>{kpi.title}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
