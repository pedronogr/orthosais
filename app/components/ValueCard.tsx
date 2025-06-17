import React, { ReactNode } from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
}

export default function ValueCard({ 
  title, 
  description, 
  icon, 
  borderColor = "border-primary",
  bgColor = "bg-white",
  textColor = "text-gray-700"
}: ValueCardProps) {
  return (
    <div className={`${bgColor} p-8 rounded-lg shadow-md ${borderColor} border-b-4 h-full flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
      <p className={`${textColor} text-base leading-relaxed`}>{description}</p>
    </div>
  );
} 