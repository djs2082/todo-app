import React from 'react';
import defaultLogo from '../../images/logo.png';
import './index.css';

type BrandLogoProps = {
  title?: string;
  subTitle?: string;
  logoSrc?: string;
  ariaLabel?: string;
};

const BrandLogo: React.FC<BrandLogoProps> = ({
  title = 'KARYA',
  subTitle = 'App',
  logoSrc,
  ariaLabel = 'Karya logo',
}) => {
  const src = logoSrc || defaultLogo;
  return (
    <div className="brand-container">
      <div className="brand-logo-wrapper" aria-hidden="true">
        <img src={src} alt={ariaLabel} className="brand-logo-img" />
      </div>
      <h1 className="brand-title">
        {title} <span className="brand-subtitle">{subTitle}</span>
      </h1>
    </div>
  );
};

export default BrandLogo;