import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import Image from 'next/image';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
  showPageHeader?: boolean;
  headerImageSrc?: string;
  headerHeight?: string;
}

export default function PageLayout({
  children,
  title,
  description,
  showBreadcrumbs = true,
  showPageHeader = true,
  headerImageSrc = "/images/page-header-bg.jpg", // Imagem padrão para o cabeçalho
  headerHeight = "h-[200px]"
}: PageLayoutProps) {
  return (
    <>
      <Header />
      
      {showPageHeader && (
        <div className={`relative w-full ${headerHeight} bg-gray-100`}>
          {headerImageSrc && (
            <Image
              src={headerImageSrc}
              alt={title}
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
          <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
              {description && (
                <p className="text-white text-lg max-w-2xl mx-auto">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {showBreadcrumbs && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto">
            <Breadcrumbs 
              containerClasses="py-3 px-4"
              separator={<span className="mx-2">/</span>}
            />
          </div>
        </div>
      )}
      
      <main className="min-h-[60vh]">
        {children}
      </main>
      
      <Footer />
    </>
  );
} 