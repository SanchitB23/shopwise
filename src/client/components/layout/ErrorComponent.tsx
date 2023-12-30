import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  btnClassName?: string;
  btnText?: string;
  onBtnClick: () => {};
  SvgComponent: React.FC;
}
const ErrorComponent = ({
  className,
  SvgComponent,
  onBtnClick,
  btnClassName,
  btnText = 'Something went wrong, please Retry',
}: Props) => {
  return (
    <div className={cn('h-[80vh] flex justify-center items-center flex-col', className)}>
      <SvgComponent />
      <Button
        variant={'secondary'}
        onClick={onBtnClick}
        className={cn('my-10 animate-pulse', btnClassName)}>
        {btnText}
      </Button>
    </div>
  );
};

export default ErrorComponent;
