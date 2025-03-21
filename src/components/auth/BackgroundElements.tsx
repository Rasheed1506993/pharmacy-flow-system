
import React from "react";

const BackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-nova-100 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
    </div>
  );
};

export default BackgroundElements;
