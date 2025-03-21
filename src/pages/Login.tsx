
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("صفحة تسجيل الدخول تم تحميلها");
    // التحقق من حالة الجلسة الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("حالة الجلسة:", session);
      // إذا كان المستخدم مسجل الدخول، يتم توجيهه إلى لوحة التحكم
      if (session) {
        console.log("المستخدم مسجل الدخول بالفعل، توجيه إلى لوحة التحكم");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <AuthLayout footerLink={{ text: "العودة إلى الصفحة الرئيسية", to: "/" }}>
      <AuthHeader 
        title="تسجيل الدخول"
        subtitle="أدخل بيانات حسابك للوصول إلى لوحة التحكم"
      />
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
