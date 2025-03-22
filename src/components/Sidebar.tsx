
import { useState } from "react";
import { 
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: "الرئيسية", path: "/dashboard" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "المبيعات", path: "/sales" },
    { icon: <Package className="h-5 w-5" />, label: "المخزون", path: "/inventory" },
    { icon: <Users className="h-5 w-5" />, label: "العملاء", path: "/customers" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "التقارير", path: "/reports" },
    { icon: <Settings className="h-5 w-5" />, label: "الإعدادات", path: "/settings" },
  ];

  return (
    <>
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
      
      <div
        className={`fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${sidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        <div className="h-full flex flex-col">
          <div className={`flex items-center justify-between h-16 px-4 border-b ${!sidebarOpen && "lg:justify-center"}`}>
            <div className={`flex items-center ${!sidebarOpen && "lg:hidden"}`}>
              <span className="text-xl font-bold text-gradient">Nova Pharma</span>
            </div>
            
            <button
              onClick={closeMobileMenu}
              className="p-1 rounded-full text-gray-400 lg:hidden hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
            
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
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2" dir="rtl">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 group ${
                    location.pathname === item.path ? "bg-nova-50 text-nova-600" : ""
                  }`}
                >
                  <div className={`text-gray-500 group-hover:text-nova-500 ${
                    location.pathname === item.path ? "text-nova-500" : ""
                  }`}>
                    {item.icon}
                  </div>
                  {(sidebarOpen || mobileMenuOpen) && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
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
    </>
  );
};

export default Sidebar;
