
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Settings as SettingsIcon,
  User,
  Store,
  CreditCard,
  Users,
  Shield,
  Bell,
  Save
} from "lucide-react";
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

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6" dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
            <p className="text-gray-600 mt-1">إدارة إعدادات النظام والحساب</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 flex items-center border-b" dir="rtl">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-nova-600" />
                <h2 className="text-lg font-semibold text-gray-900">إعدادات النظام</h2>
              </div>
            </div>
            
            <div className="p-6" dir="rtl">
              <Tabs defaultValue="profile" onValueChange={setActiveTab}>
                <div className="flex">
                  <div className="w-64 flex-shrink-0 border-l">
                    <div className="pr-6">
                      <h3 className="font-medium text-gray-900 mb-3">عام</h3>
                      <nav className="flex flex-col space-y-1">
                        <TabsTrigger value="profile" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <User className="h-4 w-4 ml-2" />
                          <span>الملف الشخصي</span>
                        </TabsTrigger>
                        <TabsTrigger value="pharmacy" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <Store className="h-4 w-4 ml-2" />
                          <span>بيانات الصيدلية</span>
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <CreditCard className="h-4 w-4 ml-2" />
                          <span>الدفع والفواتير</span>
                        </TabsTrigger>
                      </nav>
                      
                      <h3 className="font-medium text-gray-900 mb-3 mt-6">إدارة</h3>
                      <nav className="flex flex-col space-y-1">
                        <TabsTrigger value="team" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <Users className="h-4 w-4 ml-2" />
                          <span>أعضاء الفريق</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <Shield className="h-4 w-4 ml-2" />
                          <span>الأمان وكلمة المرور</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="justify-start px-3 py-2 text-sm data-[state=inactive]:bg-transparent">
                          <Bell className="h-4 w-4 ml-2" />
                          <span>الإشعارات</span>
                        </TabsTrigger>
                      </nav>
                    </div>
                  </div>
                  
                  <div className="flex-1 pr-6 pl-6">
                    <TabsContent value="profile" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">الملف الشخصي</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            تحديث المعلومات الشخصية وبيانات حسابك.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-medium">
                              الاسم
                            </label>
                            <input
                              id="name"
                              type="text"
                              defaultValue="محمد أحمد"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium">
                              البريد الإلكتروني
                            </label>
                            <input
                              id="email"
                              type="email"
                              defaultValue="admin@example.com"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="phone" className="text-sm font-medium">
                              رقم الهاتف
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              defaultValue="05xxxxxxxx"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="role" className="text-sm font-medium">
                              المسمى الوظيفي
                            </label>
                            <input
                              id="role"
                              type="text"
                              defaultValue="مدير الصيدلية"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <label htmlFor="bio" className="text-sm font-medium">
                            نبذة تعريفية
                          </label>
                          <textarea
                            id="bio"
                            defaultValue="مدير صيدلية ذو خبرة في إدارة الصيدليات وضمان جودة الخدمة للعملاء."
                            className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-nova-500"
                            dir="rtl"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            <span>حفظ التغييرات</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pharmacy" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">بيانات الصيدلية</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            إدارة معلومات وإعدادات الصيدلية.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label htmlFor="pharmacy-name" className="text-sm font-medium">
                              اسم الصيدلية
                            </label>
                            <input
                              id="pharmacy-name"
                              type="text"
                              defaultValue="صيدلية نوفا"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="license" className="text-sm font-medium">
                              رقم الترخيص
                            </label>
                            <input
                              id="license"
                              type="text"
                              defaultValue="PHM-12345"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="pharmacy-phone" className="text-sm font-medium">
                              رقم الهاتف
                            </label>
                            <input
                              id="pharmacy-phone"
                              type="tel"
                              defaultValue="05xxxxxxxx"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="pharmacy-email" className="text-sm font-medium">
                              البريد الإلكتروني
                            </label>
                            <input
                              id="pharmacy-email"
                              type="email"
                              defaultValue="contact@novapharma.com"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                              dir="rtl"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <label htmlFor="address" className="text-sm font-medium">
                            العنوان
                          </label>
                          <textarea
                            id="address"
                            defaultValue="حي النزهة، شارع الملك فهد، الرياض، المملكة العربية السعودية"
                            className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-nova-500"
                            dir="rtl"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            <span>حفظ التغييرات</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="billing" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">الدفع والفواتير</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            إدارة طرق الدفع وبيانات الفواتير.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-medium mb-2">الخطة الحالية</h4>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-nova-600 font-semibold">الخطة الاحترافية</p>
                              <p className="text-sm text-gray-500">تجديد في 01/07/2023</p>
                            </div>
                            <Button variant="outline">تغيير الخطة</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">طرق الدفع</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-14 bg-gray-200 rounded flex items-center justify-center text-gray-700 font-medium">
                                  VISA
                                </div>
                                <div>
                                  <p className="font-medium">Visa ••••4242</p>
                                  <p className="text-sm text-gray-500">تنتهي في 12/2025</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-gray-500">تعديل</Button>
                                <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                              </div>
                            </div>
                            
                            <Button variant="outline">إضافة طريقة دفع</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">بيانات الفاتورة</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <label htmlFor="billing-name" className="text-sm font-medium">
                                الاسم
                              </label>
                              <input
                                id="billing-name"
                                type="text"
                                defaultValue="محمد أحمد"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                                dir="rtl"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label htmlFor="tax-id" className="text-sm font-medium">
                                الرقم الضريبي
                              </label>
                              <input
                                id="tax-id"
                                type="text"
                                defaultValue="300xxxxxxx"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                                dir="rtl"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            <span>حفظ التغييرات</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="team" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">أعضاء الفريق</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            إدارة أعضاء فريق الصيدلية والصلاحيات.
                          </p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد الإلكتروني</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدور</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">محمد أحمد</td>
                                <td className="px-4 py-3 text-sm text-gray-500">admin@example.com</td>
                                <td className="px-4 py-3 text-sm text-gray-500">مدير</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                    نشط
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <Button variant="ghost" size="sm">تعديل</Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">خالد محمود</td>
                                <td className="px-4 py-3 text-sm text-gray-500">khalid@example.com</td>
                                <td className="px-4 py-3 text-sm text-gray-500">صيدلي</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                    نشط
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <Button variant="ghost" size="sm">تعديل</Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">سارة علي</td>
                                <td className="px-4 py-3 text-sm text-gray-500">sara@example.com</td>
                                <td className="px-4 py-3 text-sm text-gray-500">محاسب</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                    نشط
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <Button variant="ghost" size="sm">تعديل</Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>إضافة عضو جديد</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">الأمان وكلمة المرور</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            تغيير كلمة المرور وإعدادات الأمان.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">تغيير كلمة المرور</h4>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label htmlFor="current-password" className="text-sm font-medium">
                                كلمة المرور الحالية
                              </label>
                              <input
                                id="current-password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                                dir="rtl"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label htmlFor="new-password" className="text-sm font-medium">
                                كلمة المرور الجديدة
                              </label>
                              <input
                                id="new-password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                                dir="rtl"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <label htmlFor="confirm-password" className="text-sm font-medium">
                                تأكيد كلمة المرور الجديدة
                              </label>
                              <input
                                id="confirm-password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-500"
                                dir="rtl"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">المصادقة الثنائية</h4>
                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                              <p className="font-medium">المصادقة الثنائية</p>
                              <p className="text-sm text-gray-500">تأمين حسابك بخطوة تحقق إضافية</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-gray-200">
                              <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            <span>حفظ التغييرات</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="mt-0 border-0 p-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">الإشعارات</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            إدارة إعدادات الإشعارات والتنبيهات.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">تنبيهات البريد الإلكتروني</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">تنبيهات المخزون</p>
                                <p className="text-sm text-gray-500">تلقي تنبيهات عندما ينخفض مخزون المنتجات</p>
                              </div>
                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-nova-600">
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">تقارير المبيعات</p>
                                <p className="text-sm text-gray-500">استلام تقارير أسبوعية عن المبيعات</p>
                              </div>
                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-nova-600">
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">تنبيهات انتهاء الصلاحية</p>
                                <p className="text-sm text-gray-500">تلقي تنبيهات عن المنتجات التي تقترب من انتهاء الصلاحية</p>
                              </div>
                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-nova-600">
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">تنبيهات داخل النظام</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">طلبات العملاء</p>
                                <p className="text-sm text-gray-500">تلقي تنبيهات عند وجود طلبات جديدة</p>
                              </div>
                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-nova-600">
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">تحديثات النظام</p>
                                <p className="text-sm text-gray-500">تلقي تنبيهات عند توفر تحديثات للنظام</p>
                              </div>
                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-500 bg-gray-200">
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            <span>حفظ التغييرات</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
