import React from 'react'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h4 className="mt-2 font-light text-neutral-500">{subtitle}</h4>
    </div>
  );
};

export default Heading