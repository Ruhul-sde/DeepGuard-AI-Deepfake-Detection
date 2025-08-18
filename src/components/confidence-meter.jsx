import { useEffect, useState } from "react";

export function ConfidenceMeter({ confidence, isManipulated }) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedConfidence(confidence);
    }, 300);
    return () => clearTimeout(timer);
  }, [confidence]);

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (animatedConfidence / 100) * circumference;
  const color = isManipulated ? '#D32F2F' : '#2E7D32';

  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`text-3xl font-bold ${isManipulated ? 'text-alert' : 'text-success'}`}>
            {animatedConfidence}%
          </span>
          <span className="text-sm text-gray-500 font-medium">
            {isManipulated ? 'Manipulated' : 'Authentic'}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-sm text-gray-600">
          {isManipulated 
            ? 'High confidence of manipulation detected' 
            : 'High confidence of authenticity verified'
          }
        </p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <div className={`w-2 h-2 rounded-full ${isManipulated ? 'bg-alert' : 'bg-success'}`}></div>
          <span className="text-xs text-gray-500">
            Analysis complete
          </span>
        </div>
      </div>
    </div>
  );
}