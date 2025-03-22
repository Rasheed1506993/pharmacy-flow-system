
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart,
  Package,
  Users,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav setMobileMenuOpen={setMobileMenuOpen} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-8" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-1">مرحباً بك في نظام إدارة صيدليتك!</p>
          </div>
          
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
                    { id: "INV-003", customer: "خالد عبدالله", date: "04 يونيو 2023", amount: "٧٥٥ ر.س", status: "مكتمل" },
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
