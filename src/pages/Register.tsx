import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    pharmacyName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    licenseNumber: "",
    employeeCount: "",
    acceptTerms: false
  });
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null);
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (!formData.pharmacyName || !formData.ownerName || !formData.licenseNumber || !formData.address || !formData.city) {
        toast({
          variant: "destructive",
          title: "خطأ في البيانات",
          description: "الرجاء إكمال جميع الحقول المطلوبة",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "خطأ في البيانات",
          description: "الرجاء إكمال جميع الحقول المطلوبة",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "خطأ في كلمة المرور",
          description: "كلمتا المرور غير متطابقتين",
        });
        return;
      }
      
      if (formData.password.length < 6) {
        toast({
          variant: "destructive",
          title: "خطأ في كلمة المرور",
          description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        });
        return;
      }
    }
    
    if (step < 3) setStep(step + 1);
  };
  
  const handlePrevious = () => {
    if (errorMessage) setErrorMessage(null);
    if (step > 1) setStep(step - 1);
  };
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "خطأ في البيانات",
        description: "يجب الموافقة على شروط الاستخدام وسياسة الخصوصية",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      
      console.log("بدء عملية إنشاء الحساب...");
      console.log("بيانات الإدخال:", {
        email: formData.email,
        password: formData.password,
        metadata: {
          pharmacy_name: formData.pharmacyName,
          owner_name: formData.ownerName,
          phone: formData.phone
        }
      });
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            pharmacy_name: formData.pharmacyName,
            owner_name: formData.ownerName,
            phone: formData.phone,
          }
        }
      });
      
      console.log("نتيجة إنشاء الحساب:", { authData, authError });
      
      if (authError) {
        console.error("خطأ في إنشاء الحساب:", authError);
        
        if (authError.message.includes("already registered")) {
          setErrorMessage("البريد الإلكتروني مسجل بالفعل. الرجاء استخدام بريد إلكتروني آخر أو تسجيل الدخول.");
        } else if (authError.message.includes("Email signups are disabled")) {
          setErrorMessage("تسجيل المستخدمين بالبريد الإلكتروني معطل حاليًا. الرجاء الاتصال بالمسؤول.");
        } else if (authError.message.includes("Password should be")) {
          setErrorMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
        } else {
          setErrorMessage(`خطأ في إنشاء الحساب: ${authError.message}`);
        }
        return;
      }
      
      if (!authData?.user?.id) {
        console.error("لم يتم إنشاء المستخدم بشكل صحيح:", authData);
        setErrorMessage("حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.");
        return;
      }
      
      console.log("تم إنشاء الحساب بنجاح، جاري إنشاء ملف الصيدلية...");
      
      const { data: profileData, error: profileError } = await supabase
        .from('pharmacy_profiles')
        .insert([
          {
            user_id: authData.user.id,
            pharmacy_name: formData.pharmacyName,
            owner_name: formData.ownerName,
            license_number: formData.licenseNumber,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
            employee_count: parseInt(formData.employeeCount) || 0
          }
        ])
        .select();
      
      console.log("نتيجة إنشاء ملف الصيدلية:", { profileData, profileError });
      
      if (profileError) {
        console.error("خطأ في إنشاء ملف الصيدلية:", profileError);
        
        await supabase.auth.signOut();
        
        if (profileError.message.includes("duplicate key")) {
          setErrorMessage("ملف الصيدلية موجود بالفعل.");
        } else if (profileError.message.includes("violates row level security")) {
          setErrorMessage("خطأ في صلاحيات الوصول. الرجاء تسجيل الدخول أولاً.");
        } else {
          setErrorMessage(`خطأ في إنشاء ملف الصيدلية: ${profileError.message}`);
        }
        return;
      }
      
      console.log("تم إنشاء ملف الصيدلية بنجاح!");
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم إنشاء حساب الصيدلية بنجاح، يمكنك الآن تسجيل الدخول.",
      });
      
      await supabase.auth.signOut();
      
      navigate('/login');
      
    } catch (error: any) {
      console.error('خطأ غير متوقع أثناء التسجيل:', error);
      
      setErrorMessage(`حدث خطأ غير متوقع أثناء إنشاء الحساب: ${error.message || "خطأ غير معروف"}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const steps = [
    { number: 1, label: "معلومات الصيدلية" },
    { number: 2, label: "معلومات الحساب" },
    { number: 3, label: "التأكيد" }
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-nova-50/50 to-white p-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nova-100 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      </div>
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Link to="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-gradient">Nova Pharma</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">إنشاء حساب جديد</h1>
          <p className="text-gray-600" dir="rtl">أنشئ حساب صيدليتك وابدأ في إدارة أعمالك بشكل أفضل</p>
        </motion.div>
        
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center w-full max-w-md">
            {steps.map((s, i) => (
              <React.Fragment key={s.number}>
                <div 
                  className={`flex flex-col items-center z-10 ${i > 0 ? 'flex-1' : ''}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.number 
                        ? 'bg-nova-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {s.number}
                  </div>
                  <span className={`text-sm mt-2 ${
                    step >= s.number ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                
                {i < steps.length - 1 && (
                  <div 
                    className={`h-1 flex-1 ${
                      step > s.number ? 'bg-nova-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle dir="rtl">
              {step === 1 && "معلومات الصيدلية"}
              {step === 2 && "معلومات الحساب"}
              {step === 3 && "تأكيد المعلومات"}
            </CardTitle>
            <CardDescription dir="rtl">
              {step === 1 && "أدخل المعلومات الأساسية عن صيدليتك"}
              {step === 2 && "أنشئ حساب للوصول إلى نظام نوفا فارم"}
              {step === 3 && "راجع المعلومات قبل إنشاء الحساب"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent>
              {errorMessage && (
                <Alert variant="destructive" className="mb-4" dir="rtl">
                  <AlertTitle>خطأ في إنشاء الحساب</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-4" dir="rtl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pharmacyName">اسم الصيدلية</Label>
                          <Input
                            id="pharmacyName"
                            placeholder="أدخل اسم الصيدلية"
                            value={formData.pharmacyName}
                            onChange={(e) => updateFormData('pharmacyName', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ownerName">اسم المالك</Label>
                          <Input
                            id="ownerName"
                            placeholder="أدخل اسم المالك"
                            value={formData.ownerName}
                            onChange={(e) => updateFormData('ownerName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">رقم الترخيص</Label>
                          <Input
                            id="licenseNumber"
                            placeholder="أدخل رقم ترخيص الصيدلية"
                            value={formData.licenseNumber}
                            onChange={(e) => updateFormData('licenseNumber', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="employeeCount">عدد الموظفين</Label>
                          <Input
                            id="employeeCount"
                            type="number"
                            placeholder="أدخل عدد الموظفين"
                            value={formData.employeeCount}
                            onChange={(e) => updateFormData('employeeCount', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">عنوان الصيدلية</Label>
                        <Input
                          id="address"
                          placeholder="أدخل العنوان التفصيلي للصيدلية"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">المدينة</Label>
                        <Input
                          id="city"
                          placeholder="أدخل اسم المدينة"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-4" dir="rtl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="أدخل البريد الإلكتروني"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input
                            id="phone"
                            placeholder="أدخل رقم الهاتف"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">كلمة المرور</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور"
                            value={formData.password}
                            onChange={(e) => updateFormData('password', e.target.value)}
                            required
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="أعد إدخال كلمة المرور"
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                            required
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-6" dir="rtl">
                      <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                        <h3 className="font-medium text-lg mb-3">معلومات الصيدلية</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">اسم الصيدلية:</span>
                            <p className="font-medium">{formData.pharmacyName}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">اسم المالك:</span>
                            <p className="font-medium">{formData.ownerName}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">رقم الترخيص:</span>
                            <p className="font-medium">{formData.licenseNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">عدد الموظفين:</span>
                            <p className="font-medium">{formData.employeeCount}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-gray-500">العنوان:</span>
                            <p className="font-medium">{formData.address}, {formData.city}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                        <h3 className="font-medium text-lg mb-3">معلومات الحساب</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">البريد الإلكتروني:</span>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">رقم الهاتف:</span>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox 
                          id="acceptTerms" 
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => updateFormData('acceptTerms', checked)}
                          required
                        />
                        <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                          أوافق على <Link to="/terms" className="text-nova-600 hover:underline">شروط الاستخدام</Link> و <Link to="/privacy" className="text-nova-600 hover:underline">سياسة الخصوصية</Link>
                        </Label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6">
              <div className="w-full sm:w-auto order-2 sm:order-1">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                  >
                    <ChevronRight className="h-4 w-4 ml-2" />
                    السابق
                  </Button>
                )}
              </div>
              
              <div className="w-full sm:w-auto order-1 sm:order-2">
                {step < 3 ? (
                  <Button
                    type="button"
                    className="w-full sm:w-auto bg-nova-500 hover:bg-nova-600"
                    onClick={handleNext}
                  >
                    التالي
                    <ChevronLeft className="h-4 w-4 mr-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-nova-500 hover:bg-nova-600"
                    disabled={!formData.acceptTerms || isSubmitting}
                  >
                    {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-nova-600 hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
