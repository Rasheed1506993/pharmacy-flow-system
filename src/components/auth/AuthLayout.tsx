
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundElements from "./BackgroundElements";

interface AuthLayoutProps {
  children: React.ReactNode;
  footerLink?: {
    text: string;
    to: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, footerLink }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-nova-50/50 to-white p-4">
      <BackgroundElements />
      
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-8">
            {children}
          </div>
        </motion.div>
        
        {footerLink && (
          <div className="mt-8 text-center">
            <Link to={footerLink.to} className="text-gray-600 hover:text-nova-500 transition-colors">
              {footerLink.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
