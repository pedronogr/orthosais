import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SchemaOrg from '../../components/SchemaOrg';
import ProductClient from './ProductClient';
import { metadata } from './metadata';

export { metadata };

export default function ViscomovePage() {
  return (
    <>
      <Header />
      <SchemaOrg />
      <ProductClient />
      <Footer />
    </>
  );
} 