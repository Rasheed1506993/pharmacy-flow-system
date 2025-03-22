
import { useState } from "react";
import { 
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
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

type TopNavProps = {
  setMobileMenuOpen?: (open: boolean) => void;
};

const TopNav = ({ setMobileMenuOpen }: TopNavProps) => {
  const openMobileMenu = () => {
    if (setMobileMenuOpen) {
      setMobileMenuOpen(true);
    }
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={openMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
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
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div dir="rtl">
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
                  <a href="#" className="text-sm text-nova-600 hover:underline">
                    عرض كل الإشعارات
                  </a>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-nova-100 border border-nova-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-nova-500" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div dir="rtl">
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
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
