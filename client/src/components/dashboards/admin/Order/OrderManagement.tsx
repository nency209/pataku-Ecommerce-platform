"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import io from "socket.io-client";
import api from "@/utils/api";
import { Order } from "@/types";
import Image from "next/image";
const socket = io("http://localhost:8000");

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();

    socket.on("new_order", (order: Order) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderUpdated", (order: Order) => {
      setOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
    });

    socket.on("orderDeleted", (id: string) => {
      setOrders((prev) => prev.filter((o) => o._id !== id));
    });

    return () => {
      socket.off("new_order");
      socket.off("orderUpdated");
      socket.off("orderDeleted");
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/orders/${id}`);
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.paymentStatus === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Orders Management</h1>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">paid</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Payment</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">{order.customer.firstName}</td>
                    <td className="p-2">
                      <ul className="list-disc pl-4">
                        {order.items?.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </ul>
                    </td>

                    <td
                      className={`p-2 font-medium ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </td>
                    <td className="p-2">₹{order.totals.subtotal}</td>
                    <td className="p-2 space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDrawer(true);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found</p>
          )}
        </CardContent>
      </Card>

      {/* Order Drawer */}
      <Dialog open={showOrderDrawer} onOpenChange={setShowOrderDrawer}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2">
              <p>
                <b>Order ID:</b> {selectedOrder._id}
              </p>
              <p>
                <b>Customer:</b> {selectedOrder.customer.firstName} (
                {selectedOrder.customer.email})
              </p>
              <p>
                <b>Payment:</b>{" "}
                <span
                  className={
                    selectedOrder.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedOrder.paymentStatus}
                </span>
              </p>
              <p>
                <b>Total:</b>${selectedOrder.totals.subtotal}
              </p>
              <div>
                <b>Items:</b>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Image
                        src={item.product.image ?? "/placeholder.png"}
                        width={48}
                        height={48}
                        alt={item.product.name}
                        className="w-12 h-12 rounded border"
                      />
                      
                      <span>
                        {item.product.name} — {item.quantity} pcs @$
                        {item.product.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
