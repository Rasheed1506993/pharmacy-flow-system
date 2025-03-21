
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  // معالج تغيير البريد الإلكتروني
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("تغيير البريد الإلكتروني:", e.target.value);
    setEmail(e.target.value);
  };

  // معالج تغيير كلمة المرور
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("تغيير كلمة المرور");
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      console.log("محاولة تسجيل الدخول:", { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("خطأ في تسجيل الدخول:", error.message);
        
        // عرض رسالة خطأ أكثر ودية للمستخدم
        if (error.message.includes("Invalid login credentials")) {
          setErrorMessage("بريد إلكتروني أو كلمة مرور غير صحيحة");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMessage("لم يتم تأكيد البريد الإلكتروني بعد. يرجى التحقق من بريدك الإلكتروني");
        } else {
          setErrorMessage(`حدث خطأ أثناء تسجيل الدخول: ${error.message}`);
        }
        
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: errorMessage || error.message,
        });
      } else {
        console.log("تم تسجيل الدخول بنجاح:", data);
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بك في نظام إدارة الصيدلية",
        });
        
        // التوجيه إلى لوحة التحكم بعد تسجيل الدخول الناجح
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("خطأ غير متوقع:", err);
      setErrorMessage("حدث خطأ غير متوقع أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} dir="rtl">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-right" dir="rtl">
          {errorMessage}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={handleEmailChange}
            required
            className="h-12 text-right"
            disabled={isLoading}
            dir="rtl"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link to="/forgot-password" className="text-sm text-nova-600 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={handlePasswordChange}
              required
              className="h-12 text-right pr-3 pl-10"
              disabled={isLoading}
              dir="rtl"
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
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="text-sm text-gray-600">تذكرني</Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-nova-500 hover:bg-nova-600"
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-nova-600 hover:underline font-medium">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
