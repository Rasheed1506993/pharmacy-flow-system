import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("صفحة تسجيل الدخول تم تحميلها");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("حالة الجلسة:", session);
      if (session) {
        console.log("المستخدم مسجل الدخول بالفعل، توجيه إلى لوحة التحكم");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("خطأ في تسجيل الدخول:", error.message);
        const friendlyMessage = error.message.includes("Invalid login credentials")
          ? "بريد إلكتروني أو كلمة مرور غير صحيحة"
          : error.message.includes("Email not confirmed")
          ? "لم يتم تأكيد البريد الإلكتروني بعد. يرجى التحقق من بريدك الإلكتروني"
          : `حدث خطأ أثناء تسجيل الدخول: ${error.message}`;

        setErrorMessage(friendlyMessage);
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: friendlyMessage,
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بك في نظام إدارة الصيدلية",
        });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-nova-50/50 to-white p-4 relative">
      {/* خلفية الحركات */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nova-100 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      </div>

      {/* نموذج تسجيل الدخول */}
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden relative z-10"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-gradient">Nova Pharma</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-2" dir="rtl">تسجيل الدخول</h1>
              <p className="text-gray-600" dir="rtl">أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-right" dir="rtl">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} dir="rtl">
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
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-600 hover:text-nova-500 transition-colors">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;