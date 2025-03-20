
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container px-6" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-gradient">Nova Pharma</span>
            </Link>
            <p className="text-gray-600 mb-6">
              نظام إدارة صيدليات متكامل يوفر حلولاً شاملة لجميع احتياجات صيدليتك.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-nova-500 hover:text-white hover:border-nova-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-nova-500 hover:text-white hover:border-nova-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-nova-500 hover:text-white hover:border-nova-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-nova-500 hover:text-white hover:border-nova-500 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-600 hover:text-nova-500 transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="#features" className="text-gray-600 hover:text-nova-500 transition-colors">المميزات</Link>
              </li>
              <li>
                <Link to="#pricing" className="text-gray-600 hover:text-nova-500 transition-colors">الأسعار</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-nova-500 transition-colors">تسجيل الدخول</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-nova-500 transition-colors">إنشاء حساب</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-nova-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  مبنى نوفا فارم، شارع الملك فهد، الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-nova-500 h-5 w-5 flex-shrink-0" />
                <span className="text-gray-600">+966 12 345 6789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-nova-500 h-5 w-5 flex-shrink-0" />
                <span className="text-gray-600">info@novapharma.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">النشرة البريدية</h3>
            <p className="text-gray-600 mb-4">
              اشترك في نشرتنا البريدية للحصول على آخر الأخبار والتحديثات.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
              />
              <button 
                type="submit" 
                className="bg-nova-500 hover:bg-nova-600 text-white font-medium rounded-lg px-4 py-3 transition"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} Nova Pharma. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
