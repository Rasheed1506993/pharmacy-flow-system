// ✅ Sales.tsx - صفحة المبيعات
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("sales")
        .select("*, customers(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setSales(data);
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في تحميل المبيعات" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">إدارة المبيعات</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم العملية</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الخصم</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center">لا توجد مبيعات</TableCell></TableRow>
              ) : (
                sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.customers?.name || "-"}</TableCell>
                    <TableCell>{sale.total_amount} ر.س</TableCell>
                    <TableCell>{sale.discount} ر.س</TableCell>
                    <TableCell>{sale.payment_method}</TableCell>
                    <TableCell>{sale.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Sales;