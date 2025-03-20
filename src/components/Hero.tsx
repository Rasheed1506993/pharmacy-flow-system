
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Simple parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(scrollY / 700, 1);
      const translateY = scrollY * 0.3;
      
      heroRef.current.style.opacity = String(opacity);
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nova-50/50 to-background z-0"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-nova-100 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-nova-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      {/* Content container */}
      <div 
        ref={heroRef}
        className="container relative z-10 px-6 pt-10 pb-24"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/80 backdrop-blur-sm border border-nova-100 text-nova-600 text-sm font-medium mb-6">
              نظام إدارة الصيدليات الأكثر تطوراً
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
            dir="rtl"
          >
            أتمتة سير العمل في صيدليتك بشكل ذكي مع{" "}
            <span className="text-gradient whitespace-nowrap">نوفا فارم</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10"
            dir="rtl"
          >
            نظام متكامل يوفر لك مجموعة من الحلول الاحترافية لإدارة صيدليتك بكفاءة عالية،
            مع تحسين الأداء الداخلي وتوفير تجربة عمل متميزة لعملائك.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            dir="rtl"
          >
            <Button asChild size="lg" className="bg-nova-500 hover:bg-nova-600 text-white font-medium px-8 h-12 shadow-lg shadow-nova-500/20 transition-all duration-300">
              <Link to="/register">ابدأ الآن مجاناً</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-nova-200 text-foreground h-12 px-8 hover:bg-nova-50 transition-all duration-300">
              <Link to="#features">تعرف على المميزات</Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#features" className="block">
            <ChevronDown className="h-8 w-8 text-foreground/50" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
