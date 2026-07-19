import { lazy, Suspense } from "react";
import { useSEO } from "../useSEO";

const FAQ = lazy(() => import("../components/FAQ"));
const Contact = lazy(() => import("../components/Contact"));

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
  useSEO({
    title: "Contact Alufab – Get a Free Quote | uPVC Fabrication Kerala",
    description:
      "Contact Alufab for a free uPVC fabrication quote. Get answers to common questions about our products and services. Our team responds within 24 hours.",
  });

  return (
    <Suspense fallback={<SectionSkeleton />}>
      <main className="pt-20">
        <Contact />
        <div className="section-divider container-custom" />
        <FAQ />
      </main>
    </Suspense>
  );
}
