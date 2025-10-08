import React from 'react';

interface PasswordStrengthProps {
  score: number;
  label: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ score, label }) => {
  const strengthColors = [
    'bg-red-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-green-500',
  ];

  return (
    <div className="flex items-center mt-2">
      <div className="w-full bg-muted rounded-full h-2 mr-2">
        <div
          className={`h-2 rounded-full ${strengthColors[score]}`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <div className="text-sm text-muted-foreground w-24 text-right">{label}</div>
    </div>
  );
};

export default PasswordStrength;