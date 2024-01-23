import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInputField = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={'relative'} onBlur={() => setShowPassword(false)}>
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        onBlur={event => {
          props?.onBlur && props.onBlur(event);
          setShowPassword(false);
        }}
      />
      <Button
        variant={'ghost'}
        className={
          'absolute top-0 right-0 hover:bg-transparent text-slate-400 hover:text-slate-200'
        }
        type={'button'}
        onClick={() => setShowPassword(prevState => !prevState)}>
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};

PasswordInputField.displayName = 'PasswordInputField';

export { PasswordInputField };
