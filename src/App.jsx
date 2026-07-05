import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/shared/FloatingButtons";
import ScrollToTop from "./components/shared/ScrollToTop";

// Lazy load page-level components
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductsProjectsPage = lazy(() => import("./pages/ProductsProjectsPage"));
const TestimonialsContactPage = lazy(() => import("./pages/TestimonialsContactPage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
    <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products-projects" element={<ProductsProjectsPage />} />
          <Route path="/testimonials-contact" element={<TestimonialsContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>

      <Footer />
      <FloatingButtons />
    </BrowserRouter>
  );
}

export default App;
