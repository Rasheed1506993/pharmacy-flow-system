
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المميزات", path: "/#features" },
    { name: "الأسعار", path: "/#pricing" },
    { name: "حول النظام", path: "/#about" },
    { name: "تواصل معنا", path: "/#contact" },
  ];

  const isAuthenticated = false; // Replace with actual auth check

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-2 bg-white/80 backdrop-blur-lg shadow-md"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gradient ml-2">Nova Pharma</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          {isAuthenticated ? (
            <Button asChild variant="ghost" className="nova-transition">
              <Link to="/dashboard">لوحة التحكم</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="nova-transition">
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild className="bg-nova-500 hover:bg-nova-600 nova-shadow nova-transition">
                <Link to="/register">إنشاء حساب</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">لوحة التحكم</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link to="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button asChild className="bg-nova-500 hover:bg-nova-600">
                    <Link to="/register">إنشاء حساب</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
