import React from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      className="border p-2 rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
