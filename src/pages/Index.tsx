
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="text-center max-w-3xl mx-auto mb-16"
      dir="rtl"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600">
        {subtitle}
      </p>
    </motion.div>
  );
};

const Index = () => {
  // Handle scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute h-1/2 w-full bg-grid-pattern"></div>
          </div>
          
          <div className="container px-6 relative z-10">
            <SectionTitle 
              title="باقات أسعار مرنة لجميع احتياجات صيدليتك"
              subtitle="اختر الباقة المناسبة لحجم صيدليتك وابدأ في الاستفادة من نظام نوفا فارم الآن"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "الأساسية",
                  price: "٩٩",
                  period: "شهرياً",
                  description: "مثالية للصيدليات الصغيرة التي تبدأ رحلتها",
                  features: [
                    "إدارة المخزون الأساسية",
                    "نقطة بيع واحدة",
                    "تقارير شهرية بسيطة",
                    "دعم فني أساسي",
                    "مستخدم واحد"
                  ],
                  cta: "ابدأ الآن",
                  popular: false
                },
                {
                  name: "الاحترافية",
                  price: "١٩٩",
                  period: "شهرياً",
                  description: "الباقة الأكثر شعبية للصيدليات المتوسطة",
                  features: [
                    "جميع مميزات الباقة الأساسية",
                    "نقاط بيع متعددة",
                    "تطبيق الأجهزة المحمولة",
                    "تقارير تفصيلية",
                    "دعم فني على مدار الساعة",
                    "حتى 5 مستخدمين"
                  ],
                  cta: "ابدأ الآن",
                  popular: true
                },
                {
                  name: "المتقدمة",
                  price: "٣٩٩",
                  period: "شهرياً",
                  description: "حل متكامل لسلاسل الصيدليات الكبيرة",
                  features: [
                    "جميع مميزات الباقة الاحترافية",
                    "إدارة فروع متعددة",
                    "تكامل التجارة الإلكترونية",
                    "نظام توصيل الطلبات",
                    "تقارير تحليلية متقدمة",
                    "دعم فني VIP",
                    "مستخدمين غير محدودين"
                  ],
                  cta: "ابدأ الآن",
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl ${
                    plan.popular 
                      ? "bg-white border-2 border-nova-500 shadow-xl scale-105 -mt-4" 
                      : "bg-white border border-gray-100 shadow-lg"
                  } overflow-hidden relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0">
                      <div className="bg-nova-500 text-white text-sm font-medium py-1 text-center">
                        الأكثر شعبية
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 pb-8" dir="rtl">
                    <h3 className={`text-xl font-bold mb-3 ${plan.popular ? "text-nova-500" : ""}`}>{plan.name}</h3>
                    <div className="mb-5">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-2">ريال سعودي / {plan.period}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg className="h-5 w-5 text-nova-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      className={`w-full py-3 rounded-lg font-medium ${
                        plan.popular 
                          ? "bg-nova-500 hover:bg-nova-600 text-white" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      } transition-colors`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-nova-50 blur-3xl opacity-50"></div>
            <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl opacity-50"></div>
          </div>
          
          <div className="container px-6 relative z-10">
            <SectionTitle 
              title="تواصل معنا"
              subtitle="نحن هنا للإجابة على استفساراتك ومساعدتك في الحصول على أفضل تجربة مع نظام نوفا فارم"
            />
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:col-span-2 bg-gradient-to-br from-nova-500 to-accent p-8 text-white">
                <div dir="rtl">
                  <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">العنوان</h4>
                        <p className="text-white/80">مبنى نوفا فارم، شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">الهاتف</h4>
                        <p className="text-white/80">+966 12 345 6789</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">البريد الإلكتروني</h4>
                        <p className="text-white/80">info@novapharma.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h4 className="font-medium mb-4">تابعنا على</h4>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Twitter size={18} />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Instagram size={18} />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-8">
                <form dir="rtl">
                  <h3 className="text-2xl font-bold mb-6">أرسل رسالة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                      placeholder="أدخل موضوع الرسالة"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent transition"
                      placeholder="أدخل نص الرسالة"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-nova-500 hover:bg-nova-600 text-white font-medium rounded-lg px-8 py-3 transition-colors"
                  >
                    إرسال
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
