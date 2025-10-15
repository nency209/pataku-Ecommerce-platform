import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import Link from "next/link";
import { Package, ShoppingCart, Users, Eye } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/products"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-medium">Add Product</h4>
              <p className="text-sm text-muted-foreground">
                Create new product listing
              </p>
            </div>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <ShoppingCart className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-medium">Manage Orders</h4>
              <p className="text-sm text-muted-foreground">
                Process pending orders
              </p>
            </div>
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-medium">View Customers</h4>
              <p className="text-sm text-muted-foreground">
                Manage user accounts
              </p>
            </div>
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <Eye className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-medium">Update Content</h4>
              <p className="text-sm text-muted-foreground">
                Manage site content
              </p>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
