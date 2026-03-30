import React, { FC } from 'react';

const Badge: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1 ring-1 ring-primary/20"> 
      <span className="h-2 w-2 rounded-full bg-primary inline-block" />
      {children}
    </span>
  );
};

export default Badge;
