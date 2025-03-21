// ✅ Inventory.tsx - المخزون
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const { data } = await supabase
      .from("products")
      .select("id, name, stock, min_stock, max_stock");
    setProducts(data || []);
  };

  return (
    <div className="container mx-auto py-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">المخزون</h1>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المنتج</TableHead>
              <TableHead>المخزون الحالي</TableHead>
              <TableHead>الحد الأدنى</TableHead>
              <TableHead>الحد الأعلى</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.min_stock}</TableCell>
                <TableCell>{product.max_stock}</TableCell>
                <TableCell>
                  {product.stock <= product.min_stock ? (
                    <span className="text-red-600 font-bold">منخفض</span>
                  ) : product.stock >= product.max_stock ? (
                    <span className="text-yellow-600">ممتلئ</span>
                  ) : (
                    <span className="text-green-600">مناسب</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
