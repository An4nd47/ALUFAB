import { lazy, Suspense } from "react";

const Testimonials = lazy(() => import("../components/Testimonials/Testimonials"));
const FAQ = lazy(() => import("../components/FAQ/FAQ"));
const Contact = lazy(() => import("../components/Contact/Contact"));

const SectionSkeleton = () => (
  <div className="section-padding container-custom">
    <div className="skeleton h-8 w-32 mb-4" />
    <div className="skeleton h-12 w-2/3 mb-8" />
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-48 rounded-xl" />
      ))}
    </div>
  </div>
);

export default function TestimonialsContactPage() {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <div className="pt-20">
        <Testimonials />
        <div className="section-divider container-custom" />
        <FAQ />
        <div className="section-divider container-custom" />
        <Contact />
      </div>
    </Suspense>
  );
}
