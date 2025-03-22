
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Bell,
  Plus,
  Filter,
  Calendar,
  FileDown,
  ArrowUpDown
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { supabase } from "@/integrations/supabase/client";
import { usePharmacyProfile } from "@/hooks/usePharmacyProfile";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

const Sales = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [salesData, setSalesData] = useState<Tables<'sales'>[]>([]);
  const [customersData, setCustomersData] = useState<Tables<'customers'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pharmacyProfile, loading: profileLoading } = usePharmacyProfile();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSalesData = async () => {
      if (profileLoading || !pharmacyProfile) return;
      
      try {
        setIsLoading(true);
        
        // Fetch sales data for this pharmacy
        const { data: sales, error: salesError } = await supabase
          .from('sales')
          .select('*')
          .eq('pharmacy_id', pharmacyProfile.id)
          .order('sale_date', { ascending: false });
          
        if (salesError) throw salesError;
        
        // Fetch customers data to map customer names
        const { data: customers, error: customersError } = await supabase
          .from('customers')
          .select('*')
          .eq('pharmacy_id', pharmacyProfile.id);
          
        if (customersError) throw customersError;
        
        setSalesData(sales || []);
        setCustomersData(customers || []);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات المبيعات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSalesData();
  }, [pharmacyProfile, profileLoading, toast]);
  
  // Get customer name by ID
  const getCustomerName = (customerId: string | null) => {
    if (!customerId) return "عميل غير مسجل";
    const customer = customersData.find(c => c.id === customerId);
    return customer ? customer.name : "عميل غير مسجل";
  };
  
  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('ar-SA')} ر.س`;
  };
  
  // Filter sales based on active tab
  const filteredSales = salesData.filter(sale => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return sale.payment_status === "مكتمل";
    if (activeTab === "pending") return sale.payment_status === "معلق";
    if (activeTab === "canceled") return sale.payment_status === "ملغي";
    return true;
  });
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">المبيعات</h1>
            <p className="text-gray-600 mt-1">إدارة المبيعات والفواتير</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b" dir="rtl">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="بحث عن فاتورة..."
                    className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                    dir="rtl"
                  />
                </div>
                
                <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4" />
                  <span>تصفية</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                  <Calendar className="h-4 w-4" />
                  <span>التاريخ</span>
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  <span>تصدير</span>
                </Button>
                
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>فاتورة جديدة</span>
                </Button>
              </div>
            </div>
            
            <div className="px-6 pt-6" dir="rtl">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="completed">مكتمل</TabsTrigger>
                  <TabsTrigger value="pending">معلق</TabsTrigger>
                  <TabsTrigger value="canceled">ملغي</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">رقم الفاتورة</TableHead>
                        <TableHead className="text-right">العميل</TableHead>
                        <TableHead className="text-right">التاريخ</TableHead>
                        <TableHead className="text-right">المنتجات</TableHead>
                        <TableHead className="text-right">
                          <div className="flex items-center gap-1">
                            المبلغ
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            جاري تحميل البيانات...
                          </TableCell>
                        </TableRow>
                      ) : filteredSales.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            لا توجد مبيعات مطابقة للتصفية المحددة
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.invoice_number}</TableCell>
                            <TableCell>{getCustomerName(sale.customer_id)}</TableCell>
                            <TableCell>{formatDate(sale.sale_date)}</TableCell>
                            <TableCell>
                              <Button variant="link" size="sm" className="h-8 p-0 text-nova-600">
                                عرض المنتجات
                              </Button>
                            </TableCell>
                            <TableCell>{formatCurrency(sale.final_amount)}</TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                sale.payment_status === "مكتمل" 
                                  ? "bg-green-100 text-green-800"
                                  : sale.payment_status === "معلق"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {sale.payment_status || "مكتمل"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye text-gray-600"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil text-gray-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-gray-600"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="p-6 flex items-center justify-between border-t" dir="rtl">
              <div className="text-sm text-gray-500">
                عرض {filteredSales.length > 0 ? `1-${filteredSales.length}` : '0'} من {salesData.length} فواتير
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={filteredSales.length === 0}>السابق</Button>
                <Button variant="outline" size="sm" disabled={filteredSales.length === 0}>التالي</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sales;
