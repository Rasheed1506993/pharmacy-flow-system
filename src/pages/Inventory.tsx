
import { useState } from "react";
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

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample inventory data
  const inventoryData = [
    { 
      id: "PRD-001", 
      name: "باراسيتامول 500mg", 
      category: "مسكنات", 
      remaining: 15, 
      min: 20, 
      price: "١٥ ر.س",
      expiryDate: "2023-12-01",
      status: "منخفض" 
    },
    { 
      id: "PRD-002", 
      name: "أموكسيسيلين 250mg", 
      category: "مضادات حيوية", 
      remaining: 8, 
      min: 15, 
      price: "٢٥ ر.س",
      expiryDate: "2023-11-15",
      status: "منخفض جداً" 
    },
    { 
      id: "PRD-003", 
      name: "هيدروكورتيزون 1%", 
      category: "كريمات", 
      remaining: 5, 
      min: 10, 
      price: "٣٠ ر.س",
      expiryDate: "2023-10-30",
      status: "منخفض جداً" 
    },
    { 
      id: "PRD-004", 
      name: "سيتريزين 10mg", 
      category: "مضادات الحساسية", 
      remaining: 12, 
      min: 15, 
      price: "١٨ ر.س",
      expiryDate: "2024-01-15", 
      status: "منخفض" 
    },
    { 
      id: "PRD-005", 
      name: "أتورفاستاتين 20mg", 
      category: "خافضات الكوليسترول", 
      remaining: 18, 
      min: 20, 
      price: "٥٠ ر.س",
      expiryDate: "2023-12-20",
      status: "منخفض" 
    },
    { 
      id: "PRD-006", 
      name: "إيبوبروفين 400mg", 
      category: "مسكنات", 
      remaining: 45, 
      min: 20, 
      price: "١٢ ر.س",
      expiryDate: "2024-02-28",
      status: "متوفر" 
    },
    { 
      id: "PRD-007", 
      name: "ألبيوتيرول بخاخ", 
      category: "الربو", 
      remaining: 25, 
      min: 10, 
      price: "٦٠ ر.س",
      expiryDate: "2023-11-30",
      status: "متوفر" 
    }
  ];
  
  // Filter inventory based on active tab
  const filteredInventory = inventoryData.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "available") return item.status === "متوفر";
    if (activeTab === "low") return item.status === "منخفض";
    if (activeTab === "veryLow") return item.status === "منخفض جداً";
    return true;
  });

  // Calculate statistics
  const totalProducts = inventoryData.length;
  const lowStockProducts = inventoryData.filter(item => 
    item.status === "منخفض" || item.status === "منخفض جداً").length;
  const expiringProducts = inventoryData.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
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
                      {filteredInventory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                            لا توجد منتجات مطابقة للتصفية المحددة
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInventory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.remaining}</TableCell>
                            <TableCell>{item.min}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              {new Date(item.expiryDate).toLocaleDateString('ar-SA')}
                              {new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                <AlertTriangle className="h-4 w-4 text-red-500 inline ml-1" />
                              )}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                item.status === "متوفر" 
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "منخفض"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {item.status}
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
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="p-6 flex items-center justify-between border-t" dir="rtl">
              <div className="text-sm text-gray-500">عرض 1-7 من 7 منتجات</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>السابق</Button>
                <Button variant="outline" size="sm" disabled>التالي</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
