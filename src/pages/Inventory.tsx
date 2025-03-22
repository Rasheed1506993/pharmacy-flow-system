
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Filter,
  FileDown,
  ArrowUpDown,
  AlertTriangle,
  Calendar
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { supabase } from "@/integrations/supabase/client";
import { usePharmacyProfile } from "@/hooks/usePharmacyProfile";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Tables<'products'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pharmacyProfile, loading: profileLoading } = usePharmacyProfile();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (profileLoading || !pharmacyProfile) return;
      
      try {
        setIsLoading(true);
        
        // Fetch products data for this pharmacy
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('pharmacy_id', pharmacyProfile.id);
          
        if (error) throw error;
        
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products data:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات المنتجات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [pharmacyProfile, profileLoading, toast]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('ar-SA')} ر.س`;
  };
  
  // Calculate stock status
  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity <= 0) return { status: "نفذ", className: "bg-red-100 text-red-800" };
    if (quantity < minLevel * 0.5) return { status: "منخفض جداً", className: "bg-red-100 text-red-800" };
    if (quantity < minLevel) return { status: "منخفض", className: "bg-yellow-100 text-yellow-800" };
    return { status: "متوفر", className: "bg-green-100 text-green-800" };
  };
  
  // Filter products based on active tab
  const filteredProducts = products.filter(product => {
    const status = getStockStatus(product.stock_quantity, product.min_stock_level);
    if (activeTab === "all") return true;
    if (activeTab === "available") return status.status === "متوفر";
    if (activeTab === "low") return status.status === "منخفض";
    if (activeTab === "veryLow") return status.status === "منخفض جداً" || status.status === "نفذ";
    return true;
  });
  
  // Calculate statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(product => 
    product.stock_quantity < product.min_stock_level).length;
  
  const expiringProducts = products.filter(product => {
    if (!product.expiry_date) return false;
    const expiryDate = new Date(product.expiry_date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">المخزون</h1>
            <p className="text-gray-600 mt-1">إدارة المخزون والمنتجات</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" dir="rtl">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">إجمالي المنتجات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">في المخزون</p>
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-red-700">منتهية الصلاحية قريباً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-700">{expiringProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">خلال 30 يوم</p>
              </CardContent>
            </Card>
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
                    placeholder="بحث عن منتج..."
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
                  <span>تاريخ الصلاحية</span>
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  <span>تصدير</span>
                </Button>
                
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>منتج جديد</span>
                </Button>
              </div>
            </div>
            
            <div className="px-6 pt-6" dir="rtl">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="available">متوفر</TabsTrigger>
                  <TabsTrigger value="low">منخفض</TabsTrigger>
                  <TabsTrigger value="veryLow">منخفض جداً</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">رمز المنتج</TableHead>
                        <TableHead className="text-right">اسم المنتج</TableHead>
                        <TableHead className="text-right">الفئة</TableHead>
                        <TableHead className="text-right">
                          <div className="flex items-center gap-1">
                            الكمية
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">الحد الأدنى</TableHead>
                        <TableHead className="text-right">السعر</TableHead>
                        <TableHead className="text-right">تاريخ الصلاحية</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                            جاري تحميل البيانات...
                          </TableCell>
                        </TableRow>
                      ) : filteredProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                            لا توجد منتجات مطابقة للتصفية المحددة
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts.map((product, index) => {
                          const stockStatus = getStockStatus(product.stock_quantity, product.min_stock_level);
                          return (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.barcode || `PRD-${String(index + 1).padStart(3, '0')}`}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category || "-"}</TableCell>
                              <TableCell>{product.stock_quantity}</TableCell>
                              <TableCell>{product.min_stock_level}</TableCell>
                              <TableCell>{formatCurrency(product.price)}</TableCell>
                              <TableCell>
                                {product.expiry_date ? (
                                  <>
                                    {new Date(product.expiry_date).toLocaleDateString('ar-SA')}
                                    {new Date(product.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                      <AlertTriangle className="h-4 w-4 text-red-500 inline mr-1" />
                                    )}
                                  </>
                                ) : "-"}
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stockStatus.className}`}>
                                  {stockStatus.status}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart text-gray-600"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="p-6 flex items-center justify-between border-t" dir="rtl">
              <div className="text-sm text-gray-500">
                عرض {filteredProducts.length > 0 ? `1-${filteredProducts.length}` : '0'} من {products.length} منتجات
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={filteredProducts.length === 0}>السابق</Button>
                <Button variant="outline" size="sm" disabled={filteredProducts.length === 0}>التالي</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
