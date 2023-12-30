import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  className?: string;
  btnClassName?: string;
  btnText?: string;
  onBtnClick?: () => void | {};
  SvgComponent: React.FC;
  isLink?: boolean;
  linkText?: string;
}

const ErrorComponent = ({
  className,
  SvgComponent,
  onBtnClick = () => {},
  btnClassName,
  btnText = 'something went wrong, please retry',
  isLink = false,
  linkText,
}: Props) => {
  return (
    <div className={cn('h-[80vh] flex justify-center items-center flex-col', className)}>
      <SvgComponent />
      {isLink ? (
        <Link href={linkText!}>
          <Button
            variant={'secondary'}
            className={cn('my-10 animate-pulse capitalize', btnClassName)}>
            {btnText}
          </Button>
        </Link>
      ) : (
        <Button
          variant={'secondary'}
          onClick={onBtnClick}
          className={cn('my-10 animate-pulse capitalize', btnClassName)}>
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
