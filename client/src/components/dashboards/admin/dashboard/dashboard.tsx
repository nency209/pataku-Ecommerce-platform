"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Order, Product } from "@/types";

// Components
import { KpiCards ,RevenueChart,OrderStatus ,TopProducts,RecentOrders ,QuickActions} from "./index";


export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [kpis, setKpis] = useState({
    todaySales: 0,
    totalOrders: 0,
    conversionRate: 0,
    avgOrderValue: 0,
  });
  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number }[]
  >([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      const data: Order[] = res.data;
      setOrders(data);

      // KPI logic
      const today = new Date().toDateString();
      const todayOrders = data.filter(
        (o) => new Date(o.createdAt).toDateString() === today
      );
      const todaySales = todayOrders.reduce(
        (sum, o) => sum + o.totals.subtotal,
        0
      );
      const totalOrders = data.length;
      const avgOrderValue = totalOrders
        ? data.reduce((sum, o) => sum + o.totals.subtotal, 0) / totalOrders
        : 0;
      const conversionRate = totalOrders
        ? (todayOrders.length / totalOrders) * 100
        : 0;

      setKpis({ todaySales, totalOrders, avgOrderValue, conversionRate });

      // Revenue data by month
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        revenue: 0,
      }));

      data.forEach((o) => {
        const monthIndex = new Date(o.createdAt).getMonth();
        months[monthIndex].revenue += o.totals.subtotal;
      });

      setRevenueData(months);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance
        </p>
      </div>

      {/* KPIs */}
      <KpiCards kpis={kpis} />

      {/* Revenue */}
      <RevenueChart data={revenueData} />

      {/* Status, Products, Orders */}
      <div className="grid gap-6 lg:grid-cols-3">
        <OrderStatus orders={orders} />
        <TopProducts products={products} />
        <RecentOrders orders={orders} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
