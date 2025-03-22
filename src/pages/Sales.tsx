
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Layout, 
  Menu,
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  User,
  X,
  Plus,
  Filter,
  Calendar,
  FileDown,
  ArrowUpDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const Sales = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample sales data
  const salesData = [
    { 
      id: "INV-001", 
      customer: "أحمد محمد", 
      date: "05 يونيو 2023", 
      amount: "٥٥٠ ر.س", 
      status: "مكتمل",
      items: 5
    },
    { 
      id: "INV-002", 
      customer: "سارة علي", 
      date: "05 يونيو 2023", 
      amount: "١٨٠ ر.س", 
      status: "مكتمل",
      items: 2
    },
    { 
      id: "INV-003", 
      customer: "خالد عبدالله", 
      date: "04 يونيو 2023", 
      amount: "٧٥٥ ر.س", 
      status: "مكتمل",
      items: 7
    },
    { 
      id: "INV-004", 
      customer: "نورة سعد", 
      date: "04 يونيو 2023", 
      amount: "٣٢٠ ر.س", 
      status: "معلق",
      items: 3
    },
    { 
      id: "INV-005", 
      customer: "فهد محمد", 
      date: "03 يونيو 2023", 
      amount: "٤٩٠ ر.س", 
      status: "مكتمل",
      items: 4
    },
    { 
      id: "INV-006", 
      customer: "ريم أحمد", 
      date: "02 يونيو 2023", 
      amount: "٢٧٠ ر.س", 
      status: "ملغي",
      items: 2
    },
    { 
      id: "INV-007", 
      customer: "عبدالله خالد", 
      date: "01 يونيو 2023", 
      amount: "٨٩٠ ر.س", 
      status: "مكتمل",
      items: 6
    }
  ];
  
  // Filter sales based on active tab
  const filteredSales = salesData.filter(sale => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return sale.status === "مكتمل";
    if (activeTab === "pending") return sale.status === "معلق";
    if (activeTab === "canceled") return sale.status === "ملغي";
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
                      {filteredSales.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            لا توجد مبيعات مطابقة للتصفية المحددة
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSales.map((sale, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{sale.id}</TableCell>
                            <TableCell>{sale.customer}</TableCell>
                            <TableCell>{sale.date}</TableCell>
                            <TableCell>{sale.items} منتجات</TableCell>
                            <TableCell>{sale.amount}</TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                sale.status === "مكتمل" 
                                  ? "bg-green-100 text-green-800"
                                  : sale.status === "معلق"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {sale.status}
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
              <div className="text-sm text-gray-500">عرض 1-7 من 7 فواتير</div>
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

export default Sales;
