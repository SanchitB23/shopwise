'use client';
import React from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import ErrorComponent from '@/components/layout/ErrorComponent';
import NotFoundSvg from '@/resources/svg/not-found';

const Error = () => {
  return (
    <Card className={'bg-gray-900 h-full'}>
      <CardContent className={'flex flex-col md:flex-row h-full justify-center items-center'}>
        <CardDescription>
          <ErrorComponent
            SvgComponent={NotFoundSvg}
            isLink
            linkText={'/products'}
            btnText={'Something Went wrong, Go back'}
          />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default Error;
