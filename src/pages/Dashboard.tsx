
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
  Activity
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: "الرئيسية", path: "/dashboard" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "المبيعات", path: "/dashboard/sales" },
    { icon: <Package className="h-5 w-5" />, label: "المخزون", path: "/dashboard/inventory" },
    { icon: <Users className="h-5 w-5" />, label: "العملاء", path: "/dashboard/customers" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "التقارير", path: "/dashboard/reports" },
    { icon: <Settings className="h-5 w-5" />, label: "الإعدادات", path: "/dashboard/settings" },
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Sidebar for desktop */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${sidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className={`flex items-center justify-between h-16 px-4 border-b ${!sidebarOpen && "lg:justify-center"}`}>
            <div className={`flex items-center ${!sidebarOpen && "lg:hidden"}`}>
              <span className="text-xl font-bold text-gradient">Nova Pharma</span>
            </div>
            
            {/* Close button on mobile */}
            <button
              onClick={closeMobileMenu}
              className="p-1 rounded-full text-gray-400 lg:hidden hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Toggle sidebar button on desktop */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Sidebar menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2" dir="rtl">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 group ${
                    index === 0 ? "bg-nova-50 text-nova-600" : ""
                  }`}
                >
                  <div className="text-gray-500 group-hover:text-nova-500">
                    {item.icon}
                  </div>
                  {(sidebarOpen || mobileMenuOpen) && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Sidebar footer */}
          <div className={`p-4 border-t ${!sidebarOpen && "lg:px-2"}`}>
            <button
              className={`flex items-center gap-3 w-full py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
                !sidebarOpen && "lg:justify-center"
              }`}
              dir="rtl"
            >
              <LogOut className="h-5 w-5 text-gray-500" />
              {(sidebarOpen || mobileMenuOpen) && (
                <span className="text-sm font-medium">تسجيل الخروج</span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="h-16 px-4 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Search bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="بحث..."
                  className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                  dir="rtl"
                />
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-full text-gray-400 hover:bg-gray-100">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80" dir="rtl">
                  <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-nova-100 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-5 w-5 text-nova-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">تنبيه مخزون</p>
                          <p className="text-xs text-gray-500">
                            الرصيد المتبقي من دواء "باراسيتامول" أقل من الحد الأدنى.
                          </p>
                          <p className="text-xs text-gray-400 mt-1">منذ 30 دقيقة</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center">
                    <Link to="#" className="text-sm text-nova-600 hover:underline">
                      عرض كل الإشعارات
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-nova-100 border border-nova-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-nova-500" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" dir="rtl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">محمد أحمد</span>
                      <span className="text-xs text-gray-500">admin@example.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="ml-2 h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="ml-2 h-4 w-4" />
                    <span>الإعدادات</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="ml-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Page header */}
          <div className="mb-8" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-1">مرحباً بك في نظام إدارة صيدليتك!</p>
          </div>
          
          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "إجمالي المبيعات", value: "٢٤,٥٠٠ ر.س", change: "+12%", icon: <ShoppingCart className="h-8 w-8 text-white" />, color: "bg-gradient-to-r from-blue-500 to-blue-600" },
              { title: "عدد الطلبات", value: "١٦٨", change: "+5%", icon: <Package className="h-8 w-8 text-white" />, color: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
              { title: "العملاء الجدد", value: "١٢", change: "+18%", icon: <Users className="h-8 w-8 text-white" />, color: "bg-gradient-to-r from-violet-500 to-violet-600" },
              { title: "أدوية منتهية الصلاحية", value: "٨", change: "-3%", icon: <Activity className="h-8 w-8 text-white" />, color: "bg-gradient-to-r from-red-500 to-red-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6" dir="rtl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      <span className={`inline-block mt-2 text-xs font-medium py-1 px-2 rounded-full ${
                        stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {stat.change} من الشهر السابق
                      </span>
                    </div>
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Inventory section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b" dir="rtl">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">الأدوية منخفضة المخزون</h2>
                <Button variant="ghost" className="text-nova-600 hover:text-nova-700 hover:bg-nova-50">
                  عرض الكل
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      اسم الدواء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكمية المتبقية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحد الأدنى
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراء
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: "باراسيتامول 500mg", remaining: 15, min: 20, status: "منخفض" },
                    { name: "أموكسيسيلين 250mg", remaining: 8, min: 15, status: "منخفض جداً" },
                    { name: "هيدروكورتيزون 1%", remaining: 5, min: 10, status: "منخفض جداً" },
                    { name: "سيتريزين 10mg", remaining: 12, min: 15, status: "منخفض" },
                    { name: "أتورفاستاتين 20mg", remaining: 18, min: 20, status: "منخفض" }
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.remaining}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.min}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === "منخفض" 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-nova-600 hover:text-nova-700 hover:underline">
                          طلب كمية
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent sales section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b" dir="rtl">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">آخر المبيعات</h2>
                <Button variant="ghost" className="text-nova-600 hover:text-nova-700 hover:bg-nova-50">
                  عرض الكل
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم الفاتورة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: "INV-001", customer: "أحمد محمد", date: "05 يونيو 2023", amount: "٥٥٠ ر.س", status: "مكتمل" },
                    { id: "INV-002", customer: "سارة علي", date: "05 يونيو 2023", amount: "١٨٠ ر.س", status: "مكتمل" },
                    { id: "INV-003", customer: "خالد عبدالله", date: "04 يونيو 2023", amount: "٧٦٥ ر.س", status: "مكتمل" },
                    { id: "INV-004", customer: "نورة سعد", date: "04 يونيو 2023", amount: "٣٢٠ ر.س", status: "معلق" },
                    { id: "INV-005", customer: "فهد محمد", date: "03 يونيو 2023", amount: "٤٩٠ ر.س", status: "مكتمل" }
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === "مكتمل" 
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
