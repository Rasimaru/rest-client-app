import { useState, ReactNode } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export type FieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  autocomplete?: string;
  children?: ReactNode;
};

const FieldWrapper = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  autocomplete,
  children
}: FieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2 relative">
          <div className="flex justify-between items-center h-5">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {children}
          </div>
          <FormControl>
            <div className="relative mb-6">
              <Input
                id={name}
                placeholder={placeholder}
                type={inputType}
                autoComplete={autocomplete}
                {...field}
                className={type === 'password' ? 'pr-10' : undefined}
              />
              {type === 'password' && (
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-white hover:text-gray-100 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className="absolute bottom-0" />
        </FormItem>
      )}
    />
  );
};

export default FieldWrapper;
