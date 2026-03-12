import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

export function PageContainer({ 
  children, 
  title, 
  description, 
  actions,
  maxWidth = '7xl'
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]} px-4 py-8 sm:px-6 lg:px-8`}>
      {(title || description || actions) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>}
            {description && <p className="mt-1 text-slate-600">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
