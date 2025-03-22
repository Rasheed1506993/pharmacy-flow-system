
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CalendarIcon, FileDown, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { supabase } from "@/integrations/supabase/client";
import { usePharmacyProfile } from "@/hooks/usePharmacyProfile";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [salesData, setSalesData] = useState<Tables<'sales'>[]>([]);
  const [productsData, setProductsData] = useState<Tables<'products'>[]>([]);
  const [saleItemsData, setSaleItemsData] = useState<Tables<'sale_items'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pharmacyProfile, loading: profileLoading } = usePharmacyProfile();
  const { toast } = useToast();
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];
  
  useEffect(() => {
    const fetchReportData = async () => {
      if (profileLoading || !pharmacyProfile) return;
      
      try {
        setIsLoading(true);
        
        // Fetch sales data
        const { data: sales, error: salesError } = await supabase
          .from('sales')
          .select('*')
          .eq('pharmacy_id', pharmacyProfile.id)
          .order('sale_date', { ascending: false });
          
        if (salesError) throw salesError;
        
        // Fetch products data
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('pharmacy_id', pharmacyProfile.id);
          
        if (productsError) throw productsError;
        
        // Fetch sale items
        const { data: saleItems, error: saleItemsError } = await supabase
          .from('sale_items')
          .select('*')
          .in('sale_id', sales?.map(sale => sale.id) || []);
          
        if (saleItemsError) throw saleItemsError;
        
        setSalesData(sales || []);
        setProductsData(products || []);
        setSaleItemsData(saleItems || []);
      } catch (error) {
        console.error('Error fetching report data:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات التقارير",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReportData();
  }, [pharmacyProfile, profileLoading, toast]);
  
  // Prepare data for charts
  const prepareSalesChartData = () => {
    if (!salesData.length) return [];
    
    // Group sales by date
    const salesByDate = salesData.reduce((acc, sale) => {
      const date = new Date(sale.sale_date).toLocaleDateString('ar-SA');
      if (!acc[date]) {
        acc[date] = { date, total: 0, count: 0 };
      }
      acc[date].total += Number(sale.final_amount);
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { date: string; total: number; count: number }>);
    
    // Convert to array and take last 7 days
    return Object.values(salesByDate).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).slice(-7);
  };
  
  const prepareTopSellingProducts = () => {
    if (!saleItemsData.length || !productsData.length) return [];
    
    // Group sales by product
    const salesByProduct = saleItemsData.reduce((acc, item) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = { 
          quantity: 0, 
          total: 0,
          productName: productsData.find(p => p.id === item.product_id)?.name || 'غير معروف'
        };
      }
      acc[item.product_id].quantity += Number(item.quantity);
      acc[item.product_id].total += Number(item.total_price);
      return acc;
    }, {} as Record<string, { quantity: number; total: number; productName: string }>);
    
    // Convert to array, sort by quantity, and take top 5
    return Object.entries(salesByProduct)
      .map(([id, data]) => ({
        id,
        name: data.productName,
        quantity: data.quantity,
        amount: data.total
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };
  
  const prepareSalesByStatus = () => {
    if (!salesData.length) return [];
    
    // Group sales by status
    const salesByStatus = salesData.reduce((acc, sale) => {
      const status = sale.payment_status || 'مكتمل';
      if (!acc[status]) {
        acc[status] = { name: status, value: 0, count: 0 };
      }
      acc[status].value += Number(sale.final_amount);
      acc[status].count += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number; count: number }>);
    
    return Object.values(salesByStatus);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('ar-SA')} ر.س`;
  };
  
  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + Number(sale.final_amount), 0);
  
  // Calculate total orders
  const totalOrders = salesData.length;
  
  // Calculate average order value
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Calculate low stock products
  const lowStockProducts = productsData.filter(
    product => product.stock_quantity < product.min_stock_level
  ).length;
  
  const salesChartData = prepareSalesChartData();
  const topSellingProducts = prepareTopSellingProducts();
  const salesByStatus = prepareSalesByStatus();
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">التقارير</h1>
            <p className="text-gray-600 mt-1">تحليل أداء الصيدلية والمبيعات</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" dir="rtl">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">إجمالي المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-nova-600">{formatCurrency(totalSales)}</div>
                <p className="text-xs text-muted-foreground mt-1">آخر 30 يوم</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">عدد الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">آخر 30 يوم</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">متوسط قيمة الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(averageOrderValue)}</div>
                <p className="text-xs text-muted-foreground mt-1">آخر 30 يوم</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-yellow-700">منتجات منخفضة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700">{lowStockProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">تحتاج إلى إعادة طلب</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b" dir="rtl">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">تقارير الأداء</h2>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>آخر 30 يوم</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  <span>تصدير</span>
                </Button>
              </div>
            </div>
            
            <div className="p-6" dir="rtl">
              <Tabs defaultValue="sales" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="sales">المبيعات</TabsTrigger>
                  <TabsTrigger value="products">المنتجات</TabsTrigger>
                  <TabsTrigger value="inventory">المخزون</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sales" className="space-y-6">
                  <div className="h-80 w-full border rounded-lg p-4">
                    <h3 className="font-medium mb-4">المبيعات اليومية - آخر 7 أيام</h3>
                    {isLoading ? (
                      <div className="h-full flex items-center justify-center">
                        جاري تحميل البيانات...
                      </div>
                    ) : salesChartData.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        لا توجد بيانات مبيعات متاحة
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="90%">
                        <LineChart
                          data={salesChartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Line type="monotone" dataKey="total" name="المبيعات" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="count" name="عدد الطلبات" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-4">حالة المبيعات</h3>
                      {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          جاري تحميل البيانات...
                        </div>
                      ) : salesByStatus.length === 0 ? (
                        <div className="h-64 flex items-center justify-center">
                          لا توجد بيانات متاحة
                        </div>
                      ) : (
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={salesByStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {salesByStatus.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-4">أكثر المنتجات مبيعاً</h3>
                      {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          جاري تحميل البيانات...
                        </div>
                      ) : topSellingProducts.length === 0 ? (
                        <div className="h-64 flex items-center justify-center">
                          لا توجد بيانات مبيعات متاحة
                        </div>
                      ) : (
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={topSellingProducts}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value, name) => [name === 'amount' ? formatCurrency(Number(value)) : value, name === 'amount' ? 'المبلغ' : 'الكمية']} />
                              <Legend />
                              <Bar dataKey="quantity" name="الكمية" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="products" className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">أكثر المنتجات مبيعاً حسب القيمة</h3>
                    {isLoading ? (
                      <div className="h-80 flex items-center justify-center">
                        جاري تحميل البيانات...
                      </div>
                    ) : topSellingProducts.length === 0 ? (
                      <div className="h-80 flex items-center justify-center">
                        لا توجد بيانات مبيعات متاحة
                      </div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={topSellingProducts}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey="amount" name="المبيعات" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">حالة المخزون</h3>
                    {isLoading ? (
                      <div className="h-80 flex items-center justify-center">
                        جاري تحميل البيانات...
                      </div>
                    ) : productsData.length === 0 ? (
                      <div className="h-80 flex items-center justify-center">
                        لا توجد بيانات منتجات متاحة
                      </div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={productsData.slice(0, 10)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="stock_quantity" name="الكمية المتوفرة" fill="#8884d8" />
                            <Bar dataKey="min_stock_level" name="الحد الأدنى" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
