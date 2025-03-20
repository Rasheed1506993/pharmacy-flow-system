
import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  ShoppingCart, 
  Smartphone,
  SyncIcon,
  Truck,
  ScrollText,
  Pill,
  GitMerge,
  Clock,
  Zap,
  AreaChart,
  DollarSign,
  Store,
  User,
  Globe,
  Languages
} from "lucide-react";

const featureSections = [
  {
    title: "إدارة شاملة للصيدلية",
    description: "مجموعة كاملة من الأدوات لإدارة جميع جوانب عمليات الصيدلية بسهولة",
    icon: <Store className="h-12 w-12 text-nova-500" />,
    features: [
      "إصدار فواتير المبيعات والمشتريات بمرونة ودقة",
      "متابعة حركة المبيعات العامة ومبيعات شركات الأدوية المختلفة",
      "ضبط الأرصدة ومراقبة التغيرات في الكلفة",
      "تقارير محاسبية، مستودعية، وإدارية تفصيلية واحترافية"
    ]
  },
  {
    title: "واجهات سهلة وتقارير متنوعة",
    description: "واجهة مستخدم مبسطة مع تقارير متنوعة تلبي كافة احتياجاتك",
    icon: <BarChart3 className="h-12 w-12 text-nova-500" />,
    features: [
      "واجهات مستخدم مريحة وسهلة الاستخدام",
      "تقارير متنوعة تشمل الجوانب المحاسبية",
      "تقارير مستودعية شاملة ودقيقة",
      "تقارير إدارية لتحسين اتخاذ القرار"
    ]
  },
  {
    title: "دعم الأجهزة المحمولة والتجارة الإلكترونية",
    description: "امتداد لصيدليتك على الأجهزة المحمولة ومنصات التجارة الإلكترونية",
    icon: <Smartphone className="h-12 w-12 text-nova-500" />,
    features: [
      "تطبيقات محمولة لتسهيل إدارة العمليات",
      "التكامل مع مواقع التجارة الإلكترونية",
      "مزامنة الأصناف والعملاء والطلبيات",
      "وصول سريع للبيانات من أي مكان"
    ]
  },
  {
    title: "مزامنة البيانات بين الفروع",
    description: "مزامنة سلسة للبيانات بين مختلف فروع الصيدلية",
    icon: <SyncIcon className="h-12 w-12 text-nova-500" />,
    features: [
      "مزامنة البيانات بين فروع الصيدلية المختلفة",
      "الحصول على تقارير خاصة بكل فرع",
      "إدارة موحدة لجميع الفروع",
      "تحديثات فورية عبر جميع المنصات"
    ]
  }
];

const FeatureCard = ({ title, description, icon, features, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl hover:border-nova-100 transition-all duration-300"
    >
      <div className="p-6">
        <div className="p-3 bg-nova-50 rounded-xl w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2" dir="rtl">{title}</h3>
        <p className="text-gray-600 mb-6" dir="rtl">{description}</p>
        
        <ul className="space-y-3" dir="rtl">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-nova-500"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 inset-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-nova-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
            dir="rtl"
          >
            <span className="text-gradient">المميزات الرئيسية</span> لنظام نوفا فارم
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
            dir="rtl"
          >
            مجموعة متكاملة من الحلول الاحترافية التي تساهم في أتمتة سير العمل داخل الصيدلية بشكل فعّال
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureSections.map((section, index) => (
            <FeatureCard key={index} {...section} index={index} />
          ))}
        </div>
        
        {/* Second feature set in a different style */}
        <div className="mt-24 max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-12 text-center"
            dir="rtl"
          >
            مميزات إضافية تجعل من <span className="text-gradient">نوفا فارم</span> الخيار الأمثل
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Truck className="h-8 w-8 text-nova-500" />,
                title: "نظام توصيل الطلبات",
                description: "تسليم وتتبع طلبيات العملاء مع مشاركة الموقع"
              },
              { 
                icon: <ScrollText className="h-8 w-8 text-nova-500" />,
                title: "متوافق مع الأنظمة الضريبية",
                description: "نظام محاسبي معتمد من الهيئات الحكومية"
              },
              { 
                icon: <Pill className="h-8 w-8 text-nova-500" />,
                title: "إدارة المواد والأصناف",
                description: "تصنيف ومراقبة الأدوية وتعدد الوحدات والباركودات"
              },
              { 
                icon: <GitMerge className="h-8 w-8 text-nova-500" />,
                title: "شجرة الأدوية والبدائل",
                description: "تصنيف الأدوية وعرض البدائل المتاحة في المخزون"
              },
              { 
                icon: <Clock className="h-8 w-8 text-nova-500" />,
                title: "نظام الصلاحية والباركود",
                description: "تنبيهات انتهاء الصلاحية وتسريع عمليات البيع"
              },
              { 
                icon: <Zap className="h-8 w-8 text-nova-500" />,
                title: "مراقبة المخزون والتنبيهات",
                description: "متابعة الأرصدة وتوليد طلبيات جديدة تلقائياً"
              },
              { 
                icon: <AreaChart className="h-8 w-8 text-nova-500" />,
                title: "تقارير إحصائية تفصيلية",
                description: "تقارير تحليلية عن حركة الأدوية والمبيعات"
              },
              { 
                icon: <DollarSign className="h-8 w-8 text-nova-500" />,
                title: "مقارنة عروض الأسعار",
                description: "مقارنة وتحديث أسعار شركات الأدوية بسرعة"
              },
              { 
                icon: <ShoppingCart className="h-8 w-8 text-nova-500" />,
                title: "نقاط البيع بمزايا متقدمة",
                description: "دعم كافة وسائل الدفع وبرامج الولاء للعملاء"
              },
              { 
                icon: <Store className="h-8 w-8 text-nova-500" />,
                title: "تطبيق مدير المستودع",
                description: "إدارة الجرد والمخزون على الأجهزة المحمولة"
              },
              { 
                icon: <User className="h-8 w-8 text-nova-500" />,
                title: "تطبيق السائقين",
                description: "متابعة السائقين مباشرة على خرائط جوجل"
              },
              { 
                icon: <Globe className="h-8 w-8 text-nova-500" />,
                title: "التكامل مع التجارة الإلكترونية",
                description: "مزامنة الأصناف والعملاء مع موقعك الإلكتروني"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow hover:shadow-md hover:bg-white transition-all duration-300"
                dir="rtl"
              >
                <div className="p-2 bg-nova-50 rounded-lg w-fit mb-3">
                  {feature.icon}
                </div>
                <h4 className="text-base font-bold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Multilingual Support and Supabase Callout */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-nova-500 to-accent rounded-2xl p-8 shadow-xl text-white"
            dir="rtl"
          >
            <div className="mb-4">
              <Languages className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">دعم اللغتين العربية والإنجليزية</h3>
              <p className="text-white/90">
                استمتع بتجربة مستخدم متكاملة مع واجهة متعددة اللغات تناسب جميع المستخدمين وتلبي احتياجاتهم.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
            dir="rtl"
          >
            <div className="mb-4">
              <div className="h-12 w-12 mb-4 bg-white/10 rounded-lg p-2">
                <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <path d="M21.5832 0H2.41683C1.0835 0 0 1.0835 0 2.41683V21.5832C0 22.9165 1.0835 24 2.41683 24H21.5832C22.9165 24 24 22.9165 24 21.5832V2.41683C24 1.0835 22.9165 0 21.5832 0Z" fill="white"/>
                  <path d="M2.89697 12.7183L10.8484 20.6698C10.9414 20.7628 11.0425 20.8558 11.1355 20.9487C13.3648 23.178 17.0208 23.178 19.2501 20.9487C21.4794 18.7194 21.4794 15.0635 19.2501 12.8342L12.2098 5.79384C9.98054 3.56456 6.32459 3.56456 4.09531 5.79384C1.86603 8.02312 1.86603 11.6791 4.09531 13.9083L11.1616 20.9747" stroke="url(#paint0_linear_77_2)" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_77_2" x1="2.89697" y1="12.7183" x2="19.2501" y2="12.7183" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3ECF8E"/>
                      <stop offset="1" stopColor="#3ECF8E" stopOpacity="0.25"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">استضافة قاعدة بيانات آمنة</h3>
              <p className="text-white/90">
                استضافة Supabase كحل قاعدة بيانات موثوق ومتكامل لدعم الأمان والسرعة في التعامل مع بيانات صيدليتك.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
