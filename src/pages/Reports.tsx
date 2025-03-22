
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Calendar, 
  FileDown,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart as Chart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  PieChart as RPieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");
  
  // Sample sales data for chart
  const salesData = [
    { name: 'يناير', sales: 12000, expenses: 8000 },
    { name: 'فبراير', sales: 19000, expenses: 9000 },
    { name: 'مارس', sales: 16000, expenses: 8500 },
    { name: 'أبريل', sales: 18000, expenses: 9500 },
    { name: 'مايو', sales: 22000, expenses: 10000 },
    { name: 'يونيو', sales: 25000, expenses: 12000 },
  ];
  
  // Sample top selling products data
  const topSellingData = [
    { name: 'باراسيتامول 500mg', value: 32 },
    { name: 'أموكسيسيلين 250mg', value: 25 },
    { name: 'فيتامين سي 1000mg', value: 20 },
    { name: 'إيبوبروفين 400mg', value: 18 },
    { name: 'زنك + فيتامين C', value: 15 },
  ];
  
  // Sample category distribution data
  const categoryData = [
    { name: 'مسكنات', value: 30 },
    { name: 'مضادات حيوية', value: 25 },
    { name: 'فيتامينات', value: 20 },
    { name: 'كريمات', value: 15 },
    { name: 'أدوية الجهاز الهضمي', value: 10 },
  ];
  
  // Sample inventory alerts data
  const inventoryAlerts = [
    { id: "PRD-001", name: "باراسيتامول 500mg", remaining: 15, min: 20, status: "منخفض" },
    { id: "PRD-002", name: "أموكسيسيلين 250mg", remaining: 8, min: 15, status: "منخفض جداً" },
    { id: "PRD-003", name: "هيدروكورتيزون 1%", remaining: 5, min: 10, status: "منخفض جداً" },
    { id: "PRD-004", name: "سيتريزين 10mg", remaining: 12, min: 15, status: "منخفض" },
    { id: "PRD-005", name: "أتورفاستاتين 20mg", remaining: 18, min: 20, status: "منخفض" }
  ];
  
  // Sample recent sales data
  const recentSales = [
    { id: "INV-001", customer: "أحمد محمد", date: "05 يونيو 2023", amount: "٥٥٠ ر.س", status: "مكتمل" },
    { id: "INV-002", customer: "سارة علي", date: "05 يونيو 2023", amount: "١٨٠ ر.س", status: "مكتمل" },
    { id: "INV-003", customer: "خالد عبدالله", date: "04 يونيو 2023", amount: "٧٥٥ ر.س", status: "مكتمل" },
    { id: "INV-004", customer: "نورة سعد", date: "04 يونيو 2023", amount: "٣٢٠ ر.س", status: "معلق" },
    { id: "INV-005", customer: "فهد محمد", date: "03 يونيو 2023", amount: "٤٩٠ ر.س", status: "مكتمل" }
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">التقارير</h1>
            <p className="text-gray-600 mt-1">تقارير وتحليلات أداء الصيدلية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" dir="rtl">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">إجمالي المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">٢٥,٥٠٠ ر.س</div>
                  <div className="ml-2 flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">مقارنة بالشهر السابق</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">متوسط قيمة الفاتورة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">١٨٥ ر.س</div>
                  <div className="ml-2 flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+5%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">مقارنة بالشهر السابق</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">عدد الفواتير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">١٦٨</div>
                  <div className="ml-2 flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">مقارنة بالشهر السابق</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">العملاء الجدد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">١٢</div>
                  <div className="ml-2 flex items-center text-red-600 text-sm">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-3%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">مقارنة بالشهر السابق</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b" dir="rtl">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-nova-600" />
                <h2 className="text-lg font-semibold text-gray-900">تقارير تفصيلية</h2>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4" />
                  <span>تصفية</span>
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                    <Calendar className="h-4 w-4" />
                    <span>الفترة</span>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    <span>تصدير</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="px-6 pt-6" dir="rtl">
              <Tabs defaultValue="sales" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sales">المبيعات</TabsTrigger>
                  <TabsTrigger value="products">المنتجات</TabsTrigger>
                  <TabsTrigger value="inventory">المخزون</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sales" className="pt-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <Chart
                        data={salesData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="المبيعات" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="المصروفات" />
                      </Chart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">آخر المبيعات</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">رقم الفاتورة</TableHead>
                          <TableHead className="text-right">العميل</TableHead>
                          <TableHead className="text-right">التاريخ</TableHead>
                          <TableHead className="text-right">المبلغ</TableHead>
                          <TableHead className="text-right">الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentSales.map((sale, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{sale.id}</TableCell>
                            <TableCell>{sale.customer}</TableCell>
                            <TableCell>{sale.date}</TableCell>
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="products" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={topSellingData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" />
                              <Tooltip />
                              <Bar dataKey="value" fill="#8884d8" name="عدد المبيعات" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>توزيع المبيعات حسب الفئة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RPieChart>
                              <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {categoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">تنبيهات المخزون</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">رمز المنتج</TableHead>
                          <TableHead className="text-right">اسم المنتج</TableHead>
                          <TableHead className="text-right">الكمية المتبقية</TableHead>
                          <TableHead className="text-right">الحد الأدنى</TableHead>
                          <TableHead className="text-right">الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventoryAlerts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.remaining}</TableCell>
                            <TableCell>{item.min}</TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                item.status === "منخفض" 
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {item.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
