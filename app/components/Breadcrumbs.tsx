"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  inactiveItemClasses?: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({
  homeElement = 'Home',
  separator = '/',
  containerClasses = 'py-4 px-4',
  listClasses = 'flex items-center space-x-2 text-sm',
  activeItemClasses = 'text-primary font-medium',
  inactiveItemClasses = 'text-gray-500 hover:text-primary',
  items,
}: BreadcrumbsProps) {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  // Se items for fornecido, use-o em vez de gerar automaticamente
  if (items) {
    return (
      <div className={containerClasses}>
        <ul className={listClasses}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className={isLast ? activeItemClasses : inactiveItemClasses}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                
                {!isLast && (
                  <span className="text-gray-400 mx-2">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Caso contrário, gere automaticamente com base no caminho atual
  return (
    <div className={containerClasses}>
      <ul className={listClasses}>
        <li className={inactiveItemClasses}>
          <Link href="/">
            {homeElement}
          </Link>
        </li>
        
        {pathNames.length > 0 && (
          <li className="text-gray-400 flex items-center">
            {separator}
          </li>
        )}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathNames.length - 1;
          
          // Formata o texto do link para exibição (capitaliza primeira letra e substitui hifens por espaços)
          const formattedLink = link
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          return (
            <li key={href} className="flex items-center">
              <Link
                href={href}
                className={isLast ? activeItemClasses : inactiveItemClasses}
                aria-current={isLast ? 'page' : undefined}
              >
                {formattedLink}
              </Link>
              
              {!isLast && (
                <span className="text-gray-400 mx-2">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
} 