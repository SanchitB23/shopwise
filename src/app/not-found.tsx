import React from 'react';
import NotFoundSvg from '@/resources/svg/not-found';
import ErrorComponent from '@/components/layout/ErrorComponent';

const NotFound = () => {
  return (
    <ErrorComponent
      SvgComponent={NotFoundSvg}
      isLink
      linkText={'/'}
      btnText={'page not found, return to home'}
    />
  );
};

export default NotFound;
