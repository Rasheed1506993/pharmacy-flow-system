
import React from "react";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block mb-6">
        <span className="text-2xl font-bold text-gradient">Nova Pharma</span>
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2" dir="rtl">{title}</h1>
      <p className="text-gray-600" dir="rtl">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
